
import React, { useState } from 'react';
import { TeosUser } from '../types';
import { translations, Language } from '../services/translations';

interface SettingsPageProps {
  currentUser: TeosUser;
  onClose: () => void;
  language: Language;
  onSetLanguage: (l: Language) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ currentUser, onClose, language, onSetLanguage }) => {
  const t = translations[language];
  const isRtl = t.dir === 'rtl';

  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'privacy' | 'global'>('profile');
  const [isSaving, setIsSaving] = useState(false);
  
  const [settings, setSettings] = useState({
    notifications: {
      messages: true,
      broadcasts: true,
      reminders: false,
      systemUpdates: true,
    },
    privacy: {
      readReceipts: true,
      showPresence: true,
      autoDisappearing: false,
      anonymizeAnalytics: true,
    },
    displayName: language === 'ar' ? 'المسؤول السيادي' : 'Sovereign Administrator',
    bio: language === 'ar' ? 'عضو في الهيئة الوطنية للتحول الرقمي - السيادة أولاً.' : 'Member of the National Digital Transformation Authority - Sovereignty First.'
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onClose();
    }, 800);
  };

  const TabButton: React.FC<{ id: typeof activeTab; label: string; icon: React.ReactNode }> = ({ id, label, icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-bold text-sm border ${
        activeTab === id 
          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-[0_10px_25px_-5px_rgba(245,158,11,0.3)] scale-[1.02]' 
          : 'text-slate-400 border-transparent hover:text-slate-100 hover:bg-slate-900/50'
      }`}
    >
      <span className={activeTab === id ? 'text-slate-950' : 'text-amber-500/70'}>{icon}</span>
      {label}
    </button>
  );

  const Toggle = ({ enabled, onClick, label, description }: { enabled: boolean, onClick: () => void, label: string, description: string }) => (
    <div className={`flex items-center justify-between p-6 bg-slate-900/30 border border-slate-800/60 rounded-[2rem] hover:border-slate-700 transition-colors group ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className={`flex-1 ${isRtl ? 'ml-4 text-right' : 'mr-4 text-left'}`}>
        <h4 className="text-sm font-black text-slate-200 group-hover:text-white transition-colors">{label}</h4>
        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{description}</p>
      </div>
      <button 
        onClick={onClick}
        className={`w-14 h-8 rounded-full transition-all duration-500 relative flex items-center px-1 ${enabled ? 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'bg-slate-800'}`}
      >
        <div className={`w-6 h-6 bg-white rounded-full shadow-lg transition-transform duration-500 transform ${enabled ? (isRtl ? 'translate-x-0' : 'translate-x-6') : (isRtl ? '-translate-x-6' : 'translate-x-0')}`}></div>
      </button>
    </div>
  );

  return (
    <div className="absolute inset-0 z-[100] bg-slate-950/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-10 animate-fade-in">
      <div className="max-w-5xl w-full bg-slate-950 border border-slate-800/80 rounded-[3rem] shadow-[0_0_120px_-30px_rgba(0,0,0,0.8)] flex flex-col h-[85vh] overflow-hidden ring-1 ring-white/5 relative">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="p-8 border-b border-slate-800/40 flex justify-between items-center bg-slate-900/20">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-slate-900 border border-slate-700 rounded-2xl flex items-center justify-center text-amber-500 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tighter uppercase">{t.settings}</h2>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mt-1">Sovereign Management Console v2.0</p>
            </div>
          </div>
          <button onClick={onClose} className="group p-4 text-slate-500 hover:text-white hover:bg-slate-800 rounded-3xl transition-all border border-transparent hover:border-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <div className={`w-72 border-slate-800/40 bg-slate-900/10 p-6 space-y-4 ${isRtl ? 'border-l' : 'border-r'}`}>
            <TabButton id="profile" label={t.profile} icon={<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>} />
            <TabButton id="notifications" label={t.notifications} icon={<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>} />
            <TabButton id="privacy" label={t.privacy} icon={<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 16h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>} />
            <TabButton id="global" label={t.global} icon={<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/></svg>} />
          </div>

          <div className="flex-1 overflow-y-auto p-12 bg-slate-950 scrollbar-hide">
            {activeTab === 'profile' && (
              <div className="space-y-12 animate-fade-in">
                <section className={`flex items-center gap-10 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-amber-500/10 border-2 border-amber-500/20 flex items-center justify-center text-amber-500 text-5xl font-black shadow-[0_20px_40px_-10px_rgba(245,158,11,0.1)] transition-transform group-hover:scale-105">
                      {currentUser.handle[1].toUpperCase()}
                    </div>
                  </div>
                  <div className={`space-y-3 ${isRtl ? 'text-right' : 'text-left'}`}>
                    <h3 className="text-3xl font-black text-white tracking-tighter">{currentUser.handle}</h3>
                    <div className={`flex flex-wrap gap-3 ${isRtl ? 'justify-end' : 'justify-start'}`}>
                      <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-amber-900/20">
                        {currentUser.role}
                      </span>
                    </div>
                  </div>
                </section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">Display Name</label>
                    <input type="text" value={settings.displayName} onChange={(e) => setSettings({...settings, displayName: e.target.value})} className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-4 text-sm text-slate-100 outline-none" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">National Bio</label>
                    <textarea value={settings.bio} onChange={(e) => setSettings({...settings, bio: e.target.value})} className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-4 text-sm text-slate-100 outline-none resize-none" rows={3} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'global' && (
              <div className="space-y-8 animate-fade-in">
                <div className="mb-10">
                  <h3 className="text-xl font-black text-slate-100 tracking-tight">{t.global}</h3>
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.1em] mt-1">Internationalization and Interface Language</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {(Object.keys(translations) as Language[]).map(langKey => (
                    <button 
                      key={langKey}
                      onClick={() => onSetLanguage(langKey)}
                      className={`p-8 rounded-[2rem] border transition-all flex flex-col items-center gap-4 ${
                        language === langKey 
                        ? 'bg-amber-500/10 border-amber-500 text-amber-500 shadow-xl' 
                        : 'bg-slate-900/40 border-slate-800 text-slate-500 hover:border-slate-600'
                      }`}
                    >
                      <span className="text-2xl font-black uppercase">{langKey}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        {langKey === 'ar' ? 'العربية' : langKey === 'en' ? 'English' : langKey === 'zh' ? '中文' : langKey === 'ja' ? '日本語' : langKey === 'ru' ? 'Русский' : 'हिन्दी'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6 animate-fade-in">
                <Toggle enabled={settings.notifications.messages} onClick={() => {}} label="Direct Messaging" description="Alerts for encrypted sovereign communication." />
                <Toggle enabled={settings.notifications.broadcasts} onClick={() => {}} label="National Broadcasts" description="Critical system-wide alerts." />
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6 animate-fade-in">
                <Toggle enabled={settings.privacy.readReceipts} onClick={() => {}} label="Read Receipts" description="Let participants know you've seen messages." />
                <Toggle enabled={settings.privacy.showPresence} onClick={() => {}} label="Digital Presence" description="Broadcast online status to nodes." />
              </div>
            )}
          </div>
        </div>

        <div className="px-10 py-6 bg-slate-900 border-t border-slate-800/60 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Security: Verified</span>
          </div>
          <button onClick={handleSave} className="px-10 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-2xl shadow-xl min-w-[180px]">
            {t.save}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
