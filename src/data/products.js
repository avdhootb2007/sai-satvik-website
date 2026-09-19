// Database of Sai Satvik Dairy Products & Traditional Sweets
export const CATEGORIES = [
  { id: 'all', name: 'सर्व उत्पादने', english: 'All Products', icon: 'Store' },
  { id: 'milk', name: 'दूध', english: 'Milk', icon: 'Milk' },
  { id: 'curd', name: 'दही', english: 'Curd', icon: 'Container' },
  { id: 'buttermilk', name: 'ताक', english: 'Buttermilk', icon: 'GlassWater' },
  { id: 'paneer', name: 'पनीर', english: 'Paneer', icon: 'Box' },
  { id: 'ghee', name: 'तूप', english: 'Ghee', icon: 'Flame' },
  { id: 'shrikhand', name: 'श्रीखंड', english: 'Shrikhand', icon: 'UtensilsCrossed' },
  { id: 'dairy', name: 'डेअरी उत्पादने', english: 'Dairy Products', icon: 'Sparkles' },
  { id: 'sweets', name: 'पारंपारिक मिठाई', english: 'Traditional Sweets', icon: 'Gift' }
];

export const PRODUCTS = [
  {
    id: 'cow-milk',
    category: 'milk',
    name: 'ताजे गाईचे दूध',
    englishName: 'Pure Fresh Cow Milk',
    description: '१००% शुद्ध, नैसर्गिक आणि पौष्टिक गाईचे ताजे दूध. दररोज सकाळी आणि संध्याकाळी ताजे संकलित.',
    image: '/images/milk.png',
    isPopular: true,
    sizes: [
      { label: '500 ml', price: 30 },
      { label: '1 Litre', price: 60 },
      { label: '2 Litre', price: 120 }
    ],
    tag: 'दररोज ताजे'
  },
  {
    id: 'buffalo-milk',
    category: 'milk',
    name: 'मलाईदार म्हशीचे दूध',
    englishName: 'Fresh Buffalo Milk',
    description: 'घट्ट आणि उच्च मलाईयुक्त १००% शुद्ध म्हशीचे दूध. बासुंदी, खवा आणि चहासाठी उत्तम.',
    image: '/images/milk.png',
    isPopular: true,
    sizes: [
      { label: '500 ml', price: 35 },
      { label: '1 Litre', price: 70 },
      { label: '2 Litre', price: 140 }
    ],
    tag: 'हाय मलाई'
  },
  {
    id: 'fresh-dahi',
    category: 'curd',
    name: 'घट्ट ताजे दही',
    englishName: 'Thick Fresh Curd (Dahi)',
    description: 'पारंपारिक पद्धतीने बनवलेले घट्ट, मलाईदार आणि चवदार ताजे दही.',
    image: '/images/curd.png',
    isPopular: true,
    sizes: [
      { label: '250 g', price: 25 },
      { label: '500 g', price: 50 },
      { label: '1 kg', price: 100 }
    ],
    tag: '१००% नॅचरल'
  },
  {
    id: 'masala-taak',
    category: 'buttermilk',
    name: 'मसाला ताक (ताजे छास)',
    englishName: 'Spiced Masala Buttermilk',
    description: 'जिरे, कोथिंबीर, कढीपत्ता आणि सेंधवा मिठाच्या फोडणीसह पाचक व थंडगार ताक.',
    image: '/images/curd.png',
    isPopular: false,
    sizes: [
      { label: '250 ml Pouch', price: 15 },
      { label: '500 ml Bottle', price: 30 },
      { label: '1 Litre', price: 55 }
    ],
    tag: 'थंडगार पाचक'
  },
  {
    id: 'plain-taak',
    category: 'buttermilk',
    name: 'साधे घरगुती ताक',
    englishName: 'Classic Plain Taak',
    description: 'शुद्ध ताकापासून बनवलेले सात्विक आणि ताजे घरगुती ताक.',
    image: '/images/curd.png',
    isPopular: false,
    sizes: [
      { label: '500 ml', price: 25 },
      { label: '1 Litre', price: 45 }
    ],
    tag: 'घरगुती चव'
  },
  {
    id: 'fresh-paneer',
    category: 'paneer',
    name: 'मऊ ताजे मलई पनीर',
    englishName: 'Fresh Soft Malai Paneer',
    description: 'अतिशय मऊ, शुद्ध आणि रसाळ पनीर. पनीर भाजी, टिक्का व कोफ्तासाठी अतिशय उत्तम.',
    image: '/images/ghee.png',
    isPopular: true,
    sizes: [
      { label: '200 g', price: 80 },
      { label: '500 g', price: 190 },
      { label: '1 kg', price: 370 }
    ],
    tag: 'सुपर मऊ'
  },
  {
    id: 'cow-ghee',
    category: 'ghee',
    name: 'शुद्ध साजूक गाईचे तूप',
    englishName: 'Pure Desi Cow Ghee (Toop)',
    description: 'रवादार पोत आणि अप्रतिम सुगंधाचे १००% शुद्ध गाईचे साजूक तूप. वैदिक पद्धतीने तयार.',
    image: '/images/ghee.png',
    isPopular: true,
    sizes: [
      { label: '250 g Jar', price: 220 },
      { label: '500 g Jar', price: 430 },
      { label: '1 kg Pack', price: 850 }
    ],
    tag: 'साजूक रवादार'
  },
  {
    id: 'kesar-shrikhand',
    category: 'shrikhand',
    name: 'केसर वेलची श्रीखंड',
    englishName: 'Kesar Elaichi Shrikhand',
    description: 'अस्सल काश्मिरी केसर आणि वेलचीच्या सुगंधाने परिपूर्ण घट्ट चवदार श्रीखंड.',
    image: '/images/shrikhand.png',
    isPopular: true,
    sizes: [
      { label: '250 g', price: 90 },
      { label: '500 g', price: 175 },
      { label: '1 kg Pack', price: 340 }
    ],
    tag: 'स्पेशल केसर'
  },
  {
    id: 'amrakhand',
    category: 'shrikhand',
    name: 'शाही आंबा श्रीखंड (आम्रखंड)',
    englishName: 'Shahi Mango Amrakhand',
    description: 'अल्फान्सो आंब्याच्या रसाने युक्त मलाईदार शाही आम्रखंड.',
    image: '/images/shrikhand.png',
    isPopular: true,
    sizes: [
      { label: '250 g', price: 95 },
      { label: '500 g', price: 185 },
      { label: '1 kg Pack', price: 360 }
    ],
    tag: 'हापूस चव'
  },
  {
    id: 'fresh-malai-mawa',
    category: 'dairy',
    name: 'शुद्ध खवा (मावा) व ताजी मलाई',
    englishName: 'Pure Khawa (Mawa) & Malai',
    description: 'मिठाई, गुलाबजाम आणि पुरणपोळीसाठी ताज्या दुधापासून बनवलेला शुद्ध खवा.',
    image: '/images/hero-banner.png',
    isPopular: false,
    sizes: [
      { label: '250 g', price: 110 },
      { label: '500 g', price: 210 },
      { label: '1 kg', price: 420 }
    ],
    tag: '१००% शुद्ध खवा'
  },
  {
    id: 'khawa-peda',
    category: 'sweets',
    name: 'शुद्ध खवा पेढा (कुंडी पेढा)',
    englishName: 'Pure Khawa Peda',
    description: 'साई सात्विकचा प्रसिद्ध शुद्ध खव्याचा आणि वेलचीयुक्त पारंपारिक पेढा.',
    image: '/images/sweets.png',
    isPopular: true,
    sizes: [
      { label: '250 g Box', price: 125 },
      { label: '500 g Box', price: 240 },
      { label: '1 kg Box', price: 470 }
    ],
    tag: 'खास खासियत'
  },
  {
    id: 'ukdiche-modak',
    category: 'sweets',
    name: 'पारंपारिक उकडीचे मोदक',
    englishName: 'Traditional Ukdiche Modak',
    description: 'तांदळाच्या पिठीत ओले खोबरे, गूळ व जायफळाचे सारण भरून बनवलेले साजूक तुपातील मोदक.',
    image: '/images/sweets.png',
    isPopular: true,
    sizes: [
      { label: '5 Pcs Pack', price: 120 },
      { label: '11 Pcs Pack', price: 250 },
      { label: '21 Pcs Pack', price: 480 }
    ],
    tag: 'साजूक तुपातील'
  },
  {
    id: 'kaju-katli',
    category: 'sweets',
    name: 'शाही काजू कतली',
    englishName: 'Shahi Kaju Katli',
    description: 'उत्कृष्ट प्रतीच्या काजूपासून बनवलेली मऊ आणि तोंडात विरघळणारी काजू कतली.',
    image: '/images/sweets.png',
    isPopular: true,
    sizes: [
      { label: '250 g Box', price: 240 },
      { label: '500 g Box', price: 470 },
      { label: '1 kg Box', price: 920 }
    ],
    tag: 'प्रीमियम मिठाई'
  },
  {
    id: 'gulab-jamun',
    category: 'sweets',
    name: 'साजूक तुपातील गुलाब जामून',
    englishName: 'Desi Ghee Gulab Jamun',
    description: 'शुद्ध खवा आणि साजूक तुपात तळलेले रसाळ मऊ गरम गुलाब जामून.',
    image: '/images/sweets.png',
    isPopular: false,
    sizes: [
      { label: '500 g Box', price: 160 },
      { label: '1 kg Box', price: 310 }
    ],
    tag: 'रसाळ व मऊ'
  }
];

