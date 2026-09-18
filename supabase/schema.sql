-- ==============================================================================
-- Indian Handicrafts (ఇండియన్ హ్యాండీక్రాఫ్ట్స్), Kakinada - Supabase PostgreSQL Schema
-- Includes pgvector extension, products catalog, customer bulk inquiries,
-- cosine similarity match_products function, and Row-Level Security (RLS).
-- ==============================================================================

-- 1. Enable Vector Extension for Semantic RAG Search
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Drop existing tables/functions if re-running
DROP FUNCTION IF EXISTS match_products(VECTOR, FLOAT, INT);
DROP TABLE IF EXISTS inquiries CASCADE;
DROP TABLE IF EXISTS products CASCADE;

-- 3. Product Catalog Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  title_telugu TEXT,
  category TEXT NOT NULL CHECK (category IN (
    'brass_idols', 'kondapalli', 'etikoppaka', 
    'tanjore_paintings', 'home_decor', 'return_gifts'
  )),
  description TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  dimensions TEXT,
  weight_grams INT,
  material TEXT NOT NULL,
  craft_origin TEXT DEFAULT 'Andhra Pradesh, India',
  stock_quantity INT DEFAULT 1,
  is_featured BOOLEAN DEFAULT false,
  image_urls TEXT[] DEFAULT '{}',
  embedding VECTOR(1536),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for semantic vector search (IVFFlat)
CREATE INDEX ON products USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- 4. Customer Inquiries Table (Bulk Gifting & Custom Orders)
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT,
  phone_number TEXT NOT NULL,
  occasion TEXT,
  quantity INT,
  target_budget_per_unit NUMERIC(10, 2),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed', 'cancelled')),
  notes TEXT,
  source TEXT DEFAULT 'web_chat',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Match Function for Vector RAG Search
