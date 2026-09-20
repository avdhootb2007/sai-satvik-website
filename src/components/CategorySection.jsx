import React from 'react';
import { Milk, Container, GlassWater, Box, Flame, UtensilsCrossed, Sparkles, Gift } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { useLanguage } from '../context/LanguageContext';
import HoverPopWords from './HoverPopWords';

export default function CategorySection({ activeCategory, onSelectCategory }) {
  const { language, t } = useLanguage();

  const iconMap = {
    milk: Milk,
    curd: Container,
    buttermilk: GlassWater,
    paneer: Box,
    ghee: Flame,
    shrikhand: UtensilsCrossed,
    dairy: Sparkles,
    sweets: Gift
  };

  const categoryCards = CATEGORIES.filter(c => c.id !== 'all');

  return (
    <section id="categories" className="section-padding" style={{ backgroundColor: 'var(--color-cream)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header animate-text-reveal">
          <span className="section-subtitle glass-badge hover-pop-sentence">
            <Sparkles size={16} />
            <span>{t('categories')}</span>
          </span>
          <h2 className="section-title animate-text-shimmer">
            <HoverPopWords text={language === 'mr' ? 'आमची खास सात्विक श्रेणी' : 'Our Product Categories'} />
          </h2>
          <p className="section-desc hover-pop-sentence">
            {language === 'mr' 
              ? 'ताज्या दुधापासून बनवलेली १००% शुद्ध डेअरी उत्पादने व तोंडाला पाणी आणणारी पारंपारिक मिठाई.' 
              : '100% pure fresh dairy products and delicious traditional sweets made with pure ingredients.'}
          </p>
        </div>

        {/* Categories Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem'
        }}>
          {categoryCards.map((cat) => {
            const IconComponent = iconMap[cat.id] || Sparkles;
            const isSelected = activeCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  const el = document.getElementById('products');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="glass-card"
                style={{
                  padding: '1.75rem 1.25rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isSelected ? 'rgba(232, 245, 236, 0.9)' : 'rgba(255, 255, 255, 0.75)',
                  borderColor: isSelected ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.8)',
                  boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.85rem'
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--color-cold-air)',
                  color: isSelected ? 'var(--color-white)' : 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'var(--transition-smooth)',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.04)'
                }}>
                  <IconComponent size={28} />
                </div>

                <h3 className="marathi-heading" style={{
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: isSelected ? 'var(--color-primary-dark)' : 'var(--color-granite-dark)'
                }}>
                  {language === 'mr' ? cat.name : cat.english}
                </h3>

                <span style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--color-granite)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {language === 'mr' ? cat.english : cat.name}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
