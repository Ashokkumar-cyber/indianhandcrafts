import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { STORE_DETAILS, Product } from "@/lib/data/products";
import { supabaseClient } from "@/lib/supabase/client";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const q = message.trim();
    const qLower = q.toLowerCase();

    // 1. Retrieve products from Supabase DB or local catalog (The "R" in RAG)
    const allProducts = await supabaseClient.getProducts();

    // 2. Score & Rank products based on semantic tokens & user intent
    const queryTokens = qLower
      .replace(/[^a-z0-9\s]/gi, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2 && !["the", "and", "for", "with", "have", "you", "are", "show", "can", "please"].includes(w));

    // Check for price constraints (e.g. "under 500", "below 1000")
    const priceMatch = qLower.match(/(?:under|below|less than|around|within)\s*(?:rs\.?|inr|₹)?\s*(\d+)/i);
    const maxBudget = priceMatch ? Number(priceMatch[1]) : null;

    const scoredProducts = allProducts.map((p) => {
      let score = 0;
      const titleL = p.title.toLowerCase();
      const descL = p.description.toLowerCase();
      const matL = p.material.toLowerCase();
      const catL = p.category.toLowerCase();
      const telL = (p.title_telugu || "").toLowerCase();

      // Exact substring matches
      if (titleL.includes(qLower) || telL.includes(qLower)) score += 15;
      if (catL.includes(qLower)) score += 10;
      if (matL.includes(qLower)) score += 8;
      if (descL.includes(qLower)) score += 5;

      // Token matches
      for (const token of queryTokens) {
        if (titleL.includes(token)) score += 6;
        if (telL.includes(token)) score += 6;
        if (catL.includes(token)) score += 4;
        if (matL.includes(token)) score += 3;
        if (descL.includes(token)) score += 2;
        if (p.occasions?.some((occ: string) => occ.toLowerCase().includes(token))) score += 5;
      }

      // Occasion matching
      if ((qLower.includes("wedding") || qLower.includes("పెళ్లి")) && p.occasions?.includes("Wedding")) score += 6;
      if ((qLower.includes("housewarming") || qLower.includes("గృహప్రవేశం")) && p.occasions?.includes("Housewarming")) score += 6;
      if ((qLower.includes("return gift") || qLower.includes("bulk") || qLower.includes("కానుకలు")) && p.category === "return_gifts") score += 8;

      // Price matching
      if (maxBudget) {
        if (p.price <= maxBudget) {
          score += 8;
        } else {
          score -= 15; // Penalize products exceeding user budget
        }
      }

      return { product: p, score };
    });

    // Top retrieved products
    const retrievedProducts = scoredProducts
      .filter((sp) => sp.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map((sp) => sp.product);

    // If no specific match, provide featured heritage highlights
    const contextProducts = retrievedProducts.length > 0 
      ? retrievedProducts 
      : allProducts.filter((p) => p.is_featured).slice(0, 3);

    // 3. Check for specific cultural & policy guardrails
    const isPhotoInquiry = 
      qLower.includes("photo") || 
      qLower.includes("video call") || 
      qLower.includes("camera") || 
      qLower.includes("picture") || 
      qLower.includes("ఫోటో") ||
      qLower.includes("వీడియో");

    const isBargainInquiry = 
      qLower.includes("discount") || 
      qLower.includes("bargain") || 
      qLower.includes("less price") || 
      qLower.includes("taggiste") || 
      qLower.includes("తగ్గిస్తారా") ||
      qLower.includes("డిస్కౌంట్");

    const isBulkInquiry = 
      qLower.includes("return gift") || 
      qLower.includes("bulk") || 
      qLower.includes("quantity") || 
      qLower.includes("pieces") || 
      qLower.includes("wedding") || 
      qLower.includes("housewarming") || 
      qLower.includes("గృహప్రవేశం") ||
      qLower.includes("కానుకలు");

    // 4. LLM Generation via Google Gemini RAG (The "G" in RAG)
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: "gemini-2.5-flash",
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.3
          }
        });

        const productsContext = contextProducts.map((p) => ({
          id: p.id,
          title: p.title,
          title_telugu: p.title_telugu,
          category: p.category,
          price: p.price,
          dimensions: p.dimensions,
          weight_grams: p.weight_grams,
          material: p.material,
          craft_origin: p.craft_origin,
          description: p.description,
          stock: p.stock_quantity
        }));

        const systemPrompt = `You are Kala (కళ), the master artisan concierge at 'Indian Handicrafts' (ఇండియన్ హ్యాండీక్రాఫ్ట్స్) in Kakinada, Andhra Pradesh.
You guide customers looking for authentic handmade brass idols, GI-tagged Kondapalli wood toys, Etikoppaka lacquerware, and auspicious return gifts.

STORE KNOWLEDGE:
- Location: ${STORE_DETAILS.address}
- Phone/WhatsApp: +91 99088 44424
- Timings: 10:00 AM – 9:00 PM every day

CRITICAL STORE POLICIES:
1. In-Store Photography Restriction: In-store photography or video calls are strictly prohibited to protect artisan designs and heirloom copyright. If asked, politely explain and invite them to receive high-res photos and video tours directly on WhatsApp at +91 99088 44424.
2. Fixed Pricing: All prices are strictly fixed and transparent to support generational artisan livelihoods. No haggling.
3. Bulk & Event Orders: For weddings, housewarmings (Gruhapravesam), and pujas, we provide complimentary festive packaging and customized curation for 25 to 500+ favors.
4. Non-Craft Items: We exclusively stock authentic Indian heritage crafts. We do not sell plastic or mass-produced items.

RETRIEVED CATALOG ITEMS:
${JSON.stringify(productsContext, null, 2)}

USER MESSAGE: "${q}"

INSTRUCTIONS:
- Respond warmly and naturally in English or user's language. If the user asks in Telugu or Telgish, address them respectfully in Telugu.
- Recommend ONLY the relevant items from the RETRIEVED CATALOG ITEMS with exact prices and materials.
- Mention ordering via WhatsApp (+91 99088 44424) for instant live inventory check.
- Return a JSON object with:
  {
    "reply": "Your primary warm response in conversational English (or Telugu if addressed in Telugu)",
    "replyTelugu": "A concise Telugu translation / summary for hospitality",
    "matchedProductIds": ["ids of items specifically relevant to this user query"],
    "isLeadQualified": boolean (true if user wants bulk/wedding/housewarming gifts or asked for bulk quotes)
  }`;

        const chatResult = await model.generateContent(systemPrompt);
        const responseText = chatResult.response.text();
        const parsed = JSON.parse(responseText);

        const matchedIds: string[] = Array.isArray(parsed.matchedProductIds) ? parsed.matchedProductIds : [];
        const finalProducts = contextProducts.filter((p) => 
          matchedIds.includes(p.id) || matchedIds.includes(String(p.id))
        );

        return NextResponse.json({
          reply: parsed.reply,
          replyTelugu: parsed.replyTelugu || "",
          products: finalProducts.length > 0 ? finalProducts : contextProducts.slice(0, 3),
          isLeadQualified: Boolean(parsed.isLeadQualified || isBulkInquiry),
          showroom: STORE_DETAILS
        });

      } catch (geminiError: any) {
        console.warn("Gemini generation encountered an error, activating resilient RAG fallback:", geminiError?.message);
      }
    }

    // 5. Resilient Fallback Logic (if Gemini is offline or rate-limited)
    let fallbackReply = "";
    let fallbackTelugu = "";

    if (isPhotoInquiry) {
      fallbackReply = "To protect artisan copyright and heirloom templates of our generational craftspeople, in-store photography is strictly prohibited inside our Kakinada showroom. However, our team will gladly send high-resolution catalog photos, dimensions, and product videos directly over WhatsApp at +91 99088 44424.";
      fallbackTelugu = "మా కళాకారుల స్వంత డిజైన్లు మరియు కాపీరైట్ రక్షణార్థం షోరూం లోపల ఫోటోగ్రఫీ పూర్తిగా నిషేధించబడింది. అయినప్పటికీ, హై-రిజల్యూషన్ ఫోటోలు మరియు వీడియోలను మా బృందం +91 99088 44424 నెంబరుకు వాట్సాప్ ద్వారా పంపిస్తుంది.";
    } else if (isBargainInquiry) {
      fallbackReply = "All prices at Indian Handicrafts are transparent and strictly fixed to ensure fair compensation and sustained livelihoods for our rural artisan partners in Andhra Pradesh.";
      fallbackTelugu = "మా గ్రామీణ కళాకారులకు న్యాయమైన వేతనం అందించేందుకు మా వద్ద అన్ని ధరలు పారదర్శకంగా మరియు స్థిరంగా (Fixed Rates) ఉంటాయి. బేరసారాలకు తావులేదు.";
    } else if (isBulkInquiry) {
      fallbackReply = "For auspicious events (Weddings, Housewarmings, Pujas), we offer curated handcrafted favors starting from ₹190 with complimentary festive gift packaging. For bulk quantities (25 to 500+ units), connect directly with our showroom team on WhatsApp at +91 99088 44424.";
      fallbackTelugu = "గృహప్రవేశం లేదా వివాహాల కోసం మా వద్ద ₹190 నుండి ప్రారంభమయ్యే ఏటికొప్పాక లక్క కుంకుమ భరిణలు, ఇత్తడి దీపాలు ఉన్నాయి. ఉచిత గిఫ్ట్ ప్యాకింగ్ మరియు హోల్ సేల్ వివరాల కోసం వాట్సాప్ చేయండి.";
    } else if (retrievedProducts.length > 0) {
      fallbackReply = `I retrieved ${retrievedProducts.length} authentic handcrafted items matching your request from our Kakinada catalog:`;
      fallbackTelugu = "మీరు అడిగిన ప్రశ్నకు సరిపడే ప్రామాణిక కళాఖండాల వివరాలు ఇక్కడ ఉన్నాయి:";
    } else {
      fallbackReply = "Namaste! Welcome to Indian Handicrafts, Kakinada. We specialize in temple brass idols, GI-tagged Kondapalli toys, Etikoppaka natural lacquerware, and customized return favors. How can I assist you today?";
      fallbackTelugu = "నమస్కారం! కాకినాడ ఇండియన్ హ్యాండీక్రాఫ్ట్స్ కు స్వాగతం. ఇత్తడి విగ్రహాలు, కొండపల్లి మరియు ఏటికొప్పాక బొమ్మల గురించి నన్ను అడగవచ్చు.";
    }

    return NextResponse.json({
      reply: fallbackReply,
      replyTelugu: fallbackTelugu,
      products: contextProducts.slice(0, 3),
      isLeadQualified: isBulkInquiry,
      showroom: STORE_DETAILS
    });

  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { 
        error: "Failed to process chat query",
        details: error?.message || "Unknown error"
      },
      { status: 500 }
    );
  }
}
