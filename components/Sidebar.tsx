
import React from 'react';
import { ChatRoom, TeosUser } from '../types';
import { translations, Language } from '../services/translations';

interface SidebarProps {
  currentUser: TeosUser;
  rooms: ChatRoom[];
  activeRoomId: string;
  onSelectRoom: (id: string) => void;
  onOpenCivicHub: () => void;
  onOpenSettings: () => void;
  language: Language;
}

const Sidebar: React.FC<SidebarProps> = ({ currentUser, rooms, activeRoomId, onSelectRoom, onOpenCivicHub, onOpenSettings, language }) => {
  const t = translations[language];
  const isRtl = t.dir === 'rtl';

  return (
    <div className={`w-80 h-full border-slate-800 bg-slate-900 flex flex-col ${isRtl ? 'border-l' : 'border-r'}`}>
      {/* Profile Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-500 font-bold text-xl shadow-lg shadow-amber-900/10">
            {currentUser.handle[1].toUpperCase()}
          </div>
          <div>
            <h1 className="font-bold text-sm text-slate-100">{currentUser.handle}</h1>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                {currentUser.role} – Sovereign Verified
              </span>
            </div>
          </div>
        </div>
        <button 
          onClick={onOpenSettings}
          className="p-2 text-slate-500 hover:text-amber-500 hover:bg-slate-800 rounded-lg transition-all"
          title={t.settings}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000-6z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Civic Hub Quick Access */}
      <button 
        onClick={onOpenCivicHub}
        className="mx-4 mt-4 p-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 transition-all rounded-lg text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-900/20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05l-3.293 3.293a1 1 0 01-1.414 0l-3.293-3.293a1 1 0 01-.285-1.05l1.738-5.42-1.233-.616a1 1 0 01.894-1.79l1.599.8L9 4.323V3a1 1 0 011-1zm0 5a3 3 0 100 6 3 3 0 000-6z" clipRule="evenodd" />
        </svg>
        {t.civicHub}
      </button>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto mt-4 px-2 space-y-1 scrollbar-hide">
        <h3 className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{t.chats}</h3>
        {rooms.map(room => (
          <button
            key={room.id}
            onClick={() => onSelectRoom(room.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors group ${
              activeRoomId === room.id ? 'bg-slate-800' : 'hover:bg-slate-800/50'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${
              room.type === 'CIVIC' ? 'bg-amber-600/20 text-amber-500' : 'bg-slate-700 text-slate-300'
            }`}>
              {room.name[0]}
            </div>
            <div className="flex-1 text-right overflow-hidden">
              <div className={`flex justify-between items-center ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
                <span className={`text-sm font-semibold truncate ${activeRoomId === room.id ? 'text-amber-500' : 'text-slate-200'}`}>
                  {room.name}
                  {room.type === 'CIVIC' && (
                    <span className="mx-1 text-[10px] bg-amber-500/10 text-amber-500 px-1 rounded border border-amber-500/20">Official</span>
                  )}
                </span>
                {room.unreadCount > 0 && (
                  <span className="bg-amber-500 text-slate-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {room.unreadCount}
                  </span>
                )}
              </div>
              <p className={`text-[11px] text-slate-500 truncate mt-0.5 ${isRtl ? 'text-right' : 'text-left'}`}>
                {room.lastMessage || '...'}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Footer Branding */}
      <div className="p-4 border-t border-slate-800 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-amber-600 rounded flex items-center justify-center text-[10px] font-bold text-white">T</div>
          <span className="text-[10px] font-bold text-slate-500 tracking-tighter">TEOS v2.5.0</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
          <span className="animate-pulse">●</span> {t.connected}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
