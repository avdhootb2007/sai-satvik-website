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
import { PRODUCTS } from './data/products';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(PRODUCTS[0]);
  const [modalSize, setModalSize] = useState(PRODUCTS[0].sizes[0]);

  const handleOpenOrderModal = (product = null, size = null) => {
    if (product) {
      setModalProduct(product);
      setModalSize(size || product.sizes[0]);
    } else {
      setModalProduct(PRODUCTS[0]);
      setModalSize(PRODUCTS[0].sizes[0]);
    }
    setIsModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. Sticky responsive navbar */}
      <Navbar 
        onOpenOrderModal={() => handleOpenOrderModal()}
        activeCategory={activeCategory} 
      />

      {/* 2. Hero section */}
      <Hero 
        onOpenOrderModal={() => handleOpenOrderModal()} 
      />

      {/* 3. Product categories */}
      <CategorySection 
        activeCategory={activeCategory} 
        onSelectCategory={setActiveCategory} 
      />

      {/* 4. Featured products showcase */}
      <ProductGrid 
        activeCategory={activeCategory} 
        onSelectCategory={setActiveCategory}
        onOrderClick={handleOpenOrderModal}
      />

      {/* 5. Why choose Sai Satvik */}
      <WhyUs />

      {/* 6. About the business */}
      <AboutSection />

      {/* 7. Store/location section */}
      <LocationSection />

      {/* 8. Contact section */}
      <ContactSection />

      {/* 9. Footer */}
      <Footer onSelectCategory={setActiveCategory} />

      {/* WhatsApp Quick Order System Modal */}
      <WhatsAppModal 
        isOpen={isModalOpen}
        onClose={handleCloseOrderModal}
        selectedProduct={modalProduct}
        selectedSize={modalSize}
      />

      {/* Mobile Floating Sticky Call & WhatsApp Bar */}
      <MobileStickyBar 
        onOpenOrderModal={() => handleOpenOrderModal()} 
      />

    </div>
  );
}
