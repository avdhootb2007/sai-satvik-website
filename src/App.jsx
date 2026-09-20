import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategorySection from './components/CategorySection';
import ProductGrid from './components/ProductGrid';
import WhyUs from './components/WhyUs';
import AboutSection from './components/AboutSection';
import LocationSection from './components/LocationSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import WhatsAppModal from './components/WhatsAppModal';
import MobileStickyBar from './components/MobileStickyBar';
import HotelAuthModal from './components/HotelAuthModal';
import ManagerAuthModal from './components/ManagerAuthModal';
import HotelResortPortal from './components/HotelResortPortal';
import DairyManagerPortal from './components/DairyManagerPortal';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ProductProvider } from './context/ProductContext';
import { PRODUCTS } from './data/products';
import { Home } from 'lucide-react';

function MainAppContent() {
  const { activePortal, setActivePortal } = useAuth();
  const { t } = useLanguage();

  const [activeCategory, setActiveCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(PRODUCTS[0]);
  const [modalSize, setModalSize] = useState(PRODUCTS[0].sizes ? PRODUCTS[0].sizes[0] : { label: '1 Unit', price: 60 });

  const handleOpenOrderModal = (product = null, size = null) => {
    const targetProd = product || PRODUCTS[0];
    const targetSizes = targetProd.sizes || [{ label: `1 ${targetProd.unit || 'Unit'}`, price: Number(targetProd.regular_price || 60) }];
    setModalProduct(targetProd);
    setModalSize(size || targetSizes[0]);
    setIsModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Sticky responsive navbar with Language & Portal Switchers */}
      <Navbar 
        onOpenOrderModal={() => handleOpenOrderModal()}
        activeCategory={activeCategory} 
      />

      {/* Global Interface Switcher Bar when Hotel portal is active */}
      {activePortal === 'hotel_resort' && (
        <div style={{
          backgroundColor: 'var(--color-primary-dark)',
          color: '#EBF5EE',
          padding: '0.6rem 1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid var(--color-gold)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.88rem' }}>
            <span>{t('hotelPortal')} ({t('activeView')})</span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setActivePortal('none')}
              style={{
                backgroundColor: 'var(--color-gold)',
                color: 'var(--color-primary-dark)',
                border: 'none',
                padding: '4px 12px',
                borderRadius: '4px',
                fontWeight: 800,
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Home size={14} /> {t('publicSite')}
            </button>
          </div>
        </div>
      )}


      {/* RENDER VIEW BASED ON ACTIVE PORTAL */}
      {activePortal === 'hotel_resort' ? (
        <HotelResortPortal />
      ) : activePortal === 'dairy_manager' ? (
        <DairyManagerPortal />
      ) : (
        <>
          {/* Public Retail Website */}
          <Hero 
            onOpenOrderModal={() => handleOpenOrderModal()} 
          />

          <CategorySection 
            activeCategory={activeCategory} 
            onSelectCategory={setActiveCategory} 
          />

          <ProductGrid 
            activeCategory={activeCategory} 
            onSelectCategory={setActiveCategory}
            onOrderClick={handleOpenOrderModal}
          />

          <WhyUs />
          <AboutSection />
          <LocationSection />
          <ContactSection />
        </>
      )}

      {/* Footer */}
      <Footer onSelectCategory={setActiveCategory} />

      {/* WhatsApp Quick Order System Modal */}
      <WhatsAppModal 
        isOpen={isModalOpen}
        onClose={handleCloseOrderModal}
        selectedProduct={modalProduct}
        selectedSize={modalSize}
      />

      {/* Separate B2B & Manager Authentication Modals */}
      <HotelAuthModal />
      <ManagerAuthModal />

      {/* Mobile Floating Sticky Call & WhatsApp Bar */}
      <MobileStickyBar 
        onOpenOrderModal={() => handleOpenOrderModal()} 
      />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ProductProvider>
          <MainAppContent />
        </ProductProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

