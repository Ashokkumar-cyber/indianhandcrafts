import { PRODUCTS, Product } from "../data/products";

export interface InquiryRecord {
  id?: string;
  customer_name: string;
  phone_number: string;
  occasion: string;
  quantity: number;
  target_budget_per_unit: number;
  notes?: string;
  source?: string;
  status?: 'new' | 'contacted' | 'closed' | 'cancelled';
  created_at?: string;
}

// In-memory inquiry store for client-side demo when Supabase credentials are pending or offline
const localInquiries: InquiryRecord[] = [];

export const supabaseClient = {
  isConfigured(): boolean {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    // An 'sbp_' token is a Supabase Personal Access Token, not the project anon JWT
    if (key && key.startsWith("sbp_")) {
      return false;
    }

    return Boolean(
      url && 
      key && 
      !url.includes("your-project") && 
      url.startsWith("https://")
    );
  },

  getConnectionStatus(): {
    configured: boolean;
    provider: "supabase" | "local_fallback";
    url: string | null;
    message: string;
  } {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || null;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || null;

    if (this.isConfigured()) {
      return {
        configured: true,
        provider: "supabase",
        url,
        message: "Connected to live Supabase PostgreSQL database."
      };
    }

    if (key && key.startsWith("sbp_")) {
      return {
        configured: false,
        provider: "local_fallback",
        url,
        message: "Supabase Personal Access Token ('sbp_...') detected. The web client requires the 'anon public' key (starts with 'eyJ...'). Running in resilient local catalog mode."
      };
    }

    return {
      configured: false,
      provider: "local_fallback",
      url,
      message: "Supabase credentials not yet configured. Operating on built-in Andhra crafts catalog & resilient storage."
    };
  },

  /**
   * Fetch all products from Supabase if configured, otherwise fallback to local catalog
   */
  async getProducts(): Promise<Product[]> {
    if (this.isConfigured()) {
      try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        const res = await fetch(`${url}/rest/v1/products?select=*`, {
          headers: {
            'apikey': key!,
            'Authorization': `Bearer ${key!}`
          },
          next: { revalidate: 60 }
        });

        if (res.ok) {
          const dbProducts = await res.json();
          if (Array.isArray(dbProducts) && dbProducts.length > 0) {
            return dbProducts.map((p: any): Product => ({
              id: p.id || p.title.toLowerCase().replace(/\s+/g, '-'),
              title: p.title,
              title_telugu: p.title_telugu || p.title,
              category: p.category || 'home_decor',
              category_name: p.category_name || (p.category ? p.category.replace(/_/g, ' ') : "Artisan Crafts"),
              description: p.description || "",
              price: Number(p.price) || 0,
              dimensions: p.dimensions || "Standard Dimensions",
              weight_grams: Number(p.weight_grams) || 500,
              material: p.material || "Brass / Wood",
              craft_origin: p.craft_origin || "Andhra Pradesh, India",
              technique: p.technique || "Traditional Handcrafted Artisan Guild",
              gi_tagged: Boolean(p.gi_tagged),
              is_featured: Boolean(p.is_featured),
              stock_quantity: Number(p.stock_quantity) || 1,
              care_instructions: p.care_instructions || "Wipe gently with a soft dry cloth. Avoid harsh chemicals.",
              occasions: Array.isArray(p.occasions) ? p.occasions : ["Pooja", "Gifting", "Housewarming"],
              image_urls: Array.isArray(p.image_urls) && p.image_urls.length > 0 
                ? p.image_urls 
                : [p.image_url || "/images/brass_balaji.jpg"],
              badge: p.badge || undefined
            }));
          }
        }
      } catch (err) {
        console.warn("Supabase products fetch failed, using local catalog fallback:", err);
      }
    }

    return PRODUCTS;
  },

  /**
   * Insert customer inquiry into Supabase or fallback store
   */
  async insertInquiry(inquiry: InquiryRecord): Promise<{ success: boolean; data?: InquiryRecord; error?: string }> {
    const record: InquiryRecord = {
      ...inquiry,
      id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      status: 'new',
      created_at: new Date().toISOString(),
      source: inquiry.source || 'web_calc'
    };

    if (this.isConfigured()) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/inquiries`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
            'Prefer': 'return=representation'
          },
          body: JSON.stringify(record)
        });

        if (res.ok) {
          const data = await res.json();
          return { success: true, data: data[0] || record };
        } else {
          console.warn("Supabase insert responded with non-200, saving to local store:", res.statusText);
        }
      } catch (networkErr) {
        console.warn("Supabase network error, persisting to local store:", networkErr);
      }
    }

    // Fallback local memory & localStorage storage
    localInquiries.unshift(record);
    if (typeof window !== 'undefined') {
      try {
        const stored = JSON.parse(localStorage.getItem('ih_inquiries') || '[]');
        stored.unshift(record);
        localStorage.setItem('ih_inquiries', JSON.stringify(stored.slice(0, 50)));
      } catch (e) {
        console.warn("Could not save to localStorage", e);
      }
    }
    return { success: true, data: record };
  },

  /**
   * Search products across catalog
   */
  async searchProducts(query: string, category?: string): Promise<Product[]> {
    const all = await this.getProducts();
    const q = query.toLowerCase().trim();
    return all.filter(p => {
      const matchesCategory = !category || category === 'all' || p.category === category;
      if (!matchesCategory) return false;
      if (!q) return true;

      const titleMatch = p.title.toLowerCase().includes(q) || p.title_telugu.toLowerCase().includes(q);
      const descMatch = p.description.toLowerCase().includes(q);
      const matMatch = p.material.toLowerCase().includes(q);
      const occMatch = p.occasions.some(o => o.toLowerCase().includes(q));
      const catMatch = p.category_name.toLowerCase().includes(q);

      return titleMatch || descMatch || matMatch || occMatch || catMatch;
    });
  }
};