CREATE OR REPLACE FUNCTION match_products (
  query_embedding VECTOR(1536),
  match_threshold FLOAT,
  match_count INT
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  category TEXT,
  description TEXT,
  price NUMERIC,
  material TEXT,
  dimensions TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    products.id,
    products.title,
    products.category,
    products.description,
    products.price,
    products.material,
    products.dimensions,
    1 - (products.embedding <=> query_embedding) AS similarity
  FROM products
  WHERE 1 - (products.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;

-- 6. Row-Level Security (RLS) Configuration
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Public can read all products
CREATE POLICY "Allow public read-only access to products"
  ON products FOR SELECT
  USING (true);

-- Public / Anonymous can insert bulk inquiries
CREATE POLICY "Allow public to submit inquiries"
  ON inquiries FOR INSERT
  WITH CHECK (true);

-- Authenticated admins can view and update inquiries
CREATE POLICY "Allow authenticated users full access to inquiries"
  ON inquiries FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 7. Base Seed Data (Authentic Kakinada & Andhra Crafts)
INSERT INTO products (
  title, title_telugu, category, description, price, dimensions, weight_grams, material, craft_origin, is_featured, image_urls
) VALUES
(
  'Tirupati Balaji Temple Brass Idol',
  'తిరుపతి బాలాజీ ఇత్తడి విగ్రహం',
  'brass_idols',
  'Hand-cast solid temple brass Lord Venkateswara Balaji idol with sacred conch, discus, and ornate prabhavali crown. Hand-chiseled lost-wax technique with antique gold-copper patina. Sourced from traditional Srikalahasti/Kakinada master artisans.',
  3850.00,
  '8.5" x 4.2" x 3.0"',
  1850,
  'Solid Temple Brass',
  'Srikalahasti & Kakinada Region, AP',
  true,
  ARRAY['/images/brass_balaji.jpg']
),
(
  'Panchaloha Cosmic Nataraja Sculpture',
  'పంచలోహ నటరాజ స్వామి విగ్రహం',
  'brass_idols',
  'Antique Panchaloha alloy bronze Nataraja in divine Ananda Tandava stance enclosed in a circular Prabhamandala ring of flames. Hand-poured lost-wax casting.',
  5400.00,
  '9.5" x 7.8" x 2.8"',
  2100,
  'Panchaloha Bronze',
  'Andhra Temple Foundry',
  true,
  ARRAY['/images/brass_nataraja.jpg']
),
(
  'Kondapalli Dasavatara Wooden Toy Set',
  'కొండపల్లి దశావతారాల బొమ్మల సెట్',
  'kondapalli',
  'GI-tagged authentic 10-piece Dasavatara idol set crafted from lightweight white Poniki wood (Tella Poniki) and hand-painted with organic vegetable and mineral colors.',
  2450.00,
  'Set of 10 figures (5.5" each)',
  650,
  'Tella Poniki Wood',
  'Kondapalli, Krishna Dist, AP',
  true,
  ARRAY['/images/kondapalli_toys.jpg']
),
(
  'Etikoppaka Lacquer Raja-Rani Pair',
  'ఏటికొప్పాక లక్క రాజా-రాణి బొమ్మలు',
  'etikoppaka',
  'Traditional turned Ankudu wood (Wrightia tinctoria) dolls finished on a manual lathe using natural vegetable lac and non-toxic herbal dyes. Ideal for housewarmings and return gifts.',
  780.00,
  '6.0" x 2.5" each',
  320,
  'Ankudu Wood & Natural Lacquer',
  'Etikoppaka, Visakhapatnam, AP',
  true,
  ARRAY['/images/etikoppaka_lacquer.jpg']
),
(
  'Thanjavur Embossed Gold Foil Lakshmi',
  'తంజావూరు 22K బంగారు తాపడం లక్ష్మీ దేవి పటం',
  'tanjore_paintings',
  'Master-crafted 22-carat gold foil embossed Goddess Lakshmi painting embedded with Jaipur semi-precious stones, enclosed in genuine teakwood temple chettinad frame.',
  8900.00,
  '14.0" x 12.0" x 2.0"',
  2400,
  '22K Gold Foil on Teak Frame',
  'Classical Tanjore Artistry',
  true,
  ARRAY['/images/tanjore_painting.jpg']
),
(
  'Antique Temple Peacock Annam Diya (Pair)',
  'ఇత్తడి అన్నం పక్షి దీపాలు (జత)',
  'home_decor',
  'Hand-forged temple brass Deepam lamps featuring the auspicious Annam (celestial swan) motif on stepped pedestals with oil reservoir for sacred daily pujas.',
  2100.00,
  '7.5" x 3.8" each',
  1250,
  'Solid Forged Brass',
  'Kakinada Artisan Guild',
  false,
  ARRAY['/images/brass_annam_diya.jpg']
),
(
  'Royal Carved Brass Urli with Floating Marigolds',
  'రాచరిక చెక్కడపు ఇత్తడి ఉర్లి పాత్ర',
  'home_decor',
  'Hand-hammered heavy gauge brass Urli bowl with traditional engraved bell motifs around the rim. Ideal for entryway floral water decor and festive occasions.',
  3250.00,
  '12.0" Diameter x 4.5" Height',
  1950,
  'Hand-Hammered Brass',
  'Kakinada Showroom Exclusive',
  true,
  ARRAY['/images/brass_urli.jpg']
),
(
  'Etikoppaka Kumkum Bharina (Sindoor Pot)',
  'ఏటికొప్పాక కుంకుమ భరిణ',
  'return_gifts',
  'Exquisite turned Ankudu wood kumkum container with hand-polished organic lac finish in sacred turmeric gold and kumkum red. High-volume favorite for wedding return favors.',
  220.00,
  '3.2" x 2.0"',
  95,
  'Ankudu Wood & Herbal Dyes',
  'Etikoppaka, AP',
  false,
  ARRAY['/images/etikoppaka_kumkum.jpg']
),
(
  'Kondapalli Bull Cart Procession (Edla Bandi)',
  'కొండపల్లి ఎడ్ల బండి బొమ్మ',
  'kondapalli',
  'Iconic Andhra rural life miniature depicting a decorated bullock cart with traditional farmer and grain bags. Handcrafted by master artisans.',
  1650.00,
  '9.0" x 5.0" x 4.5"',
  480,
  'Tella Poniki Wood',
  'Kondapalli, AP',
  false,
  ARRAY['/images/kondapalli_cart.jpg']
),
(
  'Dokra Brass Tribal Ganesha Idol',
  'డొక్రా ఇత్తడి వినాయకుడి విగ్రహం',
  'brass_idols',
  'Ancient non-ferrous lost-wax metal casting featuring distinct wire-like metallic textures and primitive folk sacred curves. 100% unique one-of-a-kind art piece.',
  2800.00,
  '6.5" x 4.5" x 3.0"',
  1100,
  'Dokra Bell Metal Brass',
  'Tribal Artisan Foundry, AP',
  true,
  ARRAY['/images/dokra_ganesha.jpg']
);
