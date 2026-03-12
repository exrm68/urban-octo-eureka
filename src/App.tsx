import { useState, useEffect, useMemo } from 'react';
import { Showcase3D } from './components/Showcase3D';
import { DisclaimerModal } from './components/DisclaimerModal';
import { AboutModal } from './components/AboutModal';
import { SeriesDetailsModal } from './components/SeriesDetailsModal';
import { DetailsModal } from './components/DetailsModal';
import { IntroScreen } from './components/IntroScreen';
import { CategoryScreen } from './components/CategoryScreen';
import { ContentItem, dummyContent } from './data';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { saveOrUpdateUser, saveWatchHistory, incrementUserWatchCount } from './firestoreService';

type AppView = 'intro' | 'categories' | 'content';

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}

function App() {
  const [currentView, setCurrentView] = useState<AppView>('intro');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [selectedSeries, setSelectedSeries] = useState<ContentItem | null>(null);
  const [infoContent, setInfoContent] = useState<ContentItem | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const [user, setUser] = useState<TelegramUser | null>(null);

  // Initialize Telegram Web App & Strict Dark Theme
  useEffect(() => {
    const tg = (window as any).Telegram;
    if (tg?.WebApp) {
      tg.WebApp.ready();
      tg.WebApp.expand();
      tg.WebApp.setHeaderColor('#050505');
      tg.WebApp.setBackgroundColor('#050505');
      
      if (tg.WebApp.initDataUnsafe?.user) {
        const tgUser = tg.WebApp.initDataUnsafe.user;
        setUser(tgUser);
        // Firebase এ user save করো
        saveOrUpdateUser({
          userId: tgUser.id,
          firstName: tgUser.first_name,
          lastName: tgUser.last_name,
          username: tgUser.username,
          photoUrl: tgUser.photo_url,
          totalWatched: 0,
        });
      } else {
        const mockUser = { id: 123456, first_name: 'Premium', last_name: 'User',
          photo_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4' };
        setUser(mockUser);
        saveOrUpdateUser({ userId: mockUser.id, firstName: mockUser.first_name, totalWatched: 0 });
      }
    } else {
      const mockUser = { id: 123456, first_name: 'Premium', last_name: 'User',
        photo_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4' };
      setUser(mockUser);
      saveOrUpdateUser({ userId: mockUser.id, firstName: mockUser.first_name, totalWatched: 0 });
    }
    document.documentElement.classList.add('dark');
    document.documentElement.style.backgroundColor = '#050505';
  }, []);

  // Filter content based on active category
  const filteredContent = useMemo(() => {
    if (!activeCategory) return [];
    return dummyContent.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  const handleWatch = (item: ContentItem) => {
    if (item.type === 'series' && item.episodes && item.episodes.length > 0) {
      setSelectedSeries(item);
    } else {
      setSelectedContent(item);
    }
  };

  const handleInfo = (item: ContentItem) => {
    setInfoContent(item);
  };

  const handleWatchAllEpisodes = (series: ContentItem) => {
    setSelectedSeries(null);
    setSelectedContent(series);
  };

  const handleConfirmWatch = () => {
    // Firebase এ watch history save করো
    if (selectedContent && user) {
      saveWatchHistory({
        userId: user.id,
        userName: user.first_name + (user.last_name ? ' ' + user.last_name : ''),
        contentTitle: selectedContent.title,
        contentCategory: selectedContent.category,
        contentType: selectedContent.type,
      });
      incrementUserWatchCount(user.id);
    }
    const tg = (window as any).Telegram;
    if (tg?.WebApp) {
      tg.WebApp.openLink('https://t.me/your_bot_username/app_name');
    } else {
      window.open('https://t.me/your_bot_username/app_name', '_blank');
    }
    setSelectedContent(null);
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#0f0c29] bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans selection:bg-purple-500/30">
      
      {/* Global Header (Only for content view to show back button) */}
      {currentView === 'content' && (
        <header className="absolute top-0 w-full z-50 flex justify-between items-center px-5 py-4 pointer-events-none bg-gradient-to-b from-[#0f0c29] via-[#0f0c29]/80 to-transparent">
          {/* Left Side: Back Button */}
          <div className="flex items-center gap-3 pointer-events-auto">
            <button 
              onClick={() => setCurrentView('categories')}
              className="text-white/70 hover:text-white transition-all bg-white/5 hover:bg-white/10 backdrop-blur-md p-2.5 rounded-full border border-white/10 shadow-sm active:scale-95"
            >
              <ArrowLeft size={20} />
            </button>
          </div>

          {/* Right Side: Premium User Profile */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md py-1.5 px-2 rounded-full border border-white/20 pointer-events-auto shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <div className="flex flex-col items-end pl-2">
              <span className="font-display text-sm tracking-wide font-bold text-white drop-shadow-md leading-none">
                {user?.first_name || 'Premium'}
              </span>
              <span className="text-[9px] text-purple-300 font-medium uppercase tracking-widest mt-0.5">Pro Member</span>
            </div>
            {user?.photo_url ? (
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-purple-500 blur-[4px] opacity-50"></div>
                <img src={user.photo_url} alt={user.first_name} className="relative w-9 h-9 rounded-full object-cover border-2 border-white/20 shadow-lg" />
              </div>
            ) : (
              <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.5)] border-2 border-white/20">
                <Sparkles size={14} className="text-white" />
              </div>
            )}
          </div>
        </header>
      )}

      {/* View Routing */}
      {currentView === 'intro' && (
        <IntroScreen onExplore={() => setCurrentView('categories')} user={user} />
      )}

      {currentView === 'categories' && (
        <CategoryScreen 
          user={user}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            setCurrentView('content');
          }} 
        />
      )}

      {currentView === 'content' && (
        <Showcase3D items={filteredContent} onWatch={handleWatch} onInfo={handleInfo} />
      )}

      {/* Modals */}
      <DetailsModal 
        isOpen={!!infoContent}
        content={infoContent}
        onClose={() => setInfoContent(null)}
        onPlay={handleWatch}
      />

      <SeriesDetailsModal 
        isOpen={!!selectedSeries}
        series={selectedSeries}
        onClose={() => setSelectedSeries(null)}
        onWatchAll={handleWatchAllEpisodes}
      />

      <DisclaimerModal 
        isOpen={!!selectedContent} 
        contentTitle={selectedContent?.title || ''} 
        onClose={() => setSelectedContent(null)}
        onConfirm={handleConfirmWatch}
      />

      <AboutModal 
        isOpen={showAbout} 
        onClose={() => setShowAbout(false)} 
      />
    </div>
  );
}

export default App;