export const BUSINESS_INFO = {
  name: 'Sai Satvik Dairy Products',
  marathiName: 'साई सात्विक डेअरी उत्पादने',
  heading: 'शुद्ध सात्विक डेअरी उत्पादने',
  tagline: 'डेअरीचे सर्व प्रोडक्ट्स व स्वीट्स चे सर्व प्रोडक्ट्स मिळेल.',
  slogan: 'PURE FOR SURE',
  phones: ['9604988662', '9881010750'],
  primaryPhone: '9604988662',
  whatsappNumber: '919604988662',
  address: {
    line1: 'स. नं. २६५ / २, प्लॉट नं. ४४, रस्ता क्र. २,',
    line2: 'शिवनेरी साई नगर, बँक ऑफ बडोदाच्या मागे,',
    line3: 'साई बाबा मंदिराजवळ, मु.पो. टाकळी,',
    line4: 'ता. निफाड, जि. नाशिक – ४२२३०६.',
    full: 'स. नं. २६५ / २, प्लॉट नं. ४४, रस्ता क्र. २, शिवनेरी साई नगर, बँक ऑफ बडोदाच्या मागे, साई बाबा मंदिराजवळ, मु.पो. टाकळी, ता. निफाड, जि. नाशिक – ४२२३०६.'
  },
  timing: 'सकाळी ६:०० ते रात्री ९:०० (सर्व दिवस उघडे)',
  mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14986.326262985392!2d74.10815125!3d20.09062325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdcddc34ed880b9%3A0x446d3e382bcae159!2sTakali%2C%20Maharashtra%20422306!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'
};
