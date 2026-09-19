import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  mr: {
    bannerText: '१००% शुद्ध सात्विक ताजे दूध व पारंपारिक मिठाई | निफाड, नाशिक',
    home: 'मुख्य',
    categories: 'श्रेणी',
    products: 'उत्पादने',
    whyUs: 'खासियत',
    about: 'आमच्याबद्दल',
    location: 'पत्ता',
    contact: 'संपर्क',
    hotelPortal: 'हॉटेल व रिसॉर्ट B2B',
    dairyManager: 'डेअरी मॅनेजर',
    signIn: 'लॉगिन',
    register: 'B2B नोंदणी',
    logout: 'बाहेर पडा',
    orderWhatsApp: 'WhatsApp वर ऑर्डर करा',
    publicSite: 'मुख्य वेबसाईट',
    activeView: 'सक्रिय व्ह्यू',
    
    // Auth Modal
    authTitle: 'साई सात्विक B2B पोर्टल्स',
    authSubTitle: 'हॉटेल, रिसॉर्ट व डेअरी मॅनेजमेंट लॉगिन',
    selectRole: 'खात्याचा प्रकार निवडा',
    hotelResortRole: 'हॉटेल / रिसॉर्ट ग्राहक',
    dairyManagerRole: 'डेअरी मॅनेजर',
    emailLabel: 'ई-मेल आयडी',
    passwordLabel: 'पासवर्ड',
    businessNameLabel: 'व्यवसायाचे / हॉटेलचे नाव',
    contactPersonLabel: 'संपर्क व्यक्ती',
    phoneLabel: 'मोबाईल नंबर',
    addressLabel: 'पत्ता व डिलिव्हरी ठिकाण',
    gstLabel: 'जीएसटी नंबर (ऐच्छिक)',
    submitLogin: 'लॉगिन करा',
    submitRegister: 'खाते तयार करा',
    instantDemo: '१-क्लिक मधील प्रात्यक्षिक लॉगिन',
    demoHotelBtn: 'रिसॉर्ट व हॉटेल ग्राहक पोर्टल',
    demoManagerBtn: 'डेअरी मॅनेजर डॅशबोर्ड',
    
    // Hotel Portal
    clientTitle: 'हॉटेल व रिसॉर्ट B2B पोर्टल',
    bulkOrderDesk: 'नवीन B2B ऑर्डर',
    orderTracker: 'ऑर्डर ट्रॅकर',
    dailyRecurring: 'दैनिक ऑटो-ऑर्डर',
    orderHistory: 'ऑर्डर इतिहास',
    bulkPricingHeader: 'हॉटेल व रिसॉर्ट घाऊक दरपत्रक',
    b2bDiscountNotice: 'B2B सवलतीचे दर लागू',
    qtyLabel: 'प्रमाण',
    orderSummary: 'ऑर्डर सारांश',
    deliveryDate: 'डिलिव्हरी तारीख',
    deliveryNotes: 'विशेष टीप / डिलिव्हरी वेळ',
    totalAmount: 'एकूण रक्कम',
    confirmOrder: 'ऑर्डर कन्फर्म करा',
    freeDelivery: 'मोफत',
    
    // Manager Portal
    managerTitle: 'साई सात्विक डेअरी मॅनेजमेंट पोर्टल्स',
    dailyDemandTitle: 'आजची एकूण दूध व डेअरी मागणी',
    pendingOrdersCount: 'पेंडिंग ऑर्डर्स',
    totalRevenue: 'एकूण विक्री',
    ordersManagementTab: 'सर्व ऑर्डर्स व्यवस्थापन',
    productsRatesTab: 'उत्पादन व B2B दरपत्रक',
    clientsDirectoryTab: 'नोंदणीकृत हॉटेल्स व रिसॉर्ट्स',
    searchPlaceholder: 'हॉटेल / ऑर्डर क्र. शोधा...',
    editProduct: 'संपादित करा',
    addProduct: 'नवीन उत्पादन जोडा',
    saveProduct: 'सेव्ह करा',
    callNow: 'कॉल करा',
    whatsappChat: 'WhatsApp संवाद',
    
    // Status
    pendingStatus: 'पेंडिंग (Pending)',
    confirmedStatus: 'स्वीकारली (Confirmed)',
    outForDeliveryStatus: 'डिलिव्हरी चालू (Out for Delivery)',
    deliveredStatus: 'पूर्ण झाली (Delivered)',
    cancelledStatus: 'रद्द केली (Cancelled)'
  },

  en: {
    bannerText: '100% Pure Satvik Fresh Milk & Traditional Sweets | Niphad, Nashik',
    home: 'Home',
    categories: 'Categories',
    products: 'Products',
    whyUs: 'Why Us',
    about: 'About Us',
    location: 'Location',
    contact: 'Contact',
    hotelPortal: 'Hotel & Resort B2B',
    dairyManager: 'Dairy Manager',
    signIn: 'Sign In',
    register: 'B2B Register',
    logout: 'Logout',
    orderWhatsApp: 'Order via WhatsApp',
    publicSite: 'Public Website',
    activeView: 'Active View',
    
    // Auth Modal
    authTitle: 'Sai Satvik B2B Portals',
    authSubTitle: 'Hotel, Resort & Dairy Management Portal',
    selectRole: 'Select Account Role',
    hotelResortRole: 'Hotel / Resort Client',
    dairyManagerRole: 'Dairy Manager',
    emailLabel: 'Email Address',
    passwordLabel: 'Password',
    businessNameLabel: 'Business / Hotel Name',
    contactPersonLabel: 'Contact Person',
    phoneLabel: 'Mobile Phone Number',
    addressLabel: 'Address & Delivery Location',
    gstLabel: 'GST Number (Optional)',
    submitLogin: 'Sign In',
    submitRegister: 'Create B2B Account',
    instantDemo: '1-Click Instant Demo Login',
    demoHotelBtn: 'Resort & Hotel Client Portal',
    demoManagerBtn: 'Dairy Manager Dashboard',
    
    // Hotel Portal
    clientTitle: 'Hotel & Resort B2B Portal',
    bulkOrderDesk: 'New B2B Order',
    orderTracker: 'Order Tracker',
    dailyRecurring: 'Daily Standing Order',
    orderHistory: 'Order History',
    bulkPricingHeader: 'Hotel & Resort Bulk Wholesale Pricing',
    b2bDiscountNotice: 'B2B Wholesale Rates Applied',
    qtyLabel: 'Quantity',
    orderSummary: 'Order Summary',
    deliveryDate: 'Delivery Date',
    deliveryNotes: 'Special Instructions / Delivery Time',
    totalAmount: 'Total Amount',
    confirmOrder: 'Confirm Order',
    freeDelivery: 'FREE',
    
    // Manager Portal
    managerTitle: 'Sai Satvik Dairy Operations Management',
    dailyDemandTitle: 'Total Daily Milk & Dairy Volume Demand',
    pendingOrdersCount: 'Pending Orders',
    totalRevenue: 'Total Revenue',
    ordersManagementTab: 'All Orders Desk',
    productsRatesTab: 'Products & B2B Rates',
    clientsDirectoryTab: 'Registered Commercial Clients',
    searchPlaceholder: 'Search Hotel or Order No...',
    editProduct: 'Edit Product',
    addProduct: 'Add New Product',
    saveProduct: 'Save Product',
    callNow: 'Call Client',
    whatsappChat: 'WhatsApp Chat',
    
    // Status
    pendingStatus: 'Pending',
    confirmedStatus: 'Confirmed',
    outForDeliveryStatus: 'Out for Delivery',
    deliveredStatus: 'Delivered',
    cancelledStatus: 'Cancelled'
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('sai_satvik_lang') || 'mr';
  });

  useEffect(() => {
    localStorage.setItem('sai_satvik_lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'mr' ? 'en' : 'mr'));
  };

  const t = (key) => {
    return translations[language][key] || translations['mr'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
