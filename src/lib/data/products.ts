export interface Product {
  id: string;
  title: string;
  title_telugu: string;
  category: 'brass_idols' | 'kondapalli' | 'etikoppaka' | 'tanjore_paintings' | 'home_decor' | 'return_gifts';
  category_name: string;
  description: string;
  price: number;
  dimensions: string;
  weight_grams: number;
  material: string;
  craft_origin: string;
  technique: string;
  gi_tagged: boolean;
  is_featured: boolean;
  stock_quantity: number;
  care_instructions: string;
  occasions: string[];
  image_urls: string[];
  badge?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "prod-brass-001",
    title: "Tirupati Balaji Temple Brass Idol",
    title_telugu: "తిరుపతి బాలాజీ ఇత్తడి విగ్రహం",
    category: "brass_idols",
    category_name: "Brass & Bronze Idols",
    description: "Sacred hand-cast solid temple brass Lord Venkateswara Tirupati Balaji idol with authentic temple patina. Hand-chiseled lost-wax technique featuring the sacred conch (Shankha), discus (Chakra), ornate Kireetam crown, and protective Abhaya mudra. Sourced directly from hereditary master artisans in the Godavari & Srikalahasti belt.",
    price: 3850,
    dimensions: '8.5" x 4.2" x 3.0"',
    weight_grams: 1850,
    material: "Solid Temple Brass",
    craft_origin: "Srikalahasti & Godavari Guild, AP",
    technique: "Lost-Wax Casting (Madhuchishtavidhana)",
    gi_tagged: false,
    is_featured: true,
    stock_quantity: 4,
    care_instructions: "Clean gently with soft cloth and Pitambari or tamarind water paste twice a year. Avoid chemical abrasives.",
    occasions: ["Housewarming", "Daily Puja", "Wedding Gift", "Pooja Room Mandir"],
    image_urls: [
      "/images/brass_balaji.jpg"
    ],
    badge: "Showroom Crown Piece"
  },
  {
    id: "prod-brass-002",
    title: "Panchaloha Cosmic Nataraja Sculpture",
    title_telugu: "పంచలోహ నటరాజ స్వామి విగ్రహం",
    category: "brass_idols",
    category_name: "Brass & Bronze Idols",
    description: "Exquisite antique five-metal alloy (Panchaloha) Lord Shiva Nataraja in divine Ananda Tandava stance enclosed within a flame-fringed circular Prabhamandala. Stands atop the dwarf of ignorance (Apasmara). Every chisel stroke reflects temple foundry mastery.",
    price: 5400,
    dimensions: '9.5" x 7.8" x 2.8"',
    weight_grams: 2100,
    material: "Panchaloha Bronze Alloy",
    craft_origin: "Andhra Temple Foundry Guild",
    technique: "Traditional Lost-Wax Solid Bronze Pour",
    gi_tagged: false,
    is_featured: true,
    stock_quantity: 3,
    care_instructions: "Periodic dry dusting with microfiber cloth. Polish with sesame oil drop for lustrous devotional gleam.",
    occasions: ["Housewarming", "Dance Academy", "Living Room Sacred Centerpiece"],
    image_urls: [
      "/images/panchaloha_nataraja.jpg"
    ],
    badge: "5-Metal Panchaloha"
  },
  {
    id: "prod-konda-001",
    title: "Kondapalli Dasavatara Wooden Set (10 Figures)",
    title_telugu: "కొండపల్లి దశావతారాల బొమ్మల సెట్",
    category: "kondapalli",
    category_name: "Kondapalli Toys",
    description: "GI-tagged authentic 10-piece Dasavatara figurine set depicting the ten divine avatars of Lord Vishnu. Hand-carved from sacred white Poniki wood (Tella Poniki) and hand-painted with mineral-derived eco pigments. A prestigious collector pride of Andhra Pradesh.",
    price: 2450,
    dimensions: 'Set of 10 figures (5.5" each)',
    weight_grams: 650,
    material: "Tella Poniki Wood",
    craft_origin: "Kondapalli, Krishna Dist, AP",
    technique: "Hand-Chiseled Poniki Wood & Tamarind Paste Joining",
    gi_tagged: true,
    is_featured: true,
    stock_quantity: 6,
    care_instructions: "Keep away from direct sunlight and damp moisture. Wipe gently with dry cotton cloth.",
    occasions: ["Golu / Bommala Koluvu", "Housewarming", "Heritage Keepsake"],
    image_urls: [
      "/images/kondapalli_toys.jpg"
    ],
    badge: "GI Tag Certified"
  },
  {
    id: "prod-eti-001",
    title: "Etikoppaka Lacquer Raja-Rani Pair",
    title_telugu: "ఏటికొప్పాక లక్క రాజా-రాణి బొమ్మలు",
    category: "etikoppaka",
    category_name: "Etikoppaka Lacquerware",
    description: "Auspicious royal couple dolls lathed from seasoned soft Ankudu wood (Wrightia tinctoria). Coated with non-toxic natural shellac infused with organic vegetable dyes (turmeric, indigo, seeds). 100% child-safe and sacred heritage.",
    price: 780,
    dimensions: '6.0" x 2.5" each',
    weight_grams: 320,
    material: "Ankudu Wood & Natural Lacquer",
    craft_origin: "Etikoppaka, Visakhapatnam, AP",
    technique: "Manual Turned Wood & Vegetable Dye Lacquer Buff",
    gi_tagged: true,
    is_featured: true,
    stock_quantity: 12,
    care_instructions: "Buff occasionally with dry muslin cloth to renew natural lacquer shine. Never wash in water.",
    occasions: ["Wedding Gift", "Housewarming (గృహప్రవేశం)", "Return Gift"],
    image_urls: [
      "/images/etikoppaka_toys.jpg"
    ],
    badge: "Natural Lacquer GI"
  },
  {
    id: "prod-tanj-001",
    title: "Thanjavur 22K Gold Foil Embossed Lakshmi",
    title_telugu: "తంజావూరు 22K బంగారు తాపడం లక్ష్మీ దేవి పటం",
    category: "tanjore_paintings",
    category_name: "Tanjore & Cheriyal Art",
    description: "Heirloom devotional artwork depicting Goddess Gajalakshmi seated on a pink lotus. Meticulously layered with 22-carat pure gold foil over limestone relief gesso work, adorned with authentic Jaipur semi-precious stones, enclosed in a sturdy aged teakwood frame.",
    price: 8900,
    dimensions: '14.0" x 12.0" x 2.0"',
    weight_grams: 2400,
    material: "22K Gold Foil on Teakwood Frame",
    craft_origin: "Heritage Tanjore & Godavari Artisan Studio",
    technique: "Traditional Mukthi Gesso Relief with 22K Gold Leafing",
    gi_tagged: true,
    is_featured: true,
    stock_quantity: 2,
    care_instructions: "Framed under protective glass. Clean glass with dry lens cloth. Keep out of damp environments.",
    occasions: ["Housewarming (గృహప్రవేశం)", "Deepavali Puja", "Luxury Wedding Gift"],
    image_urls: [
      "/images/tanjore_lakshmi.jpg"
    ],
    badge: "22K Pure Gold Foil"
  },
  {
    id: "prod-home-001",
    title: "Royal Carved Brass Urli with Floating Bells",
    title_telugu: "రాచరిక చెక్కడపు ఇత్తడి ఉర్లి పాత్ర",
    category: "home_decor",
    category_name: "Home Accents",
    description: "Heavy gauge temple brass Urli bowl with ornate floral rim engraving and cast dangling chime bells. Designed for foyer water styling with fresh marigolds, floating jasmine, and tea light deepams to invite auspicious positive energy.",
    price: 3250,
    dimensions: '12.0" Diameter x 4.5" Height',
    weight_grams: 1950,
    material: "Heavy Gauge Forged Brass",
    craft_origin: "Kakinada Showroom Exclusive",
    technique: "Hand-Hammered Sheet & Cast Rim Embellishment",
    gi_tagged: false,
    is_featured: true,
    stock_quantity: 5,
    care_instructions: "Wipe dry after water use. Clean every few weeks with lemon and salt or Pitambari powder.",
    occasions: ["Foyer Entrance", "Diwali & Ugadi Decor", "Housewarming (గృహప్రవేశం)"],
    image_urls: [
      "/images/brass_urli.jpg"
    ],
    badge: "Bestseller Home Accent"
  },
  {
    id: "prod-home-002",
    title: "Antique Temple Peacock Annam Diya (Pair)",
    title_telugu: "ఇత్తడి అన్నం పక్షి దీపాలు (జత)",
    category: "home_decor",
    category_name: "Home Accents",
    description: "Sacred stepped pedestal Deepam oil lamps surmounted by the regal Annam bird (mythical celestial swan). Handcrafted by generational sthapatis with deep oil wells for extended ceremonial lighting.",
    price: 2100,
    dimensions: '7.5" x 3.8" each (Pair)',
    weight_grams: 1250,
    material: "Solid Cast Brass",
    craft_origin: "Kakinada Foundry Guild",
    technique: "Sand Casting & Hand Chisel Detailing",
    gi_tagged: false,
    is_featured: false,
    stock_quantity: 8,
    care_instructions: "Clean wick soot with warm water and soft brush. Wash with tamarind pulp for bright luster.",
    occasions: ["Daily Puja", "Karthika Masam", "Housewarming Return Favor"],
    image_urls: [
      "/images/brass_peacock_diya.jpg"
    ],
    badge: "Traditional Pair"
  },
  {
    id: "prod-ret-001",
    title: "Etikoppaka Kumkum Bharina (Sindoor Pot)",
    title_telugu: "ఏటికొప్పాక లక్క కుంకుమ భరిణ",
    category: "return_gifts",
    category_name: "Return Gifts",
    description: "Hand-lathed sacred Ankudu wood kumkum container coated with auspicious organic vermilion and turmeric lacquer. Compact, unbreakable, and cherished across Andhra weddings and housewarming celebrations.",
    price: 220,
    dimensions: '3.2" x 2.0"',
    weight_grams: 95,
    material: "Ankudu Wood & Herbal Dyes",
    craft_origin: "Etikoppaka, AP",
    technique: "Turned Lathe Woodwork with Herbal Lacquer",
    gi_tagged: true,
    is_featured: true,
    stock_quantity: 150,
    care_instructions: "Wipe with dry soft cloth. Keep dry.",
    occasions: ["Wedding Return Favors", "Housewarming (గృహప్రవేశం)", "Seemantham", "Navaratri"],
    image_urls: [
      "/images/etikoppaka_kumkum.jpg"
    ],
    badge: "Top Bulk Gifting Pick"
  },
  {
    id: "prod-konda-002",
    title: "Kondapalli Traditional Bullock Cart (Edla Bandi)",
    title_telugu: "కొండపల్లి ఎడ్ల బండి బొమ్మ",
    category: "kondapalli",
    category_name: "Kondapalli Toys",
    description: "Nostalgic Andhra village rural scene featuring a wooden cart with two decorated bullocks, farmer in traditional dhoti, and grain sacks. Hand-carved Poniki wood reflecting generations of folklore heritage.",
    price: 1650,
    dimensions: '9.0" x 5.0" x 4.5"',
    weight_grams: 480,
    material: "Tella Poniki Wood",
    craft_origin: "Kondapalli, Krishna Dist, AP",
    technique: "Chiseled Poniki Wood & Organic Colors",
    gi_tagged: true,
    is_featured: false,
    stock_quantity: 5,
    care_instructions: "Dry dusting only. Avoid prolonged moisture.",
    occasions: ["Sankranti Decor", "Folk Art Enthusiasts", "Office Desk Decor"],
    image_urls: [
      "/images/kondapalli_cart.jpg"
    ],
    badge: "Folk Heritage"
  },
  {
    id: "prod-brass-003",
    title: "Dokra Tribal Lost-Wax Brass Ganesha",
    title_telugu: "డొక్రా ఇత్తడి ఆదివాసీ వినాయకుడి విగ్రహం",
    category: "brass_idols",
    category_name: "Brass & Bronze Idols",
    description: "Authentic non-ferrous Dokra metal casting from Eastern Ghats tribal artisans. Made through primitive lost-wax technique using beeswax and clay moulds, resulting in delicate wire-like textures. No two pieces are ever identical.",
    price: 2800,
    dimensions: '6.5" x 4.5" x 3.0"',
    weight_grams: 1100,
    material: "Dokra Bell Metal Brass",
    craft_origin: "Eastern Ghats Tribal Guild, AP",
    technique: "Ancient Cire Perdue (Lost-Wax) Clay Mould Pour",
    gi_tagged: true,
    is_featured: true,
    stock_quantity: 4,
    care_instructions: "Light brushing to maintain rustic tribal patina. Do not scrub off the natural oxidized finish.",
    occasions: ["Housewarming (గృహప్రవేశం)", "Ganesh Chaturthi", "Art Collector Gift"],
    image_urls: [
      "/images/dokra_ganesha.jpg"
    ],
    badge: "Dokra Primitive Art"
  },
  {
    id: "prod-ret-002",
    title: "Brass Peacock Kumkum Box with Spoon",
    title_telugu: "మయూర ఇత్తడి కుంకుమ బరిణ",
    category: "return_gifts",
    category_name: "Return Gifts",
    description: "Solid brass devotional kumkum holder featuring a finely engraved dancing peacock handle and miniature brass spoon. Premium wedding return favor with long-lasting sacred utility.",
    price: 380,
    dimensions: '3.5" x 2.8"',
    weight_grams: 220,
    material: "Solid Brass",
    craft_origin: "Kakinada Artisan Foundry",
    technique: "Die-Cast & Hand-Etched Brass",
    gi_tagged: false,
    is_featured: false,
    stock_quantity: 80,
    care_instructions: "Wipe with dry cloth. Wash with Pitambari occasionally.",
    occasions: ["Wedding Return Gifts", "Upanayanam", "Shasti Poorti"],
    image_urls: [
      "/images/brass_kumkum.jpg"
    ],
    badge: "Popular Wedding Return Gift"
  }
];

