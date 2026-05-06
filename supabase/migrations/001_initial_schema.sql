-- ============================================================
-- 8kajis.lv — Initial Supabase Schema
-- ============================================================

-- Enable RLS globally
-- All tables have RLS ON by default

-- ========== PRODUCTS ==========
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name_lv TEXT NOT NULL,
  name_en TEXT,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  price_before NUMERIC(10, 2),
  currency TEXT NOT NULL DEFAULT 'EUR',
  images TEXT[] NOT NULL DEFAULT '{}',
  category TEXT NOT NULL,
  age_min INTEGER,
  age_max INTEGER,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  stock_count INTEGER DEFAULT 0,
  badge TEXT CHECK (badge IN ('JAUNS', 'IZPĀRDOŠANA', 'POPULĀRS')),
  sku TEXT,
  weight NUMERIC(8, 3),
  brand TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Public read access for products
CREATE POLICY "Public products are viewable by everyone"
  ON products FOR SELECT USING (true);

-- Admin write (via service role)
CREATE POLICY "Service role can manage products"
  ON products FOR ALL USING (auth.role() = 'service_role');

-- ========== USERS / PROFILES ==========
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- ========== ADDRESSES ==========
CREATE TABLE IF NOT EXISTS addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  street TEXT NOT NULL,
  city TEXT NOT NULL,
  postal TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'LV',
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own addresses"
  ON addresses FOR ALL USING (auth.uid() = user_id);

-- ========== ORDERS ==========
CREATE TYPE order_status AS ENUM ('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded');

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES profiles(id),
  status order_status NOT NULL DEFAULT 'pending',
  contact_email TEXT NOT NULL,
  contact_first_name TEXT NOT NULL,
  contact_last_name TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  shipping_method TEXT NOT NULL,
  shipping_street TEXT,
  shipping_city TEXT,
  shipping_postal TEXT,
  shipping_country TEXT DEFAULT 'LV',
  subtotal NUMERIC(10, 2) NOT NULL,
  shipping_cost NUMERIC(10, 2) NOT NULL DEFAULT 0,
  discount NUMERIC(10, 2) DEFAULT 0,
  vat NUMERIC(10, 2) NOT NULL,
  total NUMERIC(10, 2) NOT NULL,
  coupon_code TEXT,
  stripe_payment_intent_id TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT USING (
    auth.uid() = user_id OR
    auth.role() = 'service_role'
  );

CREATE POLICY "Service role can manage orders"
  ON orders FOR ALL USING (auth.role() = 'service_role');

-- Generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
  SELECT '8K-' || to_char(NOW(), 'YYYY') || '-' || lpad(floor(random() * 9000 + 1000)::TEXT, 4, '0');
$$ LANGUAGE SQL;

-- ========== ORDER ITEMS ==========
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  product_name TEXT NOT NULL,
  product_slug TEXT NOT NULL,
  variant_id TEXT,
  variant_name TEXT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage order items"
  ON order_items FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- ========== DEMO DATA ==========
INSERT INTO products (slug, name_lv, description, price, currency, images, category, age_min, age_max, in_stock, stock_count, badge, brand, sku) VALUES
  ('beleduc-skaranas-spele', 'Beleduc Šķirošanas spēle', 'Krāsains koka šķirošanas centrs ar dažādām formām un izmēriem. Veicina roku–acu koordināciju.', 34.99, 'EUR', ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop'], 'sensorie', 1, 4, true, 12, 'POPULĀRS', 'Beleduc', 'BEL-SS-001'),
  ('koka-puzzles-dzivnieki', 'Koka puzle Dzīvnieki', '24 gabalu koka puzle ar krāsainiem meža dzīvniekiem.', 19.99, 'EUR', ARRAY['https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&h=600&fit=crop'], 'koka', 2, 6, true, 8, 'IZPĀRDOŠANA', '8kajis', 'KAJ-PZ-002'),
  ('sensoro-bumbinu-komplekts', 'Sensoro bumbiņu komplekts', '6 bumbiņas ar dažādām faktūrām sensoru attīstībai.', 28.50, 'EUR', ARRAY['https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=600&h=600&fit=crop'], 'sensorie', 0, 99, true, 25, 'JAUNS', '8kajis', 'KAJ-SB-003');

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
