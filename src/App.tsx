import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Map as MapIcon, 
  Utensils, 
  BookOpen, 
  Calendar, 
  Search, 
  Star, 
  Navigation, 
  Info, 
  AlertTriangle, 
  Languages,
  ChevronRight
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { mockLocations, mockTips } from './lib/mockData';
import { getNearbyHighRated } from './lib/geoUtils';
import { Location, CulturalTip } from './types';

export default function App() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('map');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearbyLocations, setNearbyLocations] = useState<Location[]>([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = { lat: position.coords.latitude, lng: position.coords.longitude };
          setUserLocation(coords);
          const nearby = getNearbyHighRated(coords.lat, coords.lng, mockLocations, 5000, 4.0);
          setNearbyLocations(nearby);
        },
        (error) => console.error('Geolocation error:', error)
      );
    }
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-samarkand-azure text-cotton-white font-sans relative">
      <div className="background-pattern" />

      {/* Sidebar Navigation */}
      <aside className="w-64 h-full bg-black/20 backdrop-blur-[20px] border-r border-glass-border p-10 flex flex-col z-10">
        <div className="text-xl font-extrabold tracking-widest text-silk-gold mb-2 uppercase border-b border-silk-gold pb-2">
          MODERN SILK ROAD
        </div>
        <div className="ganch-border" />
        
        <nav className="flex flex-col gap-6 mt-4">
          <button 
            onClick={() => setActiveTab('map')}
            className={`text-sm font-medium flex items-center cursor-pointer transition-colors ${activeTab === 'map' ? 'nav-item-active' : 'text-cotton-white/70 hover:text-silk-gold'}`}
          >
            {t('smart_compass')}
          </button>
          <button 
            onClick={() => setActiveTab('plov')}
            className={`text-sm font-medium flex items-center cursor-pointer transition-colors ${activeTab === 'plov' ? 'nav-item-active' : 'text-cotton-white/70 hover:text-silk-gold'}`}
          >
            {t('plov_radar')}
          </button>
          <button 
            onClick={() => setActiveTab('guide')}
            className={`text-sm font-medium flex items-center cursor-pointer transition-colors ${activeTab === 'guide' ? 'nav-item-active' : 'text-cotton-white/70 hover:text-silk-gold'}`}
          >
            {t('ethics_law')}
          </button>
        </nav>

        <div className="mt-auto">
          <div className="glass-panel p-3 text-[11px]">
            <p className="text-silk-gold mb-1 font-bold uppercase tracking-wider">{t('offline_sync')}</p>
            <p className="text-cotton-white/70">{t('cached_maps')}</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 z-10 grid grid-cols-[1fr_320px] grid-rows-[auto_1fr] gap-6 overflow-hidden">
        <header className="col-span-2 flex justify-between items-center mb-2">
          <div>
            <p className="text-xs text-silk-gold tracking-[2px] uppercase font-bold mb-1">{t('salaam')}</p>
            <h1 className="text-4xl font-light font-display">{t('samarkand')}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-silk-gold text-black px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              GPS: {userLocation ? `${userLocation.lat.toFixed(2)}° N, ${userLocation.lng.toFixed(2)}° E` : '39.62° N, 66.97° E'}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-10 h-10 rounded-full border border-silk-gold flex items-center justify-center text-xs font-bold hover:bg-silk-gold/10 transition-colors">
                {i18n.language.toUpperCase()}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-samarkand-azure/90 backdrop-blur-lg border-silk-gold text-cotton-white">
                <DropdownMenuItem onClick={() => changeLanguage('en')}>EN</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('uz')}>UZ</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('ru')}>RU</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Left Column: Dynamic Content */}
        <ScrollArea className="h-full pr-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'map' && (
                <div className="space-y-6">
                  <h2 className="text-lg text-silk-gold uppercase tracking-widest flex items-center gap-2">
                    <Navigation className="w-4 h-4" /> {t('proximity_radius')}
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {mockLocations.map((loc) => (
                      <div key={loc.id} className="h-40 relative rounded-xl overflow-hidden border border-glass-border group cursor-pointer">
                        <img 
                          src={loc.images[0]} 
                          alt={loc.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-4 flex flex-col justify-end">
                          <div className="text-sm font-semibold">{t(loc.name)}</div>
                          <div className="text-[11px] text-silk-gold">
                            0.4 km away • <Star className="inline w-3 h-3 fill-silk-gold" /> {loc.rating}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="glass-panel p-6 mt-6">
                    <h2 className="text-lg text-silk-gold uppercase tracking-widest flex items-center gap-2 mb-4">
                      <Utensils className="w-4 h-4" /> {t('plov_style_samarkand')}
                    </h2>
                    <div className="space-y-0">
                      {mockLocations.filter(l => l.category === 'plov_center').map((loc) => (
                        <div key={loc.id} className="flex justify-between items-center py-3 border-b border-cotton-white/10 last:border-none">
                          <span className="text-sm font-medium">{t(loc.name)}</span>
                          <span className="text-[11px] text-silk-gold">
                            {t('best_time')}: {loc.bestPlovTime === 'lunch' ? '12:30 PM' : '11:45 AM'} • <Star className="inline w-3 h-3 fill-silk-gold" /> {loc.rating}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'plov' && (
                <div className="space-y-6">
                  <h2 className="text-lg text-silk-gold uppercase tracking-widest flex items-center gap-2">
                    <Utensils className="w-4 h-4" /> {t('plov_radar')}
                  </h2>
                  <div className="grid gap-4">
                    {mockLocations.filter(l => l.category === 'plov_center').map((loc) => (
                      <div key={loc.id} className="glass-panel p-6 flex justify-between items-center">
                        <div>
                          <h3 className="text-xl font-display text-silk-gold">{t(loc.name)}</h3>
                          <p className="text-sm text-cotton-white/70">{loc.plovStyle}</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-silk-gold text-black mb-2">{t(loc.bestPlovTime || 'lunch')}</Badge>
                          <div className="flex items-center gap-1 text-silk-gold">
                            <Star className="w-4 h-4 fill-silk-gold" />
                            <span className="font-bold">{loc.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'guide' && (
                <div className="space-y-6">
                  <h2 className="text-lg text-silk-gold uppercase tracking-widest flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> {t('cultural_guide')}
                  </h2>
                  <div className="grid gap-4">
                    {mockTips.map((tip) => (
                      <div key={tip.id} className="guide-card">
                        <h3 className="text-sm font-bold mb-1 uppercase tracking-wider">{t(tip.title)}</h3>
                        <p className="text-xs text-cotton-white/70 leading-relaxed">{t(tip.content)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </ScrollArea>

        {/* Right Column: Cultural Intelligence Sidebar */}
        <aside className="glass-panel p-6 border-silk-gold/50 flex flex-col h-full">
          <h2 className="text-lg text-silk-gold uppercase tracking-widest flex items-center gap-2 mb-6">
            <Info className="w-4 h-4" /> {t('cultural_intelligence')}
          </h2>
          
          <ScrollArea className="flex-1 pr-2">
            <div className="space-y-4">
              <div className="guide-card">
                <h3 className="text-xs font-bold mb-1 uppercase">{t('dress_code_title')}</h3>
                <p className="text-[11px] text-cotton-white/70">{t('dress_code_desc')}</p>
              </div>

              <div className="guide-card">
                <h3 className="text-xs font-bold mb-1 uppercase">{t('bazaar_ethics_title')}</h3>
                <p className="text-[11px] text-cotton-white/70">{t('bazaar_ethics_desc')}</p>
              </div>

              <div className="guide-card">
                <h3 className="text-xs font-bold mb-1 uppercase">{t('legal_warning_title')}</h3>
                <p className="text-[11px] text-cotton-white/70">{t('legal_warning_desc')}</p>
              </div>

              <div className="guide-card bg-silk-gold/10 border-silk-gold">
                <h3 className="text-xs font-bold mb-1 uppercase text-silk-gold">{t('emergency_protocol')}</h3>
                <p className="text-[11px] text-cotton-white/70">{t('police')}</p>
                <p className="text-[11px] text-cotton-white/70">{t('medical')}</p>
              </div>
            </div>
          </ScrollArea>
          
          <div className="mt-6">
            <Button className="w-full bg-silk-gold hover:bg-silk-gold/90 text-black font-bold py-6 rounded-xl shadow-lg shadow-silk-gold/20">
              {t('download_offline')}
            </Button>
          </div>
        </aside>
      </main>
    </div>
  );
}
