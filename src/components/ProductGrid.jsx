import React, { useState } from 'react';
import { Search, Sparkles, Filter, X } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from './ProductCard';

export default function ProductGrid({ activeCategory, onSelectCategory, onOrderClick }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on selected category & search query
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="products" className="section-padding" style={{ backgroundColor: 'var(--color-cold-air)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">
            <Sparkles size={16} />
            <span>खास उत्पादने (Featured Products)</span>
          </span>
          <h2 className="section-title">शुद्ध व ताजे डेअरी प्रोडक्ट्स व मिठाई</h2>
          <p className="section-desc">
            तुमच्या पसंतीचे उत्पादन निवडा आणि थेट WhatsApp वरून होम डिलिव्हरी किंवा स्टोअर पिकअपसाठी ऑर्डर करा.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div style={{
          backgroundColor: 'var(--color-white)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          
          {/* Top Row: Search Input */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <Search 
              size={20} 
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-granite)'
              }} 
            />
            <input 
              type="text"
              placeholder="उत्पादन शोधा (Search milk, ghee, peda, paneer...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.8rem 1rem 0.8rem 2.8rem',
                fontSize: '0.98rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(15, 90, 49, 0.2)',
                backgroundColor: 'var(--color-cream)',
                outline: 'none',
                transition: 'var(--transition-fast)'
              }}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-granite)'
                }}
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Bottom Row: Category Tabs Pills */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.4rem',
            justifyContent: 'flex-start'
          }} className="category-tabs-scroll">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  style={{
                    padding: '0.55rem 1.25rem',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'var(--transition-fast)',
                    backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--color-cream)',
                    color: isSelected ? 'var(--color-white)' : 'var(--color-granite-dark)',
                    boxShadow: isSelected ? '0 4px 12px rgba(15, 90, 49, 0.25)' : 'none'
                  }}
                >
                  {cat.name} ({cat.id === 'all' ? PRODUCTS.length : PRODUCTS.filter(p => p.category === cat.id).length})
                </button>
              );
            })}
          </div>

        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.75rem'
          }}>
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onOrderClick={onOrderClick}
              />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '4rem 1.5rem',
            backgroundColor: 'var(--color-white)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h3 className="marathi-heading" style={{ fontSize: '1.5rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
              कोणतेही उत्पादन सापडले नाही
            </h3>
            <p style={{ color: 'var(--color-granite)', marginBottom: '1.5rem' }}>
              कृपया शोध शब्द बदला किंवा सर्व उत्पादने श्रेणी पहा.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); onSelectCategory('all'); }}
              className="btn btn-primary"
            >
              सर्व उत्पादने पहा
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