export const CATEGORIES = [
  { id: "all", name: "All Masterpieces", telugu: "అన్ని కళాఖండాలు", icon: "Sparkles" },
  { id: "brass_idols", name: "Brass & Bronze Idols", telugu: "ఇత్తడి, పంచలోహ విగ్రహాలు", icon: "Flame" },
  { id: "kondapalli", name: "Kondapalli Toys", telugu: "కొండపల్లి బొమ్మలు", icon: "Palette" },
  { id: "etikoppaka", name: "Etikoppaka Lacquerware", telugu: "ఏటికొప్పాక లక్క బొమ్మలు", icon: "Compass" },
  { id: "tanjore_paintings", name: "Tanjore & Cheriyal Art", telugu: "తంజావూరు పటాలు", icon: "Crown" },
  { id: "home_decor", name: "Temple Decor & Diyas", telugu: "గృహాలంకరణ, దీపాలు", icon: "Sun" },
  { id: "return_gifts", name: "Bulk Return Gifts", telugu: "రిటర్న్ గిఫ్ట్స్", icon: "Gift" },
];

export const DEITY_QUICK_FILTERS = [
  { name: "Balaji / Venkateswara", query: "Balaji", icon: "Crown", badge: "Kakinada Favorite" },
  { name: "Lord Ganesha", query: "Ganesha", icon: "Sparkles", badge: "Vighnaharta" },
  { name: "Lord Shiva Nataraja", query: "Nataraja", icon: "Flame", badge: "Cosmic Dance" },
  { name: "Kondapalli Craft", query: "Kondapalli", icon: "Trees", badge: "GI Certified" },
  { name: "Etikoppaka Lacquer", query: "Etikoppaka", icon: "Palette", badge: "Natural Dyes" },
  { name: "Brass Diyas & Urlis", query: "Diya", icon: "Sun", badge: "Temple Brass" },
  { name: "Return Gifts Under ₹300", query: "return_gifts", icon: "Gift", badge: "Bulk Ready" },
];

