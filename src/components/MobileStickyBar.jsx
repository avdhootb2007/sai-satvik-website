import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

export default function MobileStickyBar({ onOpenOrderModal }) {
  const { language } = useLanguage();

  return (
    <div 
      className="mobile-sticky-bar"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(15, 90, 49, 0.15)',
        padding: '0.65rem 1rem',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
        display: 'none'
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        
        {/* Call Now Button */}
        <a 
          href={`tel:${BUSINESS_INFO.primaryPhone}`}
          className="btn btn-primary"
          style={{
            padding: '0.75rem 0.5rem',
            fontSize: '0.92rem',
            borderRadius: 'var(--radius-full)',
            justifyContent: 'center',
            fontWeight: 800
          }}
        >
          <Phone size={18} />
          <span>{language === 'mr' ? 'फोन करा' : 'Call Now'}</span>
        </a>

        {/* WhatsApp Order Button */}
        <button 
          onClick={() => onOpenOrderModal()}
          className="btn btn-whatsapp"
          style={{
            padding: '0.75rem 0.5rem',
            fontSize: '0.92rem',
            borderRadius: 'var(--radius-full)',
            justifyContent: 'center',
            fontWeight: 800
          }}
        >
          <MessageCircle size={18} />
          <span>{language === 'mr' ? 'ऑर्डर करा' : 'Order Now'}</span>
        </button>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-sticky-bar {
            display: block !important;
          }
          body {
            padding-bottom: 70px;
          }
        }
      `}</style>
    </div>
  );
}
