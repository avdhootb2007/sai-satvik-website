import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS as STATIC_PRODUCTS } from '../data/products';
import { supabase, isSupabaseConfigured, getStoredDemoProducts, saveStoredDemoProducts } from '../lib/supabase';

const ProductContext = createContext();

// Safe normalization function to guarantee every product has all required fields
export function normalizeProduct(p) {
  const regularPrice = Number(p.regular_price || (p.sizes && p.sizes[0] ? p.sizes[0].price : 60));
  const b2bPrice = Number(p.b2b_price || Math.round(regularPrice * 0.85));
  const unit = p.unit || (p.sizes && p.sizes[0] ? p.sizes[0].label : 'Unit');

  const defaultSizes = p.sizes && Array.isArray(p.sizes) && p.sizes.length > 0
    ? p.sizes.map(s => ({ ...s, price: Number(s.price || regularPrice) }))
    : [
        { label: `1 ${unit}`, price: regularPrice },
        { label: `Bulk / B2B`, price: b2bPrice }
      ];

  return {
    ...p,
    id: String(p.id || 'prod-' + Math.random()),
    name: p.name || 'दूध उत्पादन',
    englishName: p.englishName || p.english_name || 'Dairy Product',
    category: p.category || 'milk',
    description: p.description || '',
    image: p.image || '/images/milk.png',
    regular_price: regularPrice,
    b2b_price: b2bPrice,
    unit: unit,
    sizes: defaultSizes,
    in_stock: p.in_stock !== false,
    tag: p.tag || ''
  };
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    // Start with normalized static products
    const initialList = STATIC_PRODUCTS.map(normalizeProduct);
    const stored = getStoredDemoProducts();
    if (stored && Array.isArray(stored) && stored.length > 0) {
      // Merge stored prices/stock status into initial list
      return stored.map(normalizeProduct);
    }
    return initialList;
  });

  const [loading, setLoading] = useState(true);

  // Fetch from Supabase if configured and listen for real-time changes
  useEffect(() => {
    let channel = null;

    const fetchProducts = async () => {
      if (isSupabaseConfigured && supabase) {
        try {
          const { data, error } = await supabase.from('products').select('*');
          if (!error && data && data.length > 0) {
            const normalized = data.map(normalizeProduct);
            setProducts(normalized);
            saveStoredDemoProducts(normalized);
          }
        } catch (err) {
          console.error("Error fetching live products from Supabase:", err);
        }
      }
      setLoading(false);
    };

    fetchProducts();

    // Set up real-time subscription for Supabase products table
    if (isSupabaseConfigured && supabase) {
      try {
        channel = supabase
          .channel('public:products')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, (payload) => {
            fetchProducts();
          })
          .subscribe();
      } catch (e) {
        console.error("Realtime subscription error:", e);
      }
    }

    return () => {
      if (channel && supabase) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  // Update a single product (price, stock, details)
  const updateProduct = async (updatedProdData) => {
    const normalized = normalizeProduct(updatedProdData);

    // Update local state immediately for instant UI feedback across all components
    setProducts(prevProducts => {
      const exists = prevProducts.some(p => p.id === normalized.id);
      let newList;
      if (exists) {
        newList = prevProducts.map(p => p.id === normalized.id ? { ...p, ...normalized } : p);
      } else {
        newList = [normalized, ...prevProducts];
      }
      saveStoredDemoProducts(newList);
      return newList;
    });

    // Sync with Supabase DB if connected
    if (isSupabaseConfigured && supabase) {
      try {
        const payload = {
          id: normalized.id,
          name: normalized.name,
          english_name: normalized.englishName,
          category: normalized.category,
          regular_price: normalized.regular_price,
          b2b_price: normalized.b2b_price,
          unit: normalized.unit,
          in_stock: normalized.in_stock,
          image: normalized.image,
          description: normalized.description || '',
          tag: normalized.tag || ''
        };
        await supabase.from('products').upsert([payload]);
      } catch (err) {
        console.error("Error saving product to Supabase:", err);
      }
    }
  };

  // Delete a product
  const deleteProduct = async (id) => {
    setProducts(prevProducts => {
      const newList = prevProducts.filter(p => p.id !== id);
      saveStoredDemoProducts(newList);
      return newList;
    });

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('products').delete().eq('id', id);
      } catch (err) {
        console.error("Error deleting product from Supabase:", err);
      }
    }
  };

  return (
    <ProductContext.Provider value={{ products, loading, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
