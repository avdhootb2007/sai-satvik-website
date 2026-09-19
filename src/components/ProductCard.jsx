import React, { useState } from 'react';
import { MessageCircle, CheckCircle, Tag } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';

export default function ProductCard({ product, onOrderClick }) {
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
            ★ बेस्ट सेलर
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
        
        {/* Category & English name */}
        <div style={{
          fontSize: '0.82rem',
          fontWeight: 700,
          color: 'var(--color-primary)',
          textTransform: 'uppercase',
          marginBottom: '0.25rem'
        }}>
          {product.englishName}
        </div>

        {/* Marathi Product Title */}
        <h3 className="marathi-heading" style={{
          fontSize: '1.35rem',
          fontWeight: 800,
          color: 'var(--color-primary-dark)',
          marginBottom: '0.5rem',
          lineHeight: 1.25
        }}>
          {product.name}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: '0.92rem',
          color: 'var(--color-granite)',
          lineHeight: 1.5,
          marginBottom: '1rem',
          flexGrow: 1
        }}>
          {product.description}
        </p>

        {/* Size Selection Radio Pills */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{
            fontSize: '0.82rem',
            fontWeight: 700,
            color: 'var(--color-granite-dark)',
            marginBottom: '0.4rem',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span>उपलब्ध साईझ (Sizes):</span>
            <span style={{ color: 'var(--color-primary)', fontWeight: 800 }}>
              ₹{currentSize.price}
            </span>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {product.sizes.map((size, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSizeIndex(idx)}
                style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-sm)',
                  border: idx === selectedSizeIndex 
                    ? '2px solid var(--color-primary)' 
                    : '1px solid rgba(15, 90, 49, 0.15)',
                  backgroundColor: idx === selectedSizeIndex 
                    ? 'var(--color-primary-soft)' 
                    : 'var(--color-white)',
                  color: idx === selectedSizeIndex 
                    ? 'var(--color-primary-dark)' 
                    : 'var(--color-granite)',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
              >
                {size.label} - ₹{size.price}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Price & Order Button */}
        <div style={{
          paddingTop: '0.85rem',
          borderTop: '1px solid rgba(15, 90, 49, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-granite)', display: 'block' }}>किंमत (Price)</span>
            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
              ₹{currentSize.price}
            </span>
          </div>

          <button
            onClick={handleWhatsAppClick}
            className="btn btn-whatsapp"
            style={{
              padding: '0.65rem 1.1rem',
              fontSize: '0.9rem',
              borderRadius: 'var(--radius-full)'
            }}
          >
            <MessageCircle size={17} />
            <span>ऑर्डर करा</span>
          </button>
        </div>

      </div>

      <style>{`
        .card-base:hover .product-card-img {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
