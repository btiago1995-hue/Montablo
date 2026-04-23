-- MonTablo Database Schema

-- restaurants
CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  cover_url TEXT,
  primary_color TEXT DEFAULT '#1A1A1A',
  secondary_color TEXT DEFAULT '#D4A574',
  unavailable_behavior TEXT DEFAULT 'greyed_out' CHECK (unavailable_behavior IN ('greyed_out', 'hidden')),
  google_review_url TEXT,
  languages TEXT[] DEFAULT '{fr}',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  subscription_status TEXT DEFAULT 'trialing' CHECK (subscription_status IN ('trialing', 'active', 'past_due', 'canceled', 'inactive')),
  trial_ends_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '14 days',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- categories
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  name_fr TEXT NOT NULL,
  name_en TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- items
CREATE TABLE items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  name_fr TEXT NOT NULL,
  name_en TEXT,
  description_fr TEXT,
  description_en TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  allergens TEXT[] DEFAULT '{}',
  is_available BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- promotions
CREATE TABLE promotions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID REFERENCES items(id) ON DELETE CASCADE,
  original_price DECIMAL(10,2) NOT NULL,
  promo_price DECIMAL(10,2) NOT NULL,
  starts_at TIMESTAMPTZ DEFAULT NOW(),
  ends_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- daily_menus
CREATE TABLE daily_menus (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  title_fr TEXT NOT NULL DEFAULT 'Menu du jour',
  title_en TEXT DEFAULT 'Daily menu',
  description_fr TEXT,
  description_en TEXT,
  price DECIMAL(10,2),
  items_description_fr TEXT,
  items_description_en TEXT,
  valid_date DATE NOT NULL DEFAULT CURRENT_DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- reviews
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_restaurants_slug ON restaurants(slug);
CREATE INDEX idx_items_restaurant ON items(restaurant_id);
CREATE INDEX idx_items_category ON items(category_id);
CREATE INDEX idx_categories_restaurant ON categories(restaurant_id);
CREATE INDEX idx_promotions_item ON promotions(item_id);
CREATE INDEX idx_daily_menus_restaurant_date ON daily_menus(restaurant_id, valid_date);

-- RLS
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_menus ENABLE ROW LEVEL SECURITY;

-- Restaurants policies
CREATE POLICY "Owner full access" ON restaurants FOR ALL USING (owner_id = auth.uid());
CREATE POLICY "Public read active" ON restaurants FOR SELECT USING (subscription_status IN ('trialing', 'active'));

-- Categories policies
CREATE POLICY "Owner full access" ON categories FOR ALL USING (restaurant_id IN (SELECT id FROM restaurants WHERE owner_id = auth.uid()));
CREATE POLICY "Public read" ON categories FOR SELECT USING (restaurant_id IN (SELECT id FROM restaurants WHERE subscription_status IN ('trialing', 'active')));

-- Items policies
CREATE POLICY "Owner full access" ON items FOR ALL USING (restaurant_id IN (SELECT id FROM restaurants WHERE owner_id = auth.uid()));
CREATE POLICY "Public read" ON items FOR SELECT USING (restaurant_id IN (SELECT id FROM restaurants WHERE subscription_status IN ('trialing', 'active')));

-- Promotions policies
CREATE POLICY "Owner full access" ON promotions FOR ALL USING (item_id IN (SELECT id FROM items WHERE restaurant_id IN (SELECT id FROM restaurants WHERE owner_id = auth.uid())));
CREATE POLICY "Public read" ON promotions FOR SELECT USING (item_id IN (SELECT id FROM items WHERE restaurant_id IN (SELECT id FROM restaurants WHERE subscription_status IN ('trialing', 'active'))));

-- Daily menus policies
CREATE POLICY "Owner full access" ON daily_menus FOR ALL USING (restaurant_id IN (SELECT id FROM restaurants WHERE owner_id = auth.uid()));
CREATE POLICY "Public read" ON daily_menus FOR SELECT USING (restaurant_id IN (SELECT id FROM restaurants WHERE subscription_status IN ('trialing', 'active')));

-- 2026-04-21: restaurant address + GPS for Google Wallet hero + locations
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS address_line TEXT;
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS postal_code TEXT;
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS country_code TEXT DEFAULT 'FR';
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION;
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION;
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS geocoded_at TIMESTAMPTZ;
