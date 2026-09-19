import React, { useState } from 'react';
import { Search, Sparkles, X } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from './ProductCard';
import { useLanguage } from '../context/LanguageContext';

export default function ProductGrid({ activeCategory, onSelectCategory, onOrderClick }) {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

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
            <span>{t('products')}</span>
          </span>
          <h2 className="section-title">
            {language === 'mr' ? 'शुद्ध व ताजे डेअरी प्रोडक्ट्स व मिठाई' : 'Pure Fresh Dairy Products & Sweets'}
          </h2>
          <p className="section-desc">
            {language === 'mr' 
              ? 'तुमच्या पसंतीचे उत्पादन निवडा आणि थेट WhatsApp वरून होम डिलिव्हरी किंवा स्टोअर पिकअपसाठी ऑर्डर करा.'
              : 'Select your preferred products and order directly via WhatsApp for Home Delivery or Store Pickup.'}
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
              placeholder={language === 'mr' ? 'उत्पादन शोधा (दूध, तूप, पनीर, दही...)' : 'Search products (Milk, Ghee, Paneer, Curd...)'}
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

          {/* Category Tabs Pills */}
          <div style={{
            display: 'flex',
            gap: '0.6rem',
            overflowX: 'auto',
            paddingBottom: '0.25rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  style={{
                    padding: '0.5rem 1.1rem',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--color-primary)' : 'rgba(15, 90, 49, 0.15)',
                    backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--color-white)',
                    color: isSelected ? 'var(--color-white)' : 'var(--color-granite-dark)',
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {language === 'mr' ? cat.name : cat.english}
                </button>
              );
            })}
          </div>

        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 1rem',
            backgroundColor: 'var(--color-white)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 className="marathi-heading" style={{ fontSize: '1.4rem', color: 'var(--color-granite-dark)', marginBottom: '0.5rem' }}>
              {language === 'mr' ? 'कोणतेही उत्पादन सापडले नाही' : 'No matching products found'}
            </h3>
            <p style={{ color: 'var(--color-granite)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              {language === 'mr' ? 'कृपया फिल्टर किंवा शोध शब्द बदलून पहा.' : 'Please try searching with another keyword or filter.'}
            </p>
            <button
              onClick={() => {
                onSelectCategory('all');
                setSearchQuery('');
              }}
              className="btn btn-secondary"
            >
              {language === 'mr' ? 'सर्व उत्पादने पहा' : 'Show All Products'}
            </button>
          </div>
        ) : (
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
        )}

      </div>
    </section>
  );
}
