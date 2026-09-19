import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  Truck, 
  AlertCircle, 
  Plus, 
  Minus, 
  Calendar, 
  MapPin, 
  Phone, 
  Repeat, 
  Send, 
  FileText,
  User,
  XCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { supabase, isSupabaseConfigured, getStoredDemoOrders, saveStoredDemoOrders, getStoredDemoProducts } from '../lib/supabase';

export default function HotelResortPortal() {
  const { user } = useAuth();
  const { language, t } = useLanguage();

  const [activeTab, setActiveTab] = useState('new_order');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState({});
  const [deliveryDate, setDeliveryDate] = useState(new Date().toISOString().split('T')[0]);
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccessMsg, setOrderSuccessMsg] = useState('');

  const [recurringConfig, setRecurringConfig] = useState(() => {
    const saved = localStorage.getItem('sai_satvik_recurring_' + (user?.id || 'demo'));
    return saved ? JSON.parse(saved) : { enabled: false, preferred_time: '06:30 AM', items: {} };
  });

  useEffect(() => {
    fetchProductsAndOrders();
  }, [user]);

  const fetchProductsAndOrders = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data: prods } = await supabase.from('products').select('*');
        if (prods) setProducts(prods);

        if (user?.id) {
          const { data: ords } = await supabase
            .from('orders')
            .select('*, order_items(*)')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });
          if (ords) setOrders(ords);
        }
      } catch (err) {
        console.error("Error fetching Supabase B2B data:", err);
      }
    } else {
      setProducts(getStoredDemoProducts());
      const allDemoOrders = getStoredDemoOrders();
      const userOrders = allDemoOrders.filter(o => o.user_id === user?.id || o.user_id === 'user-hotel-1' || o.user_id === 'hotel-001' || o.user_id === 'hotel-demo');
      setOrders(userOrders.length > 0 ? userOrders : allDemoOrders);
    }
  };

  const updateCartQty = (productId, change) => {
    setCart(prev => {
      const current = prev[productId] || 0;
      const updated = Math.max(0, current + change);
      if (updated === 0) {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return { ...prev, [productId]: updated };
    });
  };

  const calculateTotal = () => {
    let total = 0;
    Object.keys(cart).forEach(pId => {
      const prod = products.find(p => p.id === pId);
      if (prod) {
        total += (cart[pId] * prod.b2b_price);
      }
    });
    return total;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (Object.keys(cart).length === 0) {
      alert(language === 'mr' ? "कृपया ऑर्डर करण्यासाठी किमान १ उत्पादन निवडा." : "Please select at least 1 product to place order.");
      return;
    }

    setIsSubmitting(true);
    setOrderSuccessMsg('');

    const orderNumber = 'SS-ORD-' + Math.floor(1000 + Math.random() * 9000);
    const orderItems = Object.keys(cart).map(pId => {
      const prod = products.find(p => p.id === pId);
      return {
        product_id: prod.id,
        product_name: language === 'mr' ? prod.name : prod.english_name,
        unit: prod.unit,
        price_per_unit: prod.b2b_price,
        quantity: cart[pId],
        total_price: cart[pId] * prod.b2b_price
      };
    });

    const newOrder = {
      id: 'ord-' + Date.now(),
      order_number: orderNumber,
      user_id: user?.id || 'hotel-demo',
      business_name: user?.business_name || (language === 'mr' ? 'हॉटेल साई पॅलेस' : 'Hotel Sai Palace'),
      contact_person: user?.contact_person || (language === 'mr' ? 'व्यवस्थापक' : 'Manager'),
      phone: user?.phone || '9876543210',
      delivery_address: user?.address || 'Niphad, Nashik',
      delivery_date: deliveryDate,
      total_amount: calculateTotal(),
      status: 'pending',
      notes: deliveryNotes,
      created_at: new Date().toISOString(),
      items: orderItems
    };

    if (isSupabaseConfigured && supabase && user?.id) {
      try {
        const { data: insertedOrder } = await supabase
          .from('orders')
          .insert([{
            order_number: newOrder.order_number,
            user_id: user.id,
            business_name: newOrder.business_name,
            contact_person: newOrder.contact_person,
            phone: newOrder.phone,
            delivery_address: newOrder.delivery_address,
            delivery_date: newOrder.delivery_date,
            total_amount: newOrder.total_amount,
            status: 'pending',
            notes: newOrder.notes
          }])
          .select()
          .single();

        if (insertedOrder) {
          const itemPayloads = orderItems.map(item => ({
            order_id: insertedOrder.id,
            product_id: item.product_id,
            product_name: item.product_name,
            unit: item.unit,
            price_per_unit: item.price_per_unit,
            quantity: item.quantity,
            total_price: item.total_price
          }));
          await supabase.from('order_items').insert(itemPayloads);
        }
      } catch (err) {
        console.error("Supabase order place error:", err);
      }
    } else {
      const currentOrders = getStoredDemoOrders();
      const updatedOrders = [newOrder, ...currentOrders];
      saveStoredDemoOrders(updatedOrders);
    }

    setOrders(prev => [newOrder, ...prev]);
    setCart({});
    setDeliveryNotes('');
    setIsSubmitting(false);
    setOrderSuccessMsg(language === 'mr' 
      ? `ऑर्डर यशस्वीपणे नोंदवली गेली! (ऑर्डर क्र. ${orderNumber})`
      : `Order successfully placed! (Order No. ${orderNumber})`
    );
    setActiveTab('active_orders');
  };

  const saveRecurring = (enabled) => {
    const updated = { ...recurringConfig, enabled };
    setRecurringConfig(updated);
    localStorage.setItem('sai_satvik_recurring_' + (user?.id || 'demo'), JSON.stringify(updated));
    alert(enabled 
      ? (language === 'mr' ? "नियमित दैनिक ऑर्डर सक्रिय केली गेली आहे!" : "Daily recurring supply activated!") 
      : (language === 'mr' ? "नियमित दैनिक ऑर्डर बंद केली आहे." : "Daily recurring supply disabled.")
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span style={{ backgroundColor: '#FEF3C7', color: '#92400E', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {t('pendingStatus')}</span>;
      case 'confirmed':
        return <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={14} /> {t('confirmedStatus')}</span>;
      case 'out_for_delivery':
        return <span style={{ backgroundColor: '#DBEAFE', color: '#1E40AF', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Truck size={14} /> {t('outForDeliveryStatus')}</span>;
      case 'delivered':
        return <span style={{ backgroundColor: '#E0E7FF', color: '#3730A3', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={14} /> {t('deliveredStatus')}</span>;
      default:
        return <span style={{ backgroundColor: '#F3F4F6', color: '#4B5563', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 700 }}>{status}</span>;
    }
  };

  return (
    <div style={{ backgroundColor: '#FAF8F3', minHeight: '100vh', padding: '2rem 1rem' }}>
      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Profile Welcome Banner (No Emojis) */}
        <div style={{
          backgroundColor: 'var(--color-primary-dark)',
          color: '#FFFFFF',
          padding: '1.75rem',
          borderRadius: '16px',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1.25rem',
          borderLeft: '6px solid var(--color-gold)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
              <span style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-primary-dark)', padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
                B2B Verified Client
              </span>
              {user?.gst_number && (
                <span style={{ fontSize: '0.75rem', color: '#D2E3D8' }}>GST: {user.gst_number}</span>
              )}
            </div>
            <h2 className="marathi-heading" style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
              {user?.business_name || t('clientTitle')}
            </h2>
            <div style={{ fontSize: '0.9rem', color: '#B3CFC0', marginTop: '0.3rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><User size={14} /> {user?.contact_person || 'Manager'}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={14} /> {user?.phone || '9604988662'}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> {user?.address || 'Niphad, Nashik'}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => setActiveTab('new_order')}
              style={{
                backgroundColor: 'var(--color-gold)',
                color: 'var(--color-primary-dark)',
                padding: '0.65rem 1.25rem',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
              }}
            >
              <Plus size={18} /> {t('bulkOrderDesk')}
            </button>
          </div>
        </div>

        {/* Navigation Tabs (No Emojis) */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '2px solid rgba(15,90,49,0.1)',
          marginBottom: '1.5rem',
          overflowX: 'auto',
          paddingBottom: '2px'
        }}>
          {[
            { id: 'new_order', label: t('bulkOrderDesk'), icon: ShoppingBag },
            { id: 'active_orders', label: `${t('orderTracker')} (${orders.filter(o => o.status !== 'delivered').length})`, icon: Truck },
            { id: 'recurring', label: t('dailyRecurring'), icon: Repeat },
            { id: 'history', label: t('orderHistory'), icon: FileText }
          ].map(tab => {
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '0.75rem 1.2rem',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '3px solid var(--color-primary)' : '3px solid transparent',
                  backgroundColor: activeTab === tab.id ? '#FFFFFF' : 'transparent',
                  color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-granite)',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  borderRadius: '8px 8px 0 0',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease'
                }}
              >
                <IconComp size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {orderSuccessMsg && (
          <div style={{
            backgroundColor: '#D1FAE5',
            border: '1px solid #10B981',
            color: '#065F46',
            padding: '1rem',
            borderRadius: '10px',
            marginBottom: '1.5rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <CheckCircle2 size={20} />
            {orderSuccessMsg}
          </div>
        )}

        {/* TAB 1: NEW B2B BULK ORDER */}
        {activeTab === 'new_order' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem' }} className="b2b-layout">
            
            {/* Catalog Grid */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 className="marathi-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-primary-dark)', margin: 0 }}>
                  {t('bulkPricingHeader')}
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700, backgroundColor: '#D1FAE5', padding: '4px 8px', borderRadius: '6px' }}>
                  ✓ {t('b2bDiscountNotice')}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
                {products.map(product => {
                  const qty = cart[product.id] || 0;
                  const discountPercent = Math.round(((product.regular_price - product.b2b_price) / product.regular_price) * 100);

                  return (
                    <div 
                      key={product.id}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '12px',
                        padding: '1rem',
                        border: qty > 0 ? '2px solid var(--color-primary)' : '1px solid rgba(15, 90, 49, 0.12)',
                        boxShadow: qty > 0 ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        position: 'relative'
                      }}
                    >
                      {discountPercent > 0 && (
                        <span style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          backgroundColor: '#EF4444',
                          color: '#FFFFFF',
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          padding: '2px 6px',
                          borderRadius: '4px'
                        }}>
                          {discountPercent}% B2B OFF
                        </span>
                      )}

                      <div>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                          <img 
                            src={product.image || '/images/milk.png'} 
                            alt={product.name} 
                            style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '8px' }} 
                          />
                          <div>
                            <span style={{ fontSize: '0.72rem', color: '#6B7280', textTransform: 'uppercase', fontWeight: 700 }}>
                              {product.english_name}
                            </span>
                            <h4 className="marathi-heading" style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-primary-dark)', margin: 0 }}>
                              {language === 'mr' ? product.name : product.english_name}
                            </h4>
                          </div>
                        </div>

                        {/* Price Row */}
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.75rem' }}>
                          <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                            ₹{product.b2b_price}
                          </span>
                          <span style={{ fontSize: '0.85rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                            ₹{product.regular_price}
                          </span>
                          <span style={{ fontSize: '0.8rem', color: '#4B5563', fontWeight: 600 }}>
                            /{product.unit}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Selector */}
                      <div style={{ backgroundColor: '#F9FAFB', padding: '0.6rem', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                          <span style={{ fontSize: '0.78rem', color: '#6B7280', fontWeight: 600 }}>{t('qtyLabel')} ({product.unit}):</span>
                          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                            {qty} {product.unit} = ₹{qty * product.b2b_price}
                          </span>
                        </div>

                        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                          <button
                            type="button"
                            onClick={() => updateCartQty(product.id, -10)}
                            style={{ padding: '4px 8px', border: '1px solid #D1D5DB', borderRadius: '4px', background: '#FFF', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                          >
                            -10
                          </button>
                          <button
                            type="button"
                            onClick={() => updateCartQty(product.id, -1)}
                            style={{ padding: '4px 8px', border: '1px solid #D1D5DB', borderRadius: '4px', background: '#FFF', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                          >
                            <Minus size={14} />
                          </button>
                          
                          <input
                            type="number"
                            value={qty}
                            onChange={(e) => updateCartQty(product.id, parseInt(e.target.value || '0') - qty)}
                            style={{ width: '45px', textAlign: 'center', fontWeight: 800, border: '1px solid #D1D5DB', borderRadius: '4px', padding: '4px' }}
                          />

                          <button
                            type="button"
                            onClick={() => updateCartQty(product.id, 1)}
                            style={{ padding: '4px 8px', border: '1px solid #D1D5DB', borderRadius: '4px', background: '#FFF', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => updateCartQty(product.id, 10)}
                            style={{ padding: '4px 8px', border: '1px solid #D1D5DB', borderRadius: '4px', background: '#FFF', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                          >
                            +10
                          </button>
                          <button
                            type="button"
                            onClick={() => updateCartQty(product.id, 50)}
                            style={{ padding: '4px 8px', border: '1px solid #D1D5DB', borderRadius: '4px', background: '#FFF', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                          >
                            +50
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Checkout Summary Sidebar */}
            <div>
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '1.25rem',
                border: '1px solid rgba(15, 90, 49, 0.15)',
                boxShadow: 'var(--shadow-md)',
                position: 'sticky',
                top: '90px'
              }}>
                <h4 className="marathi-heading" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-primary-dark)', marginBottom: '1rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShoppingBag size={18} />
                  {t('orderSummary')}
                </h4>

                {Object.keys(cart).length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#9CA3AF' }}>
                    <ShoppingBag size={40} style={{ margin: '0 auto 0.5rem', opacity: 0.5 }} />
                    <p style={{ fontSize: '0.9rem', margin: 0 }}>
                      {language === 'mr' ? 'कृपया उत्पादने निवडा.' : 'Please select products from catalog.'}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handlePlaceOrder}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem', maxHeight: '200px', overflowY: 'auto' }}>
                      {Object.keys(cart).map(pId => {
                        const prod = products.find(p => p.id === pId);
                        if (!prod) return null;
                        return (
                          <div key={pId} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', borderBottom: '1px dashed #F3F4F6', paddingBottom: '0.4rem' }}>
                            <div>
                              <span style={{ fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                                {language === 'mr' ? prod.name : prod.english_name}
                              </span>
                              <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                                {cart[pId]} {prod.unit} × ₹{prod.b2b_price}
                              </div>
                            </div>
                            <span style={{ fontWeight: 800, color: '#111827' }}>
                              ₹{cart[pId] * prod.b2b_price}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Delivery Date */}
                    <div style={{ marginBottom: '0.75rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '0.3rem' }}>
                        {t('deliveryDate')}:
                      </label>
                      <input
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                      />
                    </div>

                    {/* Special Notes */}
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '0.3rem' }}>
                        {t('deliveryNotes')}:
                      </label>
                      <input
                        type="text"
                        value={deliveryNotes}
                        onChange={(e) => setDeliveryNotes(e.target.value)}
                        placeholder="06:30 AM Delivery"
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.85rem' }}
                      />
                    </div>

                    {/* Total Calculation */}
                    <div style={{ backgroundColor: '#EBF5EE', padding: '0.85rem', borderRadius: '8px', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#4B5563', marginBottom: '0.3rem' }}>
                        <span>B2B Subtotal:</span>
                        <span>₹{calculateTotal()}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#4B5563', marginBottom: '0.4rem' }}>
                        <span>Delivery Fee:</span>
                        <span style={{ color: '#059669', fontWeight: 700 }}>{t('freeDelivery')}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-primary-dark)', borderTop: '1px solid #A7F3D0', paddingTop: '0.4rem' }}>
                        <span>{t('totalAmount')}:</span>
                        <span>₹{calculateTotal()}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        width: '100%',
                        padding: '0.85rem',
                        backgroundColor: 'var(--color-primary)',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontWeight: 800,
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        boxShadow: '0 4px 12px rgba(15,90,49,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <Send size={18} />
                      {isSubmitting ? 'Submitting...' : t('confirmOrder')}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: LIVE ORDER TRACKER */}
        {activeTab === 'active_orders' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 className="marathi-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-primary-dark)', margin: 0 }}>
              {t('orderTracker')}
            </h3>

            {orders.length === 0 ? (
              <div style={{ backgroundColor: '#FFF', padding: '3rem', borderRadius: '12px', textAlign: 'center', color: '#6B7280' }}>
                <Truck size={48} style={{ margin: '0 auto 0.5rem', opacity: 0.4 }} />
                <p>{language === 'mr' ? 'सध्या कोणतीही चालू ऑर्डर उपलब्ध नाही.' : 'No active orders currently available.'}</p>
              </div>
            ) : (
              orders.map(ord => (
                <div 
                  key={ord.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    border: '1px solid rgba(15, 90, 49, 0.12)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F3F4F6', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                    <div>
                      <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-primary-dark)', marginRight: '0.75rem' }}>
                        {ord.order_number}
                      </span>
                      <span style={{ fontSize: '0.82rem', color: '#6B7280' }}>
                        {new Date(ord.created_at).toLocaleDateString(language === 'mr' ? 'mr-IN' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <div>
                      {getStatusBadge(ord.status)}
                    </div>
                  </div>

                  {/* Items list */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    {ord.items && ord.items.map((it, idx) => (
                      <div key={idx} style={{ backgroundColor: '#F9FAFB', padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '0.85rem' }}>
                        <div style={{ fontWeight: 700, color: '#111827' }}>{it.product_name}</div>
                        <div style={{ color: '#6B7280' }}>{it.quantity} {it.unit} (₹{it.total_price})</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', fontSize: '0.88rem' }}>
                    <div style={{ color: '#4B5563', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={14} /> <strong>Address:</strong> {ord.delivery_address} {ord.notes ? `(${ord.notes})` : ''}
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                      Total: ₹{ord.total_amount}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: DAILY RECURRING STANDING ORDER */}
        {activeTab === 'recurring' && (
          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(15, 90, 49, 0.12)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Repeat size={28} color="var(--color-primary)" />
              <div>
                <h3 className="marathi-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-primary-dark)', margin: 0 }}>
                  {t('dailyRecurring')}
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#6B7280', margin: 0 }}>
                  Automated morning standing supply setup for commercial clients.
                </p>
              </div>
            </div>

            <div style={{ backgroundColor: '#EBF5EE', padding: '1.25rem', borderRadius: '10px', marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
              <div>
                <h4 style={{ margin: '0 0 0.2rem 0', color: 'var(--color-primary-dark)', fontWeight: 800 }}>
                  Status: {recurringConfig.enabled ? 'Active Supply' : 'Disabled'}
                </h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#374151' }}>
                  Daily scheduled delivery at <strong>{recurringConfig.preferred_time}</strong> to your doorstep.
                </p>
              </div>

              <button
                onClick={() => saveRecurring(!recurringConfig.enabled)}
                style={{
                  backgroundColor: recurringConfig.enabled ? '#EF4444' : 'var(--color-primary)',
                  color: '#FFFFFF',
                  padding: '0.65rem 1.25rem',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                {recurringConfig.enabled ? 'Disable Auto Order' : 'Enable Daily Supply'}
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: ORDER HISTORY */}
        {activeTab === 'history' && (
          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(15, 90, 49, 0.12)' }}>
            <h3 className="marathi-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-primary-dark)', marginBottom: '1rem' }}>
              {t('orderHistory')}
            </h3>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textWrap: 'nowrap' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '2px solid #E5E7EB', textAlign: 'left' }}>
                    <th style={{ padding: '0.75rem' }}>Order No</th>
                    <th style={{ padding: '0.75rem' }}>Date</th>
                    <th style={{ padding: '0.75rem' }}>Amount</th>
                    <th style={{ padding: '0.75rem' }}>Status</th>
                    <th style={{ padding: '0.75rem' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(ord => (
                    <tr key={ord.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                      <td style={{ padding: '0.75rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>{ord.order_number}</td>
                      <td style={{ padding: '0.75rem' }}>{new Date(ord.created_at).toLocaleDateString(language === 'mr' ? 'mr-IN' : 'en-US')}</td>
                      <td style={{ padding: '0.75rem', fontWeight: 700 }}>₹{ord.total_amount}</td>
                      <td style={{ padding: '0.75rem' }}>{getStatusBadge(ord.status)}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <button
                          onClick={() => {
                            setActiveTab('new_order');
                            alert(`Re-ordering for ${ord.order_number}`);
                          }}
                          style={{ padding: '4px 10px', backgroundColor: '#EBF5EE', border: '1px solid var(--color-primary)', color: 'var(--color-primary-dark)', borderRadius: '4px', cursor: 'pointer', fontWeight: 700 }}
                        >
                          Re-Order
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
