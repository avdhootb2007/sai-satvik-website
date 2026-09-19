import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project-id') &&
  !supabaseAnonKey.includes('your-actual-anon-key')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Mock local storage helper for instant testing when Supabase keys are not set
const STORAGE_KEYS = {
  USER: 'sai_satvik_demo_user',
  ORDERS: 'sai_satvik_demo_orders',
  PRODUCTS: 'sai_satvik_demo_products'
};

export const INITIAL_DEMO_PRODUCTS = [
  { id: 'p1', name: 'ताजे गाईचे दूध (Fresh Cow Milk)', english_name: 'Fresh Cow Milk', category: 'milk', regular_price: 60, b2b_price: 52, unit: 'Liter', min_bulk_qty: 10, image: '/images/milk.png', in_stock: true },
  { id: 'p2', name: 'शुद्ध म्हशीचे दूध (Buffalo Milk)', english_name: 'Pure Buffalo Milk', category: 'milk', regular_price: 75, b2b_price: 68, unit: 'Liter', min_bulk_qty: 10, image: '/images/fresh_milk_1789487715243.png', in_stock: true },
  { id: 'p3', name: 'ताजे चक्का दही (Thick Curd)', english_name: 'Thick Fresh Curd', category: 'curd', regular_price: 70, b2b_price: 58, unit: 'Kg', min_bulk_qty: 5, image: '/images/curd.png', in_stock: true },
  { id: 'p4', name: 'शुद्ध सात्विक तूप (Pure Cow Ghee)', english_name: 'Pure Cow Ghee', category: 'ghee', regular_price: 750, b2b_price: 680, unit: 'Kg', min_bulk_qty: 2, image: '/images/ghee.png', in_stock: true },
  { id: 'p5', name: 'ताजे मऊ पनीर (Fresh Paneer)', english_name: 'Fresh Soft Paneer', category: 'paneer', regular_price: 380, b2b_price: 330, unit: 'Kg', min_bulk_qty: 3, image: '/images/shuddha_ghee_1789487763476.png', in_stock: true },
  { id: 'p6', name: 'केसर श्रीखंड (Kesar Shrikhand)', english_name: 'Kesar Shrikhand', category: 'shrikhand', regular_price: 280, b2b_price: 240, unit: 'Kg', min_bulk_qty: 3, image: '/images/shrikhand.png', in_stock: true },
  { id: 'p7', name: 'गुलाब जामुन (Gulab Jamun Bulk)', english_name: 'Gulab Jamun Bulk', category: 'sweets', regular_price: 260, b2b_price: 220, unit: 'Kg', min_bulk_qty: 5, image: '/images/sweets.png', in_stock: true }
];

export const INITIAL_DEMO_ORDERS = [
  {
    id: 'ord-101',
    order_number: 'SS-ORD-9021',
    user_id: 'user-hotel-1',
    business_name: 'ताज रिसॉर्ट व हॉटेल (Taj Grand Resort)',
    contact_person: 'विक्रम पाटील (Manager)',
    phone: '9822123456',
    delivery_address: 'नाशिक रोड, निफाड फाटा, नाशिक',
    delivery_date: new Date().toISOString().split('T')[0],
    total_amount: 5200,
    status: 'confirmed',
    notes: 'कृपया सकाळी ७ वाजण्यापूर्वी पोहचवा.',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    items: [
      { product_name: 'ताजे गाईचे दूध (Fresh Cow Milk)', quantity: 50, unit: 'Liter', price_per_unit: 52, total_price: 2600 },
      { product_name: 'ताजे चक्का दही (Thick Curd)', quantity: 20, unit: 'Kg', price_per_unit: 58, total_price: 1160 },
      { product_name: 'ताजे मऊ पनीर (Fresh Paneer)', quantity: 4, unit: 'Kg', price_per_unit: 330, total_price: 1320 }
    ]
  },
  {
    id: 'ord-102',
    order_number: 'SS-ORD-9022',
    user_id: 'user-hotel-2',
    business_name: 'साई पॅलेस हॉटेल व डायनिंग (Hotel Sai Palace)',
    contact_person: 'संजय शिंदे (Owner)',
    phone: '9423987654',
    delivery_address: 'टाकळी रोड, निफाड',
    delivery_date: new Date().toISOString().split('T')[0],
    total_amount: 3400,
    status: 'pending',
    notes: 'दुधाचे कॅन स्वच्छ हवेत.',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    items: [
      { product_name: 'शुद्ध म्हशीचे दूध (Buffalo Milk)', quantity: 30, unit: 'Liter', price_per_unit: 68, total_price: 2040 },
      { product_name: 'शुद्ध सात्विक तूप (Pure Cow Ghee)', quantity: 2, unit: 'Kg', price_per_unit: 680, total_price: 1360 }
    ]
  }
];

export const getStoredDemoOrders = () => {
  const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
  return data ? JSON.parse(data) : INITIAL_DEMO_ORDERS;
};

export const saveStoredDemoOrders = (orders) => {
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
};

export const getStoredDemoProducts = () => {
  const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  return data ? JSON.parse(data) : INITIAL_DEMO_PRODUCTS;
};

export const saveStoredDemoProducts = (products) => {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
};
