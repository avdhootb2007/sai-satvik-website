import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ShoppingBag, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Plus, 
  Search, 
  Phone, 
  MessageCircle,
  Milk,
  User,
  MapPin,
  Menu,
  X,
  Globe,
  Home,
  LogOut,
  Sliders,
  Users,
  Package,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useProducts } from '../context/ProductContext';
import { supabase, isSupabaseConfigured, getStoredDemoOrders, saveStoredDemoOrders, getStoredDemoProducts, saveStoredDemoProducts } from '../lib/supabase';

export default function DairyManagerPortal() {
  const { user, setActivePortal, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const { products: contextProducts, updateProduct } = useProducts();

  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

  const products = contextProducts;

  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editingProdData, setEditingProdData] = useState({
    id: '',
    name: '',
    english_name: '',
    category: 'milk',
    regular_price: 60,
    b2b_price: 52,
    unit: 'Liter',
    in_stock: true
  });

  useEffect(() => {
    loadManagerData();
  }, []);

  const loadManagerData = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data: ords } = await supabase
          .from('orders')
          .select('*, order_items(*)')
          .order('created_at', { ascending: false });
        if (ords) setOrders(ords);
      } catch (err) {
        console.error("Supabase manager load error:", err);
      }
    } else {
      setOrders(getStoredDemoOrders());
    }
  };

  const handleSendClientNotification = (order, customStatus = null) => {
    const status = customStatus || order.status;
    const businessName = order.business_name || 'ग्राहक';
    const orderNo = order.order_number || order.id;
    const totalAmount = order.total_amount || 0;
    const phone = (order.phone || '').replace(/\D/g, '');
    const cleanPhone = phone.length === 10 ? '91' + phone : phone;

    let statusText = 'अपडेट';
    let statusEng = 'Updated';

    if (status === 'confirmed') {
      statusText = 'स्वीकृत (Confirmed)';
      statusEng = 'Confirmed';
    } else if (status === 'out_for_delivery' || status === 'dispatched') {
      statusText = 'डिलिव्हरीसाठी रवाना (Out for Delivery)';
      statusEng = 'Out for Delivery';
    } else if (status === 'delivered') {
      statusText = 'यशस्वीरित्या पोहोचवले (Delivered)';
      statusEng = 'Delivered';
    } else if (status === 'cancelled') {
      statusText = 'रद्द (Cancelled)';
      statusEng = 'Cancelled';
    } else if (status === 'pending') {
      statusText = 'प्रलंबित (Pending Review)';
      statusEng = 'Pending Review';
    }

    const message = language === 'mr'
      ? `नमस्कार ${businessName}!\n\nसाई सात्विक डेअरी कडून तुमची ऑर्डर ${orderNo} ची स्थिती:\n\nऑर्डर स्थिती: ${statusText}\nएकूण रक्कम: ₹${totalAmount}\nपत्ता: ${order.delivery_address || 'नोंदणीकृत पत्ता'}\n\nकाही अडचण असल्यास संपर्क साधा: ९८२२१२३४५६.\nधन्यवाद!\nसाई सात्विक डेअरी, निफाड.`
      : `Hello ${businessName}!\n\nUpdate regarding your order ${orderNo} from Sai Satvik Dairy:\n\nStatus: ${statusEng}\nTotal Amount: ₹${totalAmount}\nDelivery Address: ${order.delivery_address || 'Registered Address'}\n\nFor assistance, contact: 9822123456.\nThank you!\nSai Satvik Dairy, Niphad.`;

    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    const targetOrder = orders.find(o => o.id === orderId);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('orders')
          .update({ 
            status: newStatus,
            updated_at: new Date().toISOString()
          })
          .eq('id', orderId);
      } catch (err) {
        console.error("Supabase status update error:", err);
      }
    }

    const updated = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    setOrders(updated);
    if (!isSupabaseConfigured) {
      saveStoredDemoOrders(updated);
    }

    if (targetOrder && targetOrder.phone) {
      const confirmSend = window.confirm(
        language === 'mr'
          ? `ऑर्डर स्टेटस ${newStatus.toUpperCase()} अपडेट झाले आहे!\n\nग्राहकाच्या नोंदणीकृत मोबाईल नंबर (${targetOrder.phone}) वर मेसेज पाठवायचा का?`
          : `Order status updated to ${newStatus.toUpperCase()}!\n\nSend notification message to client phone (${targetOrder.phone})?`
      );

      if (confirmSend) {
        handleSendClientNotification(targetOrder, newStatus);
      }
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!editingProdData.name || !editingProdData.b2b_price) return;

    await updateProduct(editingProdData);

    setIsEditingProduct(false);
    alert(language === 'mr' ? "उत्पादन माहिती अपडेट केली गेली!" : "Product updated successfully!");
  };

  const calculateDailyDemand = () => {
    const demand = {};
    orders.forEach(ord => {
      if (ord.status !== 'cancelled' && ord.items) {
        ord.items.forEach(it => {
          const key = `${it.product_name} (${it.unit})`;
          demand[key] = (demand[key] || 0) + Number(it.quantity || 0);
        });
      }
    });
    return demand;
  };

  const totalRevenue = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + Number(o.total_amount || 0), 0);

  const pendingCount = orders.filter(o => o.status === 'pending').length;

  const filteredOrders = orders.filter(o => {
    const matchesStatus = filterStatus === 'all' || o.status === filterStatus;
    const matchesSearch = o.business_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          o.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          o.contact_person.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const scrollToDemandWidget = () => {
    const el = document.getElementById('daily-demand-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ backgroundColor: '#FAF8F3', minHeight: '100vh', paddingBottom: '3rem' }}>
      
      {/* CLEAN TOP MANAGER NAVIGATION BAR WITH 3-LINE MENU SYMBOL */}
      <header style={{
        backgroundColor: '#06381D',
        backgroundImage: 'linear-gradient(135deg, #06381D 0%, #0F5A31 50%, #147A43 100%)',
        color: '#FFFFFF',
        boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderBottom: '3px solid var(--color-gold)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0.7rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}>
          
          {/* LEFT: 3-LINE HAMBURGER MENU BUTTON & BRAND TITLE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
            {/* THREE LINE HAMBURGER BUTTON */}
            <button
              onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
              style={{
                backgroundColor: isNavMenuOpen ? 'var(--color-gold)' : 'rgba(255, 255, 255, 0.15)',
                color: isNavMenuOpen ? 'var(--color-primary-dark)' : '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '0.5rem 0.85rem',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 800,
                fontSize: '0.88rem',
                transition: 'all 0.2s ease'
              }}
              title={language === 'mr' ? 'नेव्हिगेशन मेनू उघडा' : 'Open Navigation Menu'}
              aria-label="Toggle Manager Navigation Menu"
            >
              {isNavMenuOpen ? <X size={20} /> : <Menu size={20} />}
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {language === 'mr' ? 'मेनू' : 'Menu'}
              </span>
              {pendingCount > 0 && (
                <span style={{
                  backgroundColor: '#EF4444',
                  color: '#FFF',
                  fontSize: '0.72rem',
                  fontWeight: 900,
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '2px'
                }}>
                  {pendingCount}
                </span>
              )}
            </button>

            {/* BRAND TITLE & BADGE */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{
                backgroundColor: 'var(--color-gold)',
                color: 'var(--color-primary-dark)',
                padding: '0.35rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Milk size={20} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <h1 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: '#FFFFFF', whiteSpace: 'nowrap' }}>
                    {language === 'mr' ? 'साई सात्विक मॅनेजर डॅशबोर्ड' : 'Sai Satvik Manager Dashboard'}
                  </h1>
                  <span style={{
                    backgroundColor: 'rgba(212, 175, 55, 0.25)',
                    color: 'var(--color-gold)',
                    border: '1px solid var(--color-gold)',
                    fontSize: '0.65rem',
                    fontWeight: 900,
                    padding: '1px 6px',
                    borderRadius: '4px',
                    textTransform: 'uppercase'
                  }}>
                    ADMIN
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: ESSENTIAL CONTROLS ONLY */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              style={{
                backgroundColor: 'rgba(255,255,255,0.12)',
                color: '#FFF',
                border: '1px solid rgba(255,255,255,0.25)',
                padding: '0.45rem 0.75rem',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
              title="Switch Language"
            >
              <Globe size={15} color="var(--color-gold)" />
              <span>{language === 'mr' ? 'Eng' : 'मराठी'}</span>
            </button>

            {/* Public Site Button */}
            <button
              onClick={() => setActivePortal('none')}
              style={{
                backgroundColor: 'rgba(255,255,255,0.12)',
                color: '#FFF',
                border: '1px solid rgba(255,255,255,0.25)',
                padding: '0.45rem 0.75rem',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
              title={t('publicSite')}
            >
              <Home size={15} />
              <span className="manager-btn-text">{t('publicSite')}</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={logout}
              style={{
                backgroundColor: '#EF4444',
                color: '#FFF',
                border: 'none',
                padding: '0.45rem 0.75rem',
                borderRadius: '6px',
                fontWeight: 800,
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
              title={t('logout')}
            >
              <LogOut size={15} />
              <span className="manager-btn-text">{t('logout')}</span>
            </button>
          </div>

        </div>
      </header>

      {/* FULL COLLAPSIBLE NAVIGATION DRAWER / OVERLAY WHEN 3-LINE MENU SYMBOL IS CLICKED */}
      {isNavMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(5, 28, 15, 0.75)',
          backdropFilter: 'blur(6px)',
          zIndex: 2000,
          display: 'flex',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          {/* SLIDE-IN NAVIGATION MENU PANEL */}
          <div style={{
            width: '100%',
            maxWidth: '380px',
            backgroundColor: '#FFFFFF',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '8px 0 25px rgba(0,0,0,0.3)',
            animation: 'slideInLeft 0.25s ease-out',
            overflowY: 'auto'
          }}>
            
            {/* DRAWER HEADER */}
            <div style={{
              backgroundColor: '#06381D',
              color: '#FFFFFF',
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '3px solid var(--color-gold)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ backgroundColor: 'var(--color-gold)', color: '#06381D', padding: '0.4rem', borderRadius: '8px' }}>
                  <Milk size={22} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#FFF' }}>
                    {language === 'mr' ? 'मॅनेजर नेव्हिगेशन मेनू' : 'Manager Navigation'}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#B3CFC0' }}>
                    {user?.email || 'Logged as Dairy Operations Manager'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsNavMenuOpen(false)}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* DRAWER CONTENT & ALL FUNCTIONALITY LINKS */}
            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* SECTION 1: PRIMARY DASHBOARD VIEWS */}
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.75rem' }}>
                  {language === 'mr' ? '१. मुख्य व्ह्यू आणि पोर्टल्स' : '1. Core Dashboard Views'}
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {/* Orders Management */}
                  <button
                    onClick={() => {
                      setActiveTab('orders');
                      setFilterStatus('all');
                      setIsNavMenuOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.8rem 1rem',
                      borderRadius: '10px',
                      border: activeTab === 'orders' ? '2px solid var(--color-primary)' : '1px solid #E5E7EB',
                      backgroundColor: activeTab === 'orders' ? '#EBF5EE' : '#F9FAFB',
                      color: activeTab === 'orders' ? 'var(--color-primary-dark)' : '#374151',
                      fontWeight: 800,
                      fontSize: '0.92rem',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <Package size={18} color="var(--color-primary)" />
                      <span>{t('ordersManagementTab')}</span>
                    </div>
                    <span style={{ backgroundColor: 'var(--color-primary)', color: '#FFF', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem' }}>
                      {orders.length}
                    </span>
                  </button>

                  {/* Daily Demand Summary */}
                  <button
                    onClick={() => {
                      setActiveTab('orders');
                      setIsNavMenuOpen(false);
                      setTimeout(scrollToDemandWidget, 100);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.8rem 1rem',
                      borderRadius: '10px',
                      border: '1px solid #E5E7EB',
                      backgroundColor: '#F9FAFB',
                      color: '#374151',
                      fontWeight: 800,
                      fontSize: '0.92rem',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <Milk size={18} color="var(--color-gold)" />
                      <span>{t('dailyDemandTitle')}</span>
                    </div>
                    <ChevronRight size={16} color="#9CA3AF" />
                  </button>

                  {/* Inventory & Rates */}
                  <button
                    onClick={() => {
                      setActiveTab('inventory');
                      setIsNavMenuOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.8rem 1rem',
                      borderRadius: '10px',
                      border: activeTab === 'inventory' ? '2px solid var(--color-primary)' : '1px solid #E5E7EB',
                      backgroundColor: activeTab === 'inventory' ? '#EBF5EE' : '#F9FAFB',
                      color: activeTab === 'inventory' ? 'var(--color-primary-dark)' : '#374151',
                      fontWeight: 800,
                      fontSize: '0.92rem',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <ShoppingBag size={18} color="var(--color-primary)" />
                      <span>{t('productsRatesTab')}</span>
                    </div>
                    <span style={{ backgroundColor: '#D1D5DB', color: '#1F2937', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem' }}>
                      {products.length} Items
                    </span>
                  </button>

                  {/* Clients Directory */}
                  <button
                    onClick={() => {
                      setActiveTab('customers');
                      setIsNavMenuOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.8rem 1rem',
                      borderRadius: '10px',
                      border: activeTab === 'customers' ? '2px solid var(--color-primary)' : '1px solid #E5E7EB',
                      backgroundColor: activeTab === 'customers' ? '#EBF5EE' : '#F9FAFB',
                      color: activeTab === 'customers' ? 'var(--color-primary-dark)' : '#374151',
                      fontWeight: 800,
                      fontSize: '0.92rem',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <Users size={18} color="var(--color-primary)" />
                      <span>{t('clientsDirectoryTab')}</span>
                    </div>
                    <ChevronRight size={16} color="#9CA3AF" />
                  </button>
                </div>
              </div>

              {/* SECTION 2: QUICK ACTIONS & ORDER FILTERS */}
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.75rem' }}>
                  {language === 'mr' ? '२. कार्यपद्धती आणि फिल्टर' : '2. Quick Actions & Order Filters'}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {/* Add New Product */}
                  <button
                    onClick={() => {
                      setActiveTab('inventory');
                      setEditingProdData({ id: '', name: '', english_name: '', category: 'milk', regular_price: 60, b2b_price: 52, unit: 'Liter', in_stock: true });
                      setIsEditingProduct(true);
                      setIsNavMenuOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--color-gold)',
                      backgroundColor: '#FFFBEB',
                      color: '#92400E',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      cursor: 'pointer'
                    }}
                  >
                    <Plus size={18} color="var(--color-gold)" />
                    <span>{t('addProduct')}</span>
                  </button>

                  {/* Filter Pending Orders */}
                  <button
                    onClick={() => {
                      setActiveTab('orders');
                      setFilterStatus('pending');
                      setIsNavMenuOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.7rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                      backgroundColor: '#FEF2F2',
                      color: '#991B1B',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Clock size={16} />
                      <span>{language === 'mr' ? 'पेंडिंग ऑर्डर्स पहा' : 'View Pending Orders'}</span>
                    </div>
                    <span style={{ backgroundColor: '#EF4444', color: '#FFF', padding: '1px 6px', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 900 }}>
                      {pendingCount}
                    </span>
                  </button>

                  {/* Filter Dispatched Orders */}
                  <button
                    onClick={() => {
                      setActiveTab('orders');
                      setFilterStatus('out_for_delivery');
                      setIsNavMenuOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.7rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                      backgroundColor: '#EFF6FF',
                      color: '#1E40AF',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    <Truck size={16} />
                    <span>{language === 'mr' ? 'डिलिव्हरी चालू ऑर्डर्स' : 'Out for Delivery Orders'}</span>
                  </button>

                  {/* Filter Delivered Orders */}
                  <button
                    onClick={() => {
                      setActiveTab('orders');
                      setFilterStatus('delivered');
                      setIsNavMenuOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.7rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                      backgroundColor: '#ECFDF5',
                      color: '#065F46',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    <CheckCircle2 size={16} />
                    <span>{language === 'mr' ? 'पूर्ण झालेल्या ऑर्डर्स' : 'Completed Delivered Orders'}</span>
                  </button>
                </div>
              </div>

              {/* SECTION 3: SYSTEM & ACCOUNT CONTROLS */}
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.75rem' }}>
                  {language === 'mr' ? '३. सिस्टीम आणि खाते नियंत्रण' : '3. System & Account Settings'}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {/* Language Switch */}
                  <button
                    onClick={() => {
                      toggleLanguage();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                      backgroundColor: '#F9FAFB',
                      color: '#374151',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Globe size={18} color="var(--color-primary)" />
                      <span>{language === 'mr' ? 'भाषा बदला' : 'Switch Language'}</span>
                    </div>
                    <span style={{ fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                      {language === 'mr' ? 'English' : 'मराठी'}
                    </span>
                  </button>

                  {/* Public Site */}
                  <button
                    onClick={() => {
                      setActivePortal('none');
                      setIsNavMenuOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                      backgroundColor: '#F9FAFB',
                      color: '#374151',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      cursor: 'pointer'
                    }}
                  >
                    <Home size={18} color="var(--color-primary)" />
                    <span>{t('publicSite')}</span>
                  </button>

                  {/* Logout */}
                  <button
                    onClick={() => {
                      logout();
                      setIsNavMenuOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid #FCA5A5',
                      backgroundColor: '#FEF2F2',
                      color: '#DC2626',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      cursor: 'pointer'
                    }}
                  >
                    <LogOut size={18} />
                    <span>{t('logout')}</span>
                  </button>
                </div>
              </div>

            </div>

            {/* DRAWER FOOTER */}
            <div style={{
              marginTop: 'auto',
              padding: '1rem',
              backgroundColor: '#F3F4F6',
              borderTop: '1px solid #E5E7EB',
              textAlign: 'center',
              fontSize: '0.75rem',
              color: '#6B7280'
            }}>
              Sai Satvik Dairy Operations Manager v2.5
            </div>

          </div>

          {/* BACKDROP CLICK CLOSES DRAWER */}
          <div
            onClick={() => setIsNavMenuOpen(false)}
            style={{ flex: 1, cursor: 'pointer' }}
          />
        </div>
      )}

      {/* DASHBOARD CONTENT BODY */}
      <div className="container" style={{ maxWidth: '1150px', margin: '1.5rem auto 0 auto', padding: '0 1rem' }}>
        
        {/* Manager Header Banner */}
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
                Dairy Manager Admin Panel
              </span>
            </div>
            <h2 className="marathi-heading" style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
              {t('managerTitle')}
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#B3CFC0', margin: '0.3rem 0 0 0' }}>
              Commercial orders processing & daily volume demand aggregator.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.12)', padding: '0.6rem 1rem', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-gold)', fontWeight: 700 }}>{t('pendingOrdersCount')}:</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFF' }}>{pendingCount}</div>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.12)', padding: '0.6rem 1rem', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-gold)', fontWeight: 700 }}>{t('totalRevenue')}:</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFF' }}>₹{totalRevenue}</div>
            </div>
          </div>
        </div>

        {/* Daily Demand Volume Aggregator Widget */}
        <div id="daily-demand-section" style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          padding: '1.25rem',
          border: '1px solid rgba(15, 90, 49, 0.15)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Milk size={22} color="var(--color-primary)" />
            <h3 className="marathi-heading" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary-dark)', margin: 0 }}>
              {t('dailyDemandTitle')}
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
            {Object.keys(calculateDailyDemand()).length === 0 ? (
              <p style={{ color: '#9CA3AF', fontSize: '0.88rem' }}>No orders placed for today.</p>
            ) : (
              Object.entries(calculateDailyDemand()).map(([prodName, totalQty]) => (
                <div key={prodName} style={{ backgroundColor: '#EBF5EE', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #A7F3D0' }}>
                  <div style={{ fontSize: '0.78rem', color: '#065F46', fontWeight: 700 }}>{prodName}</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                    {totalQty}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '2px solid rgba(15,90,49,0.1)',
          marginBottom: '1.5rem'
        }}>
          {[
            { id: 'orders', label: `${t('ordersManagementTab')} (${orders.length})` },
            { id: 'inventory', label: t('productsRatesTab') },
            { id: 'customers', label: t('clientsDirectoryTab') }
          ].map(tab => (
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
                borderRadius: '8px 8px 0 0'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(15, 90, 49, 0.12)' }}>
            
            {/* Filter & Search Bar */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['all', 'pending', 'confirmed', 'out_for_delivery', 'delivered'].map(st => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    style={{
                      padding: '0.4rem 0.8rem',
                      borderRadius: '6px',
                      border: '1px solid #D1D5DB',
                      backgroundColor: filterStatus === st ? 'var(--color-primary)' : '#FFF',
                      color: filterStatus === st ? '#FFF' : '#374151',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textTransform: 'capitalize'
                    }}
                  >
                    {st === 'all' ? 'All' : st}
                  </button>
                ))}
              </div>

              <div style={{ position: 'relative', width: '260px' }}>
                <Search size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: '#9CA3AF' }} />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '100%', padding: '0.45rem 0.75rem 0.45rem 2.2rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            {/* Orders List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredOrders.length === 0 ? (
                <p style={{ textAlign: 'center', padding: '2rem', color: '#9CA3AF' }}>No matching orders found.</p>
              ) : (
                filteredOrders.map(ord => (
                  <div key={ord.id} style={{ backgroundColor: '#F9FAFB', borderRadius: '10px', padding: '1.2rem', border: '1px solid #E5E7EB' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.6rem' }}>
                      <div>
                        <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-primary-dark)', marginRight: '0.5rem' }}>
                          {ord.business_name}
                        </span>
                        <span style={{ fontSize: '0.82rem', color: '#6B7280' }}>
                          (No. {ord.order_number}) | Contact: {ord.contact_person} | Phone: {ord.phone}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                          ₹{ord.total_amount}
                        </span>
                        
                        {/* Status Update Actions */}
                        <select
                          value={ord.status}
                          onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                          style={{
                            padding: '0.4rem 0.6rem',
                            borderRadius: '6px',
                            fontWeight: 800,
                            fontSize: '0.82rem',
                            border: '1px solid var(--color-primary)',
                            backgroundColor: '#EBF5EE',
                            color: 'var(--color-primary-dark)',
                            cursor: 'pointer'
                          }}
                        >
                          <option value="pending">{t('pendingStatus')}</option>
                          <option value="confirmed">{t('confirmedStatus')}</option>
                          <option value="out_for_delivery">{t('outForDeliveryStatus')}</option>
                          <option value="delivered">{t('deliveredStatus')}</option>
                          <option value="cancelled">{t('cancelledStatus')}</option>
                        </select>

                        <button
                          onClick={() => handleSendClientNotification(ord)}
                          style={{
                            padding: '0.4rem 0.65rem',
                            borderRadius: '6px',
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            border: '1px solid #25D366',
                            backgroundColor: '#DCF8C6',
                            color: '#075E54',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                          title="Send WhatsApp update to client"
                        >
                          <MessageCircle size={14} />
                          <span>{language === 'mr' ? 'मेसेज पाठवा' : 'Notify Client'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Order Items Table */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '0.5rem' }}>
                      {ord.items && ord.items.map((it, i) => (
                        <span key={i} style={{ backgroundColor: '#FFF', border: '1px solid #D1D5DB', padding: '3px 8px', borderRadius: '4px', fontSize: '0.82rem', fontWeight: 700, color: '#374151' }}>
                          {it.product_name} - <strong>{it.quantity} {it.unit}</strong> (₹{it.total_price})
                        </span>
                      ))}
                    </div>

                    <div style={{ fontSize: '0.8rem', color: '#6B7280', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={14} /> <strong>Address:</strong> {ord.delivery_address} {ord.notes ? `| Note: ${ord.notes}` : ''}
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* TAB 2: INVENTORY & B2B RATES */}
        {activeTab === 'inventory' && (
          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(15, 90, 49, 0.12)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 className="marathi-heading" style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-primary-dark)', margin: 0 }}>
                {t('productsRatesTab')}
              </h3>

              <button
                onClick={() => {
                  setEditingProdData({ id: '', name: '', english_name: '', category: 'milk', regular_price: 60, b2b_price: 52, unit: 'Liter', in_stock: true });
                  setIsEditingProduct(true);
                }}
                style={{ backgroundColor: 'var(--color-primary)', color: '#FFF', padding: '0.5rem 1rem', borderRadius: '6px', border: 'none', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
              >
                <Plus size={16} /> {t('addProduct')}
              </button>
            </div>

            {/* Product Edit Modal */}
            {isEditingProduct && (
              <form onSubmit={handleSaveProduct} style={{ backgroundColor: '#F9FAFB', padding: '1.25rem', borderRadius: '10px', border: '1px solid #E5E7EB', marginBottom: '1.5rem' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-primary-dark)' }}>Product Info:</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                  <input
                    type="text"
                    placeholder="Marathi Name"
                    value={editingProdData.name}
                    onChange={(e) => setEditingProdData({ ...editingProdData, name: e.target.value })}
                    required
                    style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                  />
                  <input
                    type="text"
                    placeholder="English Name"
                    value={editingProdData.english_name}
                    onChange={(e) => setEditingProdData({ ...editingProdData, english_name: e.target.value })}
                    required
                    style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                  />
                  <select
                    value={editingProdData.unit}
                    onChange={(e) => setEditingProdData({ ...editingProdData, unit: e.target.value })}
                    style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                  >
                    <option value="Liter">Liter</option>
                    <option value="Kg">Kg</option>
                    <option value="Pack">Pack</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700 }}>Regular Retail Price (₹):</label>
                    <input
                      type="number"
                      value={editingProdData.regular_price}
                      onChange={(e) => setEditingProdData({ ...editingProdData, regular_price: Number(e.target.value) })}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)' }}>Hotel B2B Price (₹):</label>
                    <input
                      type="number"
                      value={editingProdData.b2b_price}
                      onChange={(e) => setEditingProdData({ ...editingProdData, b2b_price: Number(e.target.value) })}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '1.2rem' }}>
                    <input
                      type="checkbox"
                      id="instock"
                      checked={editingProdData.in_stock}
                      onChange={(e) => setEditingProdData({ ...editingProdData, in_stock: e.target.checked })}
                    />
                    <label htmlFor="instock" style={{ fontSize: '0.85rem', fontWeight: 700 }}>In Stock</label>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="submit" style={{ backgroundColor: 'var(--color-primary)', color: '#FFF', padding: '0.5rem 1rem', borderRadius: '6px', border: 'none', fontWeight: 800 }}>
                    {t('saveProduct')}
                  </button>
                  <button type="button" onClick={() => setIsEditingProduct(false)} style={{ backgroundColor: '#9CA3AF', color: '#FFF', padding: '0.5rem 1rem', borderRadius: '6px', border: 'none' }}>
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '2px solid #E5E7EB', textAlign: 'left' }}>
                    <th style={{ padding: '0.75rem' }}>Product</th>
                    <th style={{ padding: '0.75rem' }}>Unit</th>
                    <th style={{ padding: '0.75rem' }}>Retail Price</th>
                    <th style={{ padding: '0.75rem' }}>B2B Rate</th>
                    <th style={{ padding: '0.75rem' }}>Stock Status</th>
                    <th style={{ padding: '0.75rem' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                      <td style={{ padding: '0.75rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>{language === 'mr' ? p.name : p.english_name}</td>
                      <td style={{ padding: '0.75rem' }}>{p.unit}</td>
                      <td style={{ padding: '0.75rem', color: '#9CA3AF', textDecoration: 'line-through' }}>₹{p.regular_price}</td>
                      <td style={{ padding: '0.75rem', fontWeight: 800, color: 'var(--color-primary)' }}>₹{p.b2b_price}</td>
                      <td style={{ padding: '0.75rem' }}>{p.in_stock ? 'In Stock' : 'Out of Stock'}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <button
                          onClick={() => {
                            setEditingProdData(p);
                            setIsEditingProduct(true);
                          }}
                          style={{ padding: '4px 8px', backgroundColor: '#EBF5EE', border: '1px solid var(--color-primary)', color: 'var(--color-primary-dark)', borderRadius: '4px', cursor: 'pointer', fontWeight: 700 }}
                        >
                          {t('editProduct')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOMERS DIRECTORY */}
        {activeTab === 'customers' && (
          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(15, 90, 49, 0.12)' }}>
            <h3 className="marathi-heading" style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-primary-dark)', marginBottom: '1rem' }}>
              {t('clientsDirectoryTab')}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
              {Array.from(new Set(orders.map(o => o.business_name))).map((bName, idx) => {
                const sampleOrd = orders.find(o => o.business_name === bName);
                return (
                  <div key={idx} style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-gold)', fontWeight: 800, textTransform: 'uppercase' }}>
                      Verified B2B Client
                    </div>
                    <h4 className="marathi-heading" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-primary-dark)', margin: '0.2rem 0 0.5rem 0' }}>
                      {bName}
                    </h4>
                    <div style={{ fontSize: '0.85rem', color: '#4B5563', display: 'flex', flexDirection: 'column', gap: '0.2rem', marginBottom: '0.75rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><User size={14} /> <strong>Contact:</strong> {sampleOrd?.contact_person}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={14} /> <strong>Phone:</strong> {sampleOrd?.phone}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> <strong>Address:</strong> {sampleOrd?.delivery_address}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <a
                        href={`tel:${sampleOrd?.phone}`}
                        style={{ flex: 1, padding: '0.4rem', backgroundColor: 'var(--color-primary)', color: '#FFF', textAlign: 'center', borderRadius: '6px', textDecoration: 'none', fontWeight: 700, fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}
                      >
                        <Phone size={14} /> {t('callNow')}
                      </a>
                      <a
                        href={`https://wa.me/91${sampleOrd?.phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ flex: 1, padding: '0.4rem', backgroundColor: '#25D366', color: '#FFF', textAlign: 'center', borderRadius: '6px', textDecoration: 'none', fontWeight: 700, fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}
                      >
                        <MessageCircle size={14} /> {t('whatsappChat')}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
