import React, { useState, useMemo, useRef } from 'react';
import { 
  Search, 
  MapPin, 
  Coffee, 
  Utensils, 
  Wrench, 
  Calendar, 
  Sparkles, 
  ChevronRight, 
  Star, 
  Phone, 
  Clock, 
  ArrowLeft,
  X,
  Send,
  User,
  LayoutGrid,
  Home,
  Navigation,
  Bell,
  Compass,
  TrendingUp,
  TrendingDown,
  Sun,
  Cloud,
  CloudRain,
  Coins,
  Gift
} from 'lucide-react';
import { BUSINESSES, EVENTS } from './data';
import { Business, CategoryType, Screen, CityEvent } from './types';
import { getCityGuideResponse } from './geminiService';

// --- Data ---
const GEBZE_PLACES = [
  { id: 'p1', name: 'Eskihisar Kalesi', image: 'https://images.unsplash.com/photo-1590732314545-c49c71607f9c?auto=format&fit=crop&w=400&q=80' },
  { id: 'p2', name: 'Ballıkayalar Tabiat Parkı', image: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&w=400&q=80' },
  { id: 'p3', name: 'Osman Hamdi Bey Müzesi', image: 'https://images.unsplash.com/photo-1566121315132-d3b5e43c1331?auto=format&fit=crop&w=400&q=80' },
  { id: 'p4', name: 'Çoban Mustafa Paşa Külliyesi', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80' }
];

// --- Components ---

const Header: React.FC = () => (
  <header className="h-[60px] w-full bg-white border-b border-slate-50 flex items-center justify-between px-[10px] sticky top-0 z-50">
    <div className="flex items-center gap-2">
      <Navigation size={20} className="text-indigo-600 rotate-[45deg]" />
      <span className="text-sm font-bold text-slate-800">Gaziler Mah. 1711 Sok.</span>
    </div>
    <div className="relative">
      <Bell size={28} className="text-slate-600" />
      <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
    </div>
  </header>
);

const FinanceWeatherWidget: React.FC = () => {
  const financeData = [
    { label: 'USD', value: '34.25', change: '+0.12', trend: 'up' },
    { label: 'EUR', value: '37.10', change: '-0.05', trend: 'down' },
    { label: 'GBP', value: '44.52', change: '+0.08', trend: 'up' },
    { label: 'ALTN', value: '2.952', change: '+1.20', trend: 'up' },
  ];

  const weatherData = [
    { day: 'Pzt', temp: '18°', icon: <Sun className="text-orange-400" size={18} /> },
    { day: 'Sal', temp: '16°', icon: <Cloud className="text-slate-400" size={18} /> },
    { day: 'Çrş', temp: '14°', icon: <CloudRain className="text-blue-400" size={18} /> },
    { day: 'Prş', temp: '15°', icon: <Cloud className="text-slate-400" size={18} /> },
    { day: 'Cum', temp: '19°', icon: <Sun className="text-orange-400" size={18} /> },
  ];

  return (
    <div className="px-[10px] mb-8">
      <div className="flex gap-3 h-[180px]">
        {/* Finance Section (2/5) */}
        <div className="flex-[2] bg-slate-900 rounded-[30px] p-4 flex flex-col justify-between shadow-xl shadow-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <Coins size={16} className="text-indigo-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Piyasalar</span>
          </div>
          <div className="space-y-2">
            {financeData.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-white">{item.label}</span>
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-medium text-slate-300">{item.value}</span>
                  {item.trend === 'up' ? 
                    <TrendingUp size={10} className="text-emerald-400" /> : 
                    <TrendingDown size={10} className="text-rose-400" />
                  }
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weather Section (3/5) */}
        <div className="flex-[3] bg-indigo-50 rounded-[30px] p-4 flex flex-col justify-between border border-indigo-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-indigo-600" />
              <span className="text-[10px] font-bold text-indigo-900 uppercase tracking-widest">Gebze Hava</span>
            </div>
            <span className="text-[11px] font-bold text-indigo-600">Bugün 18°</span>
          </div>
          <div className="flex justify-between items-end">
            {weatherData.map((w, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className="text-[10px] font-bold text-slate-500">{w.day}</span>
                <div className="bg-white/80 backdrop-blur-sm p-2 rounded-2xl shadow-sm">
                  {w.icon}
                </div>
                <span className="text-[11px] font-extrabold text-slate-800">{w.temp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryGrid: React.FC<{ onCategorySelect: (c: CategoryType) => void }> = ({ onCategorySelect }) => {
  const categories = [
    { type: CategoryType.CAFE, icon: <Coffee />, color: 'bg-orange-100 text-orange-600' },
    { type: CategoryType.RESTAURANT, icon: <Utensils />, color: 'bg-rose-100 text-rose-600' },
    { type: CategoryType.SERVICE, icon: <Wrench />, color: 'bg-blue-100 text-blue-600' },
    { type: CategoryType.EVENT, icon: <Calendar />, color: 'bg-purple-100 text-purple-600' },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 px-[10px] mb-8 w-full">
      {categories.map((cat) => (
        <button 
          key={cat.type}
          onClick={() => onCategorySelect(cat.type)}
          className="flex flex-col items-center gap-2"
        >
          <div className={`${cat.color} p-4 rounded-2xl shadow-sm hover:scale-105 transition-transform duration-200`}>
            {React.cloneElement(cat.icon as React.ReactElement, { size: 24 })}
          </div>
          <span className="text-xs font-semibold text-slate-700">{cat.type}</span>
        </button>
      ))}
    </div>
  );
};

const BusinessCard: React.FC<{ business: Business; onClick: () => void }> = ({ business, onClick }) => (
  <div className="px-[10px] mb-4">
    <div 
      onClick={onClick}
      className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer group w-full"
    >
      <div className="relative h-48 overflow-hidden">
        <img src={business.image} alt={business.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        {business.isPromoted && (
          <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg uppercase">Öne Çıkan</span>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-xl flex items-center gap-1">
          <Star size={14} className="text-yellow-400" />
          <span className="text-xs font-bold">{business.rating}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-slate-800 text-lg mb-1">{business.name}</h3>
        <div className="flex items-center gap-1 text-slate-500 mb-3">
          <MapPin size={14} />
          <span className="text-xs truncate">{business.address}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">{business.category}</span>
          <button className="text-indigo-600 group-hover:translate-x-1 transition-transform">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const EventCard: React.FC<{ event: CityEvent }> = ({ event }) => (
  <div className="bg-slate-100 rounded-3xl overflow-hidden shadow-sm relative min-w-[300px] h-[226px]">
    <div className="absolute inset-0 p-6 flex flex-col justify-end">
      <span className="text-indigo-600 text-[10px] font-bold uppercase mb-1">{event.category}</span>
      <h3 className="text-slate-800 font-bold text-xl leading-tight mb-2">{event.title}</h3>
    </div>
  </div>
);

// --- Main App ---

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [showAI, setShowAI] = useState(false);
  const [aiChat, setAIChat] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);
  const [aiInput, setAIInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredBusinesses = useMemo(() => {
    if (!selectedCategory) return BUSINESSES;
    return BUSINESSES.filter(b => b.category === selectedCategory);
  }, [selectedCategory]);

  const handleCategoryClick = (cat: CategoryType) => {
    setSelectedCategory(cat);
    setCurrentScreen('category');
  };

  const handleBusinessClick = (b: Business) => {
    setSelectedBusiness(b);
    setCurrentScreen('details');
  };

  const handleSendAI = async () => {
    if (!aiInput.trim()) return;
    const userMsg = aiInput;
    setAIChat(prev => [...prev, { role: 'user', text: userMsg }]);
    setAIInput('');
    setIsTyping(true);

    const response = await getCityGuideResponse(userMsg);
    setAIChat(prev => [...prev, { role: 'bot', text: response }]);
    setIsTyping(false);
  };

  const handleSearchClick = () => {
    setCurrentScreen('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <div className="pb-32 w-full max-w-full pt-6">
            {/* Events Slider */}
            <section className="mt-2 mb-6 overflow-x-auto scrollbar-hide flex gap-4 px-[10px] no-scrollbar w-full">
              {EVENTS.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </section>
            
            {/* GEBZE'DE GEZİLECEK YERLER SECTION */}
            <div className="mb-8">
              <h3 className="px-[10px] font-bold text-slate-800 text-lg mb-3 flex items-center gap-2">
                <MapPin size={20} className="text-indigo-600" />
                Gebze'de Gezilecek Yerler
              </h3>
              <section className="overflow-x-auto scrollbar-hide flex gap-4 px-[10px] no-scrollbar w-full">
                {GEBZE_PLACES.map(place => (
                  <div key={place.id} className="min-w-[160px] h-[220px] relative rounded-3xl overflow-hidden shadow-sm flex-shrink-0 bg-slate-50 border border-slate-100">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-white font-bold text-sm leading-tight drop-shadow-md">{place.name}</span>
                    </div>
                  </div>
                ))}
              </section>
            </div>

            {/* Finance & Weather Widget */}
            <FinanceWeatherWidget />
          </div>
        );

      case 'category':
        return (
          <div className="pb-32 w-full max-w-full">
            <div className="bg-white flex items-center gap-4 sticky top-0 z-10 shadow-sm py-4 w-full px-[10px]">
              <button onClick={() => setCurrentScreen('home')} className="p-2 hover:bg-slate-100 rounded-full">
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-xl font-bold text-slate-800">{selectedCategory || 'Kategoriler'}</h1>
            </div>
            <div className="space-y-2 pt-4 w-full">
              {filteredBusinesses.map(business => (
                <BusinessCard 
                  key={business.id} 
                  business={business} 
                  onClick={() => handleBusinessClick(business)} 
                />
              ))}
              {filteredBusinesses.length === 0 && (
                <div className="text-center py-12 text-slate-500">Bu kategoride henüz işletme bulunmuyor.</div>
              )}
            </div>
          </div>
        );

      case 'details':
        if (!selectedBusiness) return null;
        return (
          <div className="pb-32 animate-in fade-in slide-in-from-bottom-4 duration-300 w-full max-w-full">
            <div className="relative h-72 w-full">
              <img src={selectedBusiness.image} alt={selectedBusiness.name} className="w-full h-full object-cover" />
              <div className="absolute top-6 left-[10px] flex gap-3">
                <button 
                  onClick={() => setCurrentScreen('category')} 
                  className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg"
                >
                  <ArrowLeft size={24} />
                </button>
              </div>
            </div>
            <div className="bg-white -mt-10 relative rounded-t-[40px] shadow-2xl min-h-[500px] pt-8 w-full">
              <div className="flex justify-between items-start mb-4 px-[10px]">
                <div>
                  <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold mb-2">
                    {selectedBusiness.category}
                  </span>
                  <h1 className="text-3xl font-extrabold text-slate-900">{selectedBusiness.name}</h1>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl flex flex-col items-center">
                  <Star size={20} className="text-yellow-400 mb-1" />
                  <span className="font-bold text-slate-800">{selectedBusiness.rating}</span>
                </div>
              </div>

              <div className="flex gap-4 mb-8 px-[10px]">
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Clock size={16} />
                  <span>{selectedBusiness.workingHours}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Phone size={16} />
                  <span>{selectedBusiness.phone}</span>
                </div>
              </div>

              <div className="text-slate-600 leading-relaxed mb-8 px-[10px]">
                {selectedBusiness.description}
              </div>

              <div className="space-y-4 px-[10px] mb-20">
                <h3 className="font-bold text-lg text-slate-800">Konum</h3>
                <div className="bg-slate-100 rounded-3xl p-4 flex items-center gap-4">
                  <div className="bg-white p-3 rounded-2xl text-indigo-600 shadow-sm">
                    <MapPin size={24} />
                  </div>
                  <span className="text-sm text-slate-700 font-medium">{selectedBusiness.address}</span>
                </div>
              </div>

              <div className="fixed bottom-28 left-0 right-0 px-[10px] flex gap-3 z-20">
                <button className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors">
                  Yol Tarifi Al
                </button>
                <button className="bg-slate-100 text-slate-800 px-6 py-4 rounded-2xl font-bold">
                  Ara
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-white min-h-screen relative overflow-x-hidden flex flex-col items-center">
      {renderScreen()}

      {/* AI Chat Modal - Full Screen */}
      {showAI && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-white animate-in slide-in-from-bottom duration-300 w-full">
          <div className="bg-indigo-600 p-6 flex justify-between items-center text-white w-full">
            <div className="flex items-center gap-3 px-[10px]">
              <div className="bg-white/20 p-2 rounded-xl">
                <Sparkles size={24} />
              </div>
              <div>
                <h2 className="font-bold text-lg leading-tight">Gebzem AI Asistan</h2>
                <span className="text-xs text-indigo-200">Gebze hakkında her şeyi sor!</span>
              </div>
            </div>
            <button onClick={() => setShowAI(false)} className="hover:bg-white/10 p-2 rounded-full mr-[10px]">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-[10px] space-y-4 bg-slate-50 w-full">
            {aiChat.length === 0 && (
              <div className="text-center py-10">
                <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
                  <Sparkles size={32} />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">Sana nasıl yardımcı olabilirim?</h3>
                <p className="text-sm text-slate-500 max-w-[200px] mx-auto">
                  "En iyi İskender nerede yenir?" veya "Eskihisar'da ne yapılır?" gibi sorular sorabilirsin.
                </p>
              </div>
            )}
            {aiChat.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} w-full`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-[16px] leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start w-full">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex gap-1">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-[10px] bg-white border-t border-slate-100 pb-12 w-full">
            <div className="relative flex items-center gap-2">
              <input 
                value={aiInput}
                onChange={(e) => setAIInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendAI()}
                placeholder="Mesajını yaz..."
                className="flex-1 bg-slate-100 py-3.5 px-6 rounded-2xl text-[16px] focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <button 
                onClick={handleSendAI}
                className="bg-indigo-600 text-white p-3.5 rounded-2xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Buttons Container */}
      <div className="fixed bottom-[80px] right-[20px] z-50 flex items-center gap-3">
        {/* Gift Button */}
        <button 
          className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-100 active:scale-90 transition-transform"
        >
          <Gift size={24} className="text-rose-500" />
        </button>

        {/* AI Button */}
        <button 
          onClick={() => setShowAI(true)}
          className="w-[50px] h-[50px] bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-200 active:scale-90 transition-transform"
        >
          <Sparkles size={24} className="text-white animate-pulse" />
        </button>
      </div>

      {/* Bottom Nav Bar - Height: 70px, Distribution: justify-between, Spacing: responsive, Radius: 15px */}
      <nav className="fixed bottom-0 left-0 right-0 w-full bg-white border-t border-slate-100 flex justify-between items-center z-50 h-[70px] shadow-[0_-4px_10px_rgba(0,0,0,0.03)] pb-2 rounded-t-[15px] px-6">
        <button 
          onClick={() => setCurrentScreen('home')} 
          className={`flex flex-col items-center gap-[1px] transition-colors ${currentScreen === 'home' ? 'text-black' : 'text-zinc-500'}`}
        >
          <Home size={26} />
          <span className="text-[10px] font-bold">Anasayfa</span>
        </button>
        
        <button 
          onClick={handleSearchClick}
          className={`flex flex-col items-center gap-[1px] transition-colors ${currentScreen === 'home' && searchInputRef.current === document.activeElement ? 'text-black' : 'text-zinc-500'}`}
        >
          <Search size={26} />
          <span className="text-[10px] font-bold">Arama</span>
        </button>

        <button 
          className="flex flex-col items-center gap-[1px] text-zinc-500"
        >
          <Compass size={26} />
          <span className="text-[10px] font-bold">Keşfet</span>
        </button>

        <button 
          onClick={() => setCurrentScreen('category')}
          className={`flex flex-col items-center gap-[1px] transition-colors ${currentScreen === 'category' ? 'text-black' : 'text-zinc-500'}`}
        >
          <LayoutGrid size={26} />
          <span className="text-[10px] font-bold">Kategori</span>
        </button>

        <button className="flex flex-col items-center gap-[1px] text-zinc-500">
          <User size={26} />
          <span className="text-[10px] font-bold">Profil</span>
        </button>
      </nav>
    </div>
  );
};