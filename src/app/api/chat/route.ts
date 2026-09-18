import { NextResponse } from "next/server";
import { PRODUCTS, STORE_DETAILS, Product } from "@/lib/data/products";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const q = message.trim();
    const qLower = q.toLowerCase();

    // WORKFLOW 3: In-Store Photography Restriction Guardrail
    if (
      qLower.includes("photo") || 
      qLower.includes("video call") || 
      qLower.includes("camera") || 
      qLower.includes("picture") || 
      qLower.includes("ఫోటో") ||
      qLower.includes("వీడియో")
    ) {
      return NextResponse.json({
        reply: "To protect the original artisan designs, copyright, and heirloom craft templates of our master artisans, in-store photography is strictly prohibited inside our Kakinada showroom. However, our team will gladly send high-resolution catalog photos, dimensions, and product videos directly over WhatsApp at +91 99088 44424.",
        replyTelugu: "మా కళాకారుల స్వంత డిజైన్లు మరియు కాపీరైట్ రక్షణార్థం షోరూం లోపల ఫోటోగ్రఫీ పూర్తిగా నిషేధించబడింది. అయినప్పటికీ, మీకు కావలసిన వస్తువుల హై-రిజల్యూషన్ ఫోటోలు, కొలతలు మరియు వీడియోలను మా బృందం +91 99088 44424 నెంబరుకు వాట్సాప్ ద్వారా పంపిస్తుంది.",
        products: [],
        showroom: STORE_DETAILS
      });
    }

    // WORKFLOW 4: Price Negotiations / Bargaining
    if (
      qLower.includes("discount") || 
      qLower.includes("bargain") || 
      qLower.includes("less price") || 
      qLower.includes("taggiste") || 
      qLower.includes("తగ్గిస్తారా") ||
      qLower.includes("డిస్కౌంట్")
    ) {
      return NextResponse.json({
        reply: "All prices at Indian Handicrafts are transparent and strictly fixed to ensure fair compensation and sustained livelihoods for our rural artisan partners.",
        replyTelugu: "మా గ్రామీణ కళాకారులకు న్యాయమైన వేతనం అందించేందుకు మా వద్ద అన్ని ధరలు పారదర్శకంగా మరియు స్థిరంగా (Fixed Rates) ఉంటాయి. బేరసారాలకు తావులేదు.",
        products: [],
        showroom: STORE_DETAILS
      });
    }

    // WORKFLOW 4: Out-of-Scope Items (plastic, mass-produced, electronics)
    if (
      qLower.includes("plastic") || 
      qLower.includes("electronic") || 
      qLower.includes("mobile") || 
      qLower.includes("china") ||
      qLower.includes("చైనా")
    ) {
      return NextResponse.json({
        reply: "We specialize exclusively in authentic, handmade Indian arts and traditional heritage crafts. While we do not stock mass-produced items, I can suggest handcrafted alternatives like our GI-tagged Etikoppaka lacquerware or Kondapalli woodcraft.",
        replyTelugu: "మేము కేవలం చేతితో చేసిన స్వచ్ఛమైన భారతీయ కళాఖండాలను మాత్రమే అందిస్తాము. ప్లాస్టిక్ లేదా మెషిన్ తయారీ వస్తువులు ఉండవు.",
        products: PRODUCTS.slice(0, 2),
        showroom: STORE_DETAILS
      });
    }

    // WORKFLOW 2: Return-Gift & Bulk Lead Qualification
    if (
      qLower.includes("return gift") || 
      qLower.includes("bulk") || 
      qLower.includes("wedding") || 
      qLower.includes("housewarming") || 
      qLower.includes("gruhapravesam") || 
      qLower.includes("పెళ్లి") ||
      qLower.includes("గృహప్రవేశం") ||
      qLower.includes("కానుకలు")
    ) {
      const bulkPicks = PRODUCTS.filter(p => p.category === "return_gifts" || p.category === "etikoppaka").slice(0, 3);
      
      let formattedBulkReply = "For auspicious events (Weddings, Housewarmings, Pujas), we offer curated handcrafted favors with complimentary festive packing:\n\n";
      bulkPicks.forEach((item) => {
        formattedBulkReply += `${item.title}\nCraft & Material: ${item.material}\nDimensions: ${item.dimensions}\nPrice: ₹${item.price} (Fixed Rate)\nAvailability: In Stock (${item.stock_quantity} units available)\nOrder Action: [Order via WhatsApp](https://wa.me/${STORE_DETAILS.whatsapp_number}?text=${encodeURIComponent(`Hi Indian Handicrafts, I am interested in ordering ${item.title}`)})\n\n`;
      });
      formattedBulkReply += "For custom packaging, quantity discounts (50–500+ units), and event logistics, connect directly with our showroom manager at +91 99088 44424.";

      return NextResponse.json({
        reply: formattedBulkReply,
        replyTelugu: "గృహప్రవేశం లేదా వివాహాల కోసం మా వద్ద ₹190 నుండి ప్రారంభమయ్యే ఏటికొప్పాక లక్క కుంకుమ భరిణలు, ఇత్తడి బరిణలు ఉన్నాయి. ఉచిత గిఫ్ట్ ప్యాకింగ్ మరియు హోల్ సేల్ కోట్ కోసం వాట్సాప్‌లో నేరుగా సంప్రదించండి.",
        products: bulkPicks,
        actionPayload: {
          action: "record_inquiry",
          data: {
            customer_name: null,
            phone_number: null,
            occasion: qLower.includes("wedding") || qLower.includes("పెళ్లి") ? "wedding" : "housewarming",
            quantity: 100,
            target_budget_per_unit: 350.00,
            notes: "Inquired via Kala AI about bulk return gifts"
          }
        },
        showroom: STORE_DETAILS
      });
    }

    // Tokenized Semantic & Keyword Catalog Matching
    const queryTokens = qLower
      .replace(/[^a-z0-9\s]/gi, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2 && !["the", "and", "for", "with", "have", "you", "are", "idol", "show"].includes(w));

    const matchedProducts = PRODUCTS.filter((p) => {
      const titleL = p.title.toLowerCase();
      const descL = p.description.toLowerCase();
      const matL = p.material.toLowerCase();
      const catL = p.category.toLowerCase();
      const telL = p.title_telugu.toLowerCase();

      // Direct phrase check
      if (titleL.includes(qLower) || telL.includes(qLower) || matL.includes(qLower)) return true;

      // Token match
      return queryTokens.some((token) => 
        titleL.includes(token) || 
        descL.includes(token) || 
        matL.includes(token) || 
        catL.includes(token) ||
        p.occasions.some(occ => occ.toLowerCase().includes(token))
      );
    }).slice(0, 3);

    // WORKFLOW 1: Presenting Retrieved Catalog Products with exact spec pattern
    if (matchedProducts.length > 0) {
      let formattedCatalogReply = "";
      matchedProducts.forEach((item) => {
        formattedCatalogReply += `${item.title}\nCraft & Material: ${item.material}\nDimensions: ${item.dimensions}\nPrice: ₹${item.price} (Fixed Rate)\nAvailability: In Stock (${item.stock_quantity} units available)\nOrder Action: [Order via WhatsApp](https://wa.me/${STORE_DETAILS.whatsapp_number}?text=${encodeURIComponent(`Hi Indian Handicrafts, I am interested in ordering ${item.title}`)})\n\n`;
      });

      return NextResponse.json({
        reply: formattedCatalogReply.trim(),
        replyTelugu: "మీరు అడిగిన ప్రశ్నకు సరిపడే ప్రామాణిక కళాఖండాల వివరాలు పైన పొందుపరచబడ్డాయి. ఆర్డర్ లేదా సమాచారం కోసం వాట్సాప్ చేయండి.",
        products: matchedProducts,
        showroom: STORE_DETAILS
      });
    }

    // WORKFLOW 4: Anti-Hallucination Out-of-Catalog Fallback
    return NextResponse.json({
      reply: "We do not have that exact piece listed online right now, but our Kakinada showroom carries many one-of-a-kind regional artifacts. Connect directly with our showroom team on WhatsApp at +91 99088 44424 to check live floor stock.",
      replyTelugu: "ఆ వస్తువు ప్రస్తుతం ఆన్‌లైన్ క్యాటలాగ్‌లో లేదు, కానీ మా కాకినాడ షోరూంలో ప్రత్యక్షంగా అనేక ప్రత్యేక కళాఖండాలు ఉన్నాయి. వాట్సాప్ +91 99088 44424 ద్వారా లైవ్ స్టాక్ తెలుసుకోవచ్చు.",
      products: [],
      showroom: STORE_DETAILS
    });

  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat query" },
      { status: 500 }
    );
  }
}
