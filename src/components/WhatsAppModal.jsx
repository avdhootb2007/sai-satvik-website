import React, { useState } from 'react';
import { X, MessageCircle, ShoppingBag, Plus, Minus, CheckCircle, MapPin } from 'lucide-react';
import { BUSINESS_INFO, PRODUCTS } from '../data/products';

export default function WhatsAppModal({ isOpen, onClose, selectedProduct: initialProduct, selectedSize: initialSize }) {
  if (!isOpen) return null;

  const activeProd = initialProduct || PRODUCTS[0];
  const activeSz = initialSize || activeProd.sizes[0];

  const [quantity, setQuantity] = useState(1);
  const [deliveryType, setDeliveryType] = useState('home'); // 'home' or 'pickup'
  const [addressNote, setAddressNote] = useState('');

  const totalPrice = activeSz.price * quantity;

  const handleSendWhatsAppOrder = () => {
    const deliveryText = deliveryType === 'home' 
      ? `🏠 होम डिलिव्हरी\n📍 पत्ता: ${addressNote || 'टाकळी / निफाड'}`
      : `🏪 दुकानातून पिकअप (Store Pickup)`;

    const text = `नमस्कार साई सात्विक डेअरी!\n\nमला खालील ऑर्डर द्यायची आहे:\n📦 *उत्पादन:* ${activeProd.name} (${activeProd.englishName})\n📏 *साईज:* ${activeSz.label}\n🔢 *प्रमाण (Qty):* ${quantity}\n💰 *एकूण रक्कम:* ₹${totalPrice}\n\n${deliveryText}\n\nकृपया कन्फर्मेशन द्या. धन्यवाद!`;

    const encodedText = encodeURIComponent(text);
    const url = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodedText}`;
    
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}
    onClick={onClose}
    >
      <div style={{
        backgroundColor: 'var(--color-white)',
        width: '100%',
        maxWidth: '520px',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden',
        position: 'relative',
        animation: 'floatAnimation 0.3s ease-out'
      }}
      onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Banner */}
        <div style={{
          backgroundColor: 'var(--color-primary-dark)',
          color: 'var(--color-white)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <MessageCircle size={24} style={{ color: '#25D366' }} />
            <div>
              <h3 className="marathi-heading" style={{ fontSize: '1.3rem', fontWeight: 800 }}>
                WhatsApp ऑर्डर फॉर्म
              </h3>
              <span style={{ fontSize: '0.8rem', opacity: 0.85 }}>साई सात्विक डेअरी उत्पादने</span>
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: 'var(--color-white)',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem', maxHeight: '80vh', overflowY: 'auto' }}>
          
          {/* Selected Product Summary Box */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            padding: '1rem',
            backgroundColor: 'var(--color-cream)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(15, 90, 49, 0.12)',
            marginBottom: '1.25rem',
            alignItems: 'center'
          }}>
            <img 
              src={activeProd.image} 
              alt={activeProd.name} 
              style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
            />
            <div style={{ flexGrow: 1 }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 700, textTransform: 'uppercase' }}>
                {activeProd.englishName}
              </span>
              <h4 className="marathi-heading" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                {activeProd.name}
              </h4>
              <div style={{ fontSize: '0.9rem', color: 'var(--color-granite)', fontWeight: 600 }}>
                साईझ: <strong>{activeSz.label}</strong> (₹{activeSz.price} प्रति युनिट)
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-granite-dark)', marginBottom: '0.5rem' }}>
              प्रमाण निवडा (Quantity):
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(15,90,49,0.2)',
                  backgroundColor: 'var(--color-cold-air)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontWeight: 800
                }}
              >
                <Minus size={18} />
              </button>

              <span style={{ fontSize: '1.25rem', fontWeight: 800, minWidth: '40px', textAlign: 'center' }}>
                {quantity}
              </span>

              <button 
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(15,90,49,0.2)',
                  backgroundColor: 'var(--color-primary-soft)',
                  color: 'var(--color-primary-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontWeight: 800
                }}
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Delivery Option Toggle */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-granite-dark)', marginBottom: '0.5rem' }}>
              डिलिव्हरीचा प्रकार (Delivery Option):
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <button 
                onClick={() => setDeliveryType('home')}
                style={{
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  border: deliveryType === 'home' ? '2px solid var(--color-primary)' : '1px solid rgba(15,90,49,0.15)',
                  backgroundColor: deliveryType === 'home' ? 'var(--color-primary-soft)' : 'var(--color-white)',
                  color: deliveryType === 'home' ? 'var(--color-primary-dark)' : 'var(--color-granite)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                🏠 होम डिलिव्हरी
              </button>
              <button 
                onClick={() => setDeliveryType('pickup')}
                style={{
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  border: deliveryType === 'pickup' ? '2px solid var(--color-primary)' : '1px solid rgba(15,90,49,0.15)',
                  backgroundColor: deliveryType === 'pickup' ? 'var(--color-primary-soft)' : 'var(--color-white)',
                  color: deliveryType === 'pickup' ? 'var(--color-primary-dark)' : 'var(--color-granite)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                🏪 दुकानात पिकअप
              </button>
            </div>
          </div>

          {/* Delivery Address Note (if Home Delivery) */}
          {deliveryType === 'home' && (
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-granite-dark)', marginBottom: '0.3rem' }}>
                तुमचा पत्ता (Delivery Address / Landmark):
              </label>
              <input 
                type="text"
                placeholder="उदा. साई नगर, बँक ऑफ बडोदा जवळ, टाकळी"
                value={addressNote}
                onChange={(e) => setAddressNote(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  fontSize: '0.9rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(15,90,49,0.2)',
                  outline: 'none',
                  backgroundColor: 'var(--color-cream)'
                }}
              />
            </div>
          )}

          {/* Total Amount Box */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            backgroundColor: 'var(--color-cold-air)',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '1.5rem',
            border: '1px solid rgba(15,90,49,0.1)'
          }}>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-granite-dark)' }}>
              एकूण देय रक्कम (Total):
            </span>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
              ₹{totalPrice}
            </span>
          </div>

          {/* Big WhatsApp Trigger Button */}
          <button 
            onClick={handleSendWhatsAppOrder}
            className="btn btn-whatsapp"
            style={{ width: '100%', justifyContent: 'center', padding: '0.9rem', fontSize: '1.05rem' }}
          >
            <MessageCircle size={22} />
            <span>WhatsApp वर ऑर्डर कन्फर्म करा</span>
          </button>

        </div>

      </div>
    </div>
  );
}
