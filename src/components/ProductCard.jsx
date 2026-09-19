import React, { useState } from 'react';
import { MessageCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ProductCard({ product, onOrderClick }) {
  const { language, t } = useLanguage();
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const currentSize = product.sizes[selectedSizeIndex];

  const handleWhatsAppClick = () => {
    onOrderClick(product, currentSize);
  };

  return (
    <div className="card-base" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
      position: 'relative'
    }}>
      
      {/* Top Image Box */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '210px',
        backgroundColor: 'var(--color-cold-air)',
        overflow: 'hidden'
      }}>
        <img 
          src={product.image} 
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          className="product-card-img"
        />

        {/* Tag Badge */}
        {product.tag && (
          <div style={{
            position: 'absolute',
            top: '0.85rem',
            left: '0.85rem',
            backgroundColor: 'rgba(15, 90, 49, 0.9)',
            backdropFilter: 'blur(4px)',
            color: 'var(--color-white)',
            fontSize: '0.78rem',
            fontWeight: 700,
            padding: '0.3rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem'
          }}>
            <CheckCircle size={12} style={{ color: 'var(--color-gold)' }} />
            <span>{product.tag}</span>
          </div>
        )}

        {/* Popular Ribbon */}
        {product.isPopular && (
          <div style={{
            position: 'absolute',
            top: '0.85rem',
            right: '0.85rem',
            backgroundColor: 'var(--color-gold)',
            color: '#1A1A1A',
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '0.25rem 0.65rem',
            borderRadius: 'var(--radius-full)'
          }}>
            {language === 'mr' ? 'बेस्ट सेलर' : 'BEST SELLER'}
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
      }}>
        
        {/* Subtitle */}
        <div style={{
          fontSize: '0.82rem',
          fontWeight: 700,
          color: 'var(--color-primary)',
          textTransform: 'uppercase',
          marginBottom: '0.25rem'
        }}>
          {language === 'mr' ? product.englishName : product.category.toUpperCase()}
        </div>

        {/* Main Title */}
        <h3 className="marathi-heading" style={{
          fontSize: '1.35rem',
          fontWeight: 800,
          color: 'var(--color-primary-dark)',
          marginBottom: '0.5rem',
          lineHeight: 1.25
        }}>
          {language === 'mr' ? product.name : product.englishName}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: '0.9rem',
          color: 'var(--color-granite)',
          lineHeight: 1.5,
          marginBottom: '1.25rem',
          flexGrow: 1
        }}>
          {product.description}
        </p>

        {/* Sizes Selector */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-granite-dark)', marginBottom: '0.4rem' }}>
            {language === 'mr' ? 'साईज निवडा:' : 'Select Size:'}
          </div>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {product.sizes.map((sz, idx) => (
              <button
                key={sz.label}
                type="button"
                onClick={() => setSelectedSizeIndex(idx)}
                style={{
                  padding: '0.35rem 0.65rem',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-sm)',
                  border: selectedSizeIndex === idx ? '2px solid var(--color-primary)' : '1px solid rgba(15, 90, 49, 0.2)',
                  backgroundColor: selectedSizeIndex === idx ? 'var(--color-primary-soft)' : 'var(--color-white)',
                  color: selectedSizeIndex === idx ? 'var(--color-primary-dark)' : 'var(--color-granite-dark)',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
              >
                {sz.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price & Order Action Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '0.85rem',
          borderTop: '1px solid rgba(15, 90, 49, 0.1)'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-granite)', display: 'block' }}>
              {language === 'mr' ? 'एकूण किंमत' : 'Price'}
            </span>
            <span style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
              ₹{currentSize.price}
            </span>
          </div>

          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="btn btn-whatsapp"
            style={{ fontSize: '0.88rem', padding: '0.55rem 1.1rem' }}
          >
            <MessageCircle size={16} />
            <span>{language === 'mr' ? 'ऑर्डर करा' : 'Order Now'}</span>
          </button>
        </div>

      </div>

    </div>
  );
}
