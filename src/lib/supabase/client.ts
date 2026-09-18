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
      console.warn("Notice: The configured key starts with 'sbp_', which is a Supabase Personal Access Token. The web app requires your project's 'anon public' key (starts with 'eyJ'). Falling back to local store until updated.");
      return false;
    }

    return Boolean(
      url && 
      key && 
      !url.includes("your-project") && 
      url.startsWith("https://")
    );
  },

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

  async searchProducts(query: string, category?: string): Promise<Product[]> {
    const q = query.toLowerCase().trim();
    return PRODUCTS.filter(p => {
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
