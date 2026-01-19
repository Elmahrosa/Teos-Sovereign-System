
import React, { useState, useEffect, useRef } from 'react';
import { ChatRoom, Message, TeosUser, GroundingSource } from '../types';
import { translations, Language } from '../services/translations';
import { 
  animateImageWithVeo, 
  sovereignQuery, 
  generateImagePro, 
  analyzeDocument,
  editImageWithGemini 
} from '../services/geminiService';

interface ChatWindowProps {
  room: ChatRoom;
  currentUser: TeosUser;
  onSendMessage: (text: string, type?: Message['type'], mediaUrl?: string, sources?: GroundingSource[]) => void;
  onOpenLiveVoice: () => void;
  language: Language;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ room, currentUser, onSendMessage, onOpenLiveVoice, language }) => {
  const t = translations[language];
  const isRtl = t.dir === 'rtl';

  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [mode, setMode] = useState<'CHAT' | 'SEARCH' | 'MAPS' | 'IMAGE_GEN' | 'DOC_SCAN'>('CHAT');
  const [useThinking, setUseThinking] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [room.messages]);

  const handleSend = async () => {
    if (!inputText.trim() && !selectedImage) return;

    setIsProcessing(true);
    const textToSend = inputText;
    
    try {
      if (mode === 'IMAGE_GEN' && textToSend.trim()) {
        const imageUrl = await generateImagePro(textToSend);
        onSendMessage(`${t.processing}: "${textToSend}"`, 'IMAGE', imageUrl);
      } else if (selectedImage) {
        if (mode === 'DOC_SCAN') {
          const result = await analyzeDocument(selectedImage, textToSend);
          onSendMessage(`${t.scanner}: \n${result}`, 'TEXT');
        } else {
          const lowerInput = textToSend.toLowerCase();
          if (lowerInput.includes('animate')) {
            const videoUrl = await animateImageWithVeo(selectedImage, textToSend);
            onSendMessage(`Sovereign Video Animation`, 'VIDEO', videoUrl);
          } else {
            const editedImageUrl = await editImageWithGemini(selectedImage, textToSend);
            onSendMessage(`Sovereign Image Edit`, 'IMAGE', editedImageUrl);
          }
        }
        setSelectedImage(null);
      } else {
        const { text, sources } = await sovereignQuery(
          textToSend, 
          { search: mode === 'SEARCH', maps: mode === 'MAPS' }, 
          useThinking
        );
        onSendMessage(text, 'TEXT', undefined, sources);
      }
      setInputText('');
    } catch (err) {
      alert("Error processing sovereign request.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 relative">
      <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border border-amber-500/30 bg-amber-500/10 text-amber-500`}>
            {room.name[0]}
          </div>
          <div>
            <h2 className="font-bold text-slate-100 flex items-center gap-2 text-sm md:text-base">
              {room.name}
              <span className="text-[10px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-1.5 py-0.5 rounded-full font-bold">{t.active}</span>
            </h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Sovereign Node #24</p>
          </div>
        </div>
        <button onClick={onOpenLiveVoice} className="p-2.5 bg-slate-800 text-amber-500 rounded-full border border-slate-700 hover:shadow-lg transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
          </svg>
        </button>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-hide">
        {room.messages.map((msg) => {
          const isMine = msg.senderId === currentUser.id;
          return (
            <div key={msg.id} className={`flex ${isMine ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[85%] flex flex-col ${isMine ? 'items-start' : 'items-end'}`}>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${isMine ? 'bg-amber-600 text-white rounded-tr-none' : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none'}`}>
                  {msg.mediaUrl && msg.type === 'IMAGE' && <img src={msg.mediaUrl} className="rounded-xl mb-3 border border-white/10" />}
                  {msg.mediaUrl && msg.type === 'VIDEO' && <video src={msg.mediaUrl} controls className="rounded-xl mb-3" />}
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  {msg.groundingSources && msg.groundingSources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                      {msg.groundingSources.map((s, i) => (
                        <a key={i} href={s.uri} target="_blank" className="text-[10px] bg-white/10 px-2 py-1 rounded truncate max-w-[120px]">{s.title}</a>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-slate-600 mt-2 uppercase font-black">{new Date(msg.timestamp).toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US')}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-slate-900/80 border-t border-slate-800 backdrop-blur-md">
        <div className={`flex flex-wrap gap-2 mb-3 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
          <ModeBtn active={mode === 'CHAT'} onClick={() => setMode('CHAT')} label={t.chat} icon="💬" />
          <ModeBtn active={mode === 'SEARCH'} onClick={() => setMode('SEARCH')} label={t.search} icon="🔍" />
          <ModeBtn active={mode === 'MAPS'} onClick={() => setMode('MAPS')} label={t.maps} icon="📍" />
          <ModeBtn active={mode === 'IMAGE_GEN'} onClick={() => setMode('IMAGE_GEN')} label={t.imageGen} icon="🎨" />
          <ModeBtn active={mode === 'DOC_SCAN'} onClick={() => setMode('DOC_SCAN')} label={t.scanner} icon="📄" />
          <div className="h-6 w-[1px] bg-slate-800 mx-1"></div>
          <ModeBtn active={useThinking} onClick={() => setUseThinking(!useThinking)} label={t.thinking} icon="🧠" color="text-purple-400" />
        </div>

        {selectedImage && (
          <div className="mb-4 relative inline-block group">
             <img src={selectedImage} className="w-20 h-20 object-cover rounded-xl border-2 border-amber-500 shadow-2xl" />
             <button onClick={() => setSelectedImage(null)} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" /></svg>
             </button>
          </div>
        )}

        <div className="flex items-end gap-3 bg-slate-800/50 p-2.5 rounded-2xl border border-slate-700 focus-within:border-amber-500/50 focus-within:bg-slate-800 transition-all">
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => setSelectedImage(reader.result as string);
              reader.readAsDataURL(file);
            }
          }} />
          <button onClick={() => fileInputRef.current?.click()} className="p-2 text-slate-400 hover:text-amber-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </button>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isProcessing}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder={t.placeholder}
            rows={1}
            className="flex-1 bg-transparent border-none focus:ring-0 text-slate-100 text-sm py-2 resize-none max-h-32 scrollbar-hide"
          />
          <button 
            onClick={handleSend}
            disabled={(!inputText.trim() && !selectedImage) || isProcessing}
            className="p-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl transition-all disabled:opacity-30 shadow-lg shadow-amber-900/40"
          >
            {isProcessing ? <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full" /> : 
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transform ${isRtl ? 'rotate-90' : '-rotate-90'}`} viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>}
          </button>
        </div>
      </div>
    </div>
  );
};

const ModeBtn: React.FC<{ active: boolean, onClick: () => void, label: string, icon: string, color?: string }> = ({ active, onClick, label, icon, color }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap ${
      active 
        ? 'bg-amber-500 text-slate-900 border-amber-500 shadow-md scale-105' 
        : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:border-slate-600'
    } ${color || ''}`}
  >
    <span>{icon}</span>
    {label}
  </button>
);

export default ChatWindow;