export const STORE_DETAILS = {
  name: "Indian Handicrafts",
  telugu_name: "ఇండియన్ హ్యాండీక్రాఫ్ట్స్",
  address: "Shop No. 6, SRMT Staff Association Building, Main Road, beside Sri Complex, Surya Rao Peta, Kakinada, Andhra Pradesh – 533001, India.",
  short_address: "Shop 6, SRMT Building, beside Sri Complex, Surya Rao Peta, Kakinada",
  plus_code: "X63M+RW Kakinada, Andhra Pradesh",
  phone: "+91 99088 44424",
  whatsapp_number: "919908844424",
  timings: "9:30 AM – 9:00 PM IST (Open All 7 Days)",
  rating: "4.8",
  review_count: "41+ Google Reviews",
  google_maps_url: "https://maps.google.com/?q=Shop+No.+6+SRMT+Staff+Association+Building+Main+Road+Surya+Rao+Peta+Kakinada",
  no_photo_policy: "Photography is strictly prohibited inside the showroom to safeguard artisan designs. Digital previews and close-ups are gladly provided via WhatsApp.",
  guarantee: "100% genuine artisan-crafted. Strictly non-negotiable, fair fixed pricing directly supporting artisan livelihoods."
};

export function getWhatsAppUrl(product: Product): string {
  const message = `Namaste Indian Handicrafts (Kakinada), I would like to inquire / order:
📦 *${product.title}*
🔖 Code: ${product.id}
💰 Fixed Price: ₹${product.price}
📐 Dimensions: ${product.dimensions}
⚖️ Material: ${product.material}
Please confirm immediate showroom availability / shipping details. Thank you!`;
  return `https://wa.me/${STORE_DETAILS.whatsapp_number}?text=${encodeURIComponent(message)}`;
}

export function getBulkQuoteWhatsAppUrl(inquiry: {
  occasion: string;
  quantity: number;
  budgetPerUnit: number;
  selectedBundleName: string;
  totalEst: number;
  customerName?: string;
  customerPhone?: string;
}): string {
  const message = `Namaste Indian Handicrafts (Kakinada),
I would like to request a Bulk / Return-Gift Quote:
🎉 *Occasion:* ${inquiry.occasion}
📦 *Quantity:* ${inquiry.quantity} Units
💵 *Unit Budget:* ₹${inquiry.budgetPerUnit}
✨ *Chosen Package:* ${inquiry.selectedBundleName}
🏷️ *Estimated Total:* ₹${inquiry.totalEst.toLocaleString('en-IN')}
👤 *Name:* ${inquiry.customerName || 'Inquirer'}
📱 *Phone:* ${inquiry.customerPhone || 'N/A'}
Please share custom packaging options, dispatch timeline, and invoice quotation.`;
  return `https://wa.me/${STORE_DETAILS.whatsapp_number}?text=${encodeURIComponent(message)}`;
}
