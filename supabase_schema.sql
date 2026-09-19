-- ==========================================================
-- SAI SATVIK DAIRY PRODUCTS - SUPABASE DATABASE SCHEMA
-- Dual Interface: Hotel/Resort B2B Portal & Dairy Manager Portal
-- ==========================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------
-- 1. PROFILES TABLE (User Accounts & Roles)
-- Roles: 'hotel_resort', 'dairy_manager'
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'hotel_resort' CHECK (role IN ('hotel_resort', 'dairy_manager')),
  business_name TEXT NOT NULL,
  business_type TEXT NOT NULL DEFAULT 'hotel' CHECK (business_type IN ('hotel', 'resort', 'restaurant', 'caterer', 'dairy_manager')),
  contact_person TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  gst_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------
-- 2. PRODUCTS TABLE (Dairy Catalog with B2B Bulk Pricing)
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  english_name TEXT NOT NULL,
  category TEXT NOT NULL,
  regular_price NUMERIC(10,2) NOT NULL,
  b2b_price NUMERIC(10,2) NOT NULL, -- Special bulk price for Resorts/Hotels
  unit TEXT NOT NULL, -- e.g. 'Liter', 'Kg', 'Pack'
  min_bulk_qty INT NOT NULL DEFAULT 5,
  image TEXT,
  in_stock BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------
-- 3. ORDERS TABLE (Incoming Orders from Hotels/Resorts)
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  business_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  phone TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  delivery_date DATE NOT NULL DEFAULT CURRENT_DATE,
  total_amount NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'out_for_delivery', 'delivered', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------
-- 4. ORDER_ITEMS TABLE (Line items per order)
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  unit TEXT NOT NULL,
  price_per_unit NUMERIC(10,2) NOT NULL,
  quantity INT NOT NULL,
  total_price NUMERIC(10,2) NOT NULL
);

-- ----------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ----------------------------------------------------------

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can view & update their own profile; Managers can view all profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'dairy_manager'
  ));

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Products: Everyone can read products; Managers can insert/update/delete
CREATE POLICY "Public read products" ON public.products
  FOR SELECT USING (true);

CREATE POLICY "Manager write products" ON public.products
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'dairy_manager')
  );

-- Orders: Users can read & insert their own orders; Managers can read & update all orders
CREATE POLICY "Users view own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'dairy_manager'
  ));

CREATE POLICY "Users insert orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Managers update orders" ON public.orders
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'dairy_manager')
  );

-- Order Items: Users view own items; Managers view all items
CREATE POLICY "Users view order items" ON public.order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = order_items.order_id 
      AND (orders.user_id = auth.uid() OR EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'dairy_manager'
      ))
    )
  );

CREATE POLICY "Users insert order items" ON public.order_items
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
  );

-- ----------------------------------------------------------
-- INITIAL SEED DATA FOR PRODUCTS
-- ----------------------------------------------------------
INSERT INTO public.products (name, english_name, category, regular_price, b2b_price, unit, min_bulk_qty, image, in_stock)
VALUES 
  ('ताजे दूध (Fresh Cow Milk)', 'Fresh Cow Milk', 'milk', 60.00, 52.00, 'Liter', 10, '/images/milk.png', true),
  ('शुद्ध म्हशीचे दूध (Buffalo Milk)', 'Pure Buffalo Milk', 'milk', 75.00, 68.00, 'Liter', 10, '/images/milk.png', true),
  ('ताजे दही (Thick Fresh Curd)', 'Thick Fresh Curd', 'curd', 70.00, 58.00, 'Kg', 5, '/images/curd.png', true),
  ('शुद्ध सात्विक तूप (Pure Cow Ghee)', 'Pure Cow Ghee', 'ghee', 750.00, 680.00, 'Kg', 2, '/images/ghee.png', true),
  ('ताजे मऊ पनीर (Fresh Soft Paneer)', 'Fresh Soft Paneer', 'paneer', 380.00, 330.00, 'Kg', 3, '/images/ghee.png', true),
  ('केसर श्रीखंड (Kesar Shrikhand)', 'Kesar Shrikhand', 'shrikhand', 280.00, 240.00, 'Kg', 3, '/images/shrikhand.png', true),
  ('गुलाब जामुन (Gulab Jamun Bulk)', 'Gulab Jamun Bulk', 'sweets', 260.00, 220.00, 'Kg', 5, '/images/sweets.png', true)
ON CONFLICT DO NOTHING;
