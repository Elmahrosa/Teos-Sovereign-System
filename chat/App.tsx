
import React, { useState, useEffect } from 'react';
import { TeosUser, ChatRoom, Message, GroundingSource } from './types';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import CivicHub from './components/CivicHub';
import LiveVoiceOverlay from './components/LiveVoiceOverlay';
import SettingsPage from './components/SettingsPage';
import { translations, Language } from './services/translations';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('ar');
  const t = translations[language];

  const [currentUser] = useState<TeosUser>({
    id: 'u-001',
    handle: '@teos/egy-governance',
    publicKey: 'ed25519-root-mock-key',
    role: 'GOVERNMENT',
    isVerified: true
  });

  const [rooms, setRooms] = useState<ChatRoom[]>([
    {
      id: 'r-001',
      name: language === 'ar' ? 'مركز الذكاء السيادي' : language === 'en' ? 'Sovereign Intel Center' : language === 'fr' ? 'Centre d\'Intel Souverain' : 'Sovereign Intel Node',
      type: 'CIVIC',
      participants: [
        { id: 'u-001', handle: '@teos/egy-governance', publicKey: '...', role: 'GOVERNMENT', isVerified: true },
        { id: 'u-002', handle: '@teos/citizen-aly', publicKey: '...', role: 'CIVILIAN', isVerified: false },
      ],
      messages: [
        { 
          id: 'm-1', 
          senderId: 'u-001', 
          text: language === 'ar' ? 'مرحباً بك في مركز الذكاء السيادي. يمكنك الآن استخدام البحث والخرائط والتفكير العميق.' : 'Welcome to the Sovereign Intelligence Center. You can now use Search, Maps, and Deep Thinking.', 
          timestamp: Date.now() - 3600000, 
          type: 'TEXT' 
        },
      ],
      unreadCount: 0,
      lastMessage: language === 'ar' ? 'أهلاً بكم في نظام الذكاء السيادي.' : 'Welcome to the sovereign intelligence system.'
    }
  ]);

  const [activeRoomId, setActiveRoomId] = useState<string>(rooms[0].id);
  const [isCivicHubOpen, setIsCivicHubOpen] = useState(false);
  const [isLiveVoiceOpen, setIsLiveVoiceOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [onboarded, setOnboarded] = useState(false);

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = language;
    document.body.dir = t.dir;
  }, [language, t.dir]);

  const activeRoom = rooms.find(r => r.id === activeRoomId) || rooms[0];

  const handleSendMessage = (text: string, type: Message['type'] = 'TEXT', mediaUrl?: string, groundingSources?: GroundingSource[]) => {
    const newMessage: Message = {
      id: `m-${Date.now()}`,
      senderId: currentUser.id,
      text,
      timestamp: Date.now(),
      type,
      mediaUrl,
      groundingSources
    };

    setRooms(prev => prev.map(r => {
      if (r.id === activeRoomId) {
        return {
          ...r,
          messages: [...r.messages, newMessage],
          lastMessage: text
        };
      }
      return r;
    }));
  };

  if (!onboarded) {
    return (
      <div className="h-screen w-screen bg-[#020617] flex items-center justify-center p-4 overflow-hidden relative font-['IBM_Plex_Sans_Arabic']">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-40"></div>
        <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-amber-600/5 blur-[120px] rounded-full"></div>
        
        <div className="max-w-2xl w-full text-center space-y-10 animate-fade-in z-10">
          <div className="flex justify-center">
            <div className="w-28 h-28 bg-gradient-to-tr from-amber-600 to-amber-300 rounded-[2.8rem] shadow-[0_25px_60px_rgba(245,158,11,0.3)] flex items-center justify-center border-4 border-slate-900 group hover:scale-105 transition-transform duration-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-slate-950" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
              </svg>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
            {(Object.keys(translations) as Language[]).map(l => (
              <button 
                key={l}
                onClick={() => setLanguage(l)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all tracking-widest border ${
                  language === l 
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-xl' 
                    : 'bg-slate-900/50 text-slate-500 border-slate-800 hover:text-slate-300 hover:border-slate-700'
                }`}
              >
                {translations[l].langName}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl font-black text-white tracking-tighter">{t.appTitle}</h1>
            <p className="text-amber-500 font-black text-xs uppercase tracking-[0.5em] opacity-80">{t.sovereignSub}</p>
          </div>

          <div className="bg-slate-900/40 p-12 rounded-[3.5rem] border border-slate-800/60 backdrop-blur-3xl shadow-[0_0_80px_rgba(0,0,0,0.5)] space-y-10 relative overflow-hidden group border-t-white/5">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-all duration-700"></div>
            
            <div className="space-y-4">
              <p className="text-white text-3xl font-black leading-tight tracking-tight">
                {t.onboardingTitle}
              </p>
              <p className="text-slate-400 text-sm leading-relaxed font-medium px-6 opacity-80">
                {t.onboardingDesc}
              </p>
            </div>
            
            <button 
              onClick={() => setOnboarded(true)}
              className="w-full py-6 bg-amber-600 hover:bg-amber-500 text-slate-950 font-black text-sm rounded-3xl transition-all shadow-[0_15px_40px_rgba(217,119,6,0.3)] uppercase tracking-[0.2em] active:scale-95 border-b-4 border-amber-800"
            >
              {t.enterHub}
            </button>
            
            <div className="pt-4 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">RSA-4096 Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Sovereign Data</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex h-screen w-full bg-slate-950 text-slate-100 overflow-hidden font-['IBM_Plex_Sans_Arabic']`} dir={t.dir}>
      <Sidebar 
        currentUser={currentUser} 
        rooms={rooms} 
        activeRoomId={activeRoomId}
        onSelectRoom={setActiveRoomId}
        onOpenCivicHub={() => setIsCivicHubOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        language={language}
      />
      
      <main className="flex-1 h-full relative overflow-hidden">
        <ChatWindow 
          room={activeRoom} 
          currentUser={currentUser}
          onSendMessage={handleSendMessage}
          onOpenLiveVoice={() => setIsLiveVoiceOpen(true)}
          language={language}
        />
        
        {isCivicHubOpen && (
          <CivicHub onClose={() => setIsCivicHubOpen(false)} language={language} />
        )}

        {isLiveVoiceOpen && (
          <LiveVoiceOverlay onClose={() => setIsLiveVoiceOpen(false)} />
        )}

        {isSettingsOpen && (
          <SettingsPage 
            currentUser={currentUser} 
            onClose={() => setIsSettingsOpen(false)} 
            language={language}
            onSetLanguage={setLanguage}
          />
        )}
      </main>
    </div>
  );
};

export default App;
