
import React, { useState } from 'react';
import { summarizePolicy } from '../services/geminiService';
import { translations, Language } from '../services/translations';

interface CivicHubProps {
  onClose: () => void;
  language: Language;
}

const CivicHub: React.FC<CivicHubProps> = ({ onClose, language }) => {
  const t = translations[language];
  const isRtl = t.dir === 'rtl';

  const [summarizedPolicyText, setSummarizedPolicyText] = useState('');
  const [activePolicyTitle, setActivePolicyTitle] = useState('');
  const [activePolicyFullText, setActivePolicyFullText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const policies = [
    { title: language === 'ar' ? "قانون حماية البيانات الشخصية 2020" : "Data Protection Law 2020", fullText: "Official document outlining data sovereignty and citizen privacy rights." },
    { title: language === 'ar' ? "استراتيجية التحول الرقمي 2030" : "Digital Strategy 2030", fullText: "National roadmap for digital infrastructure development." },
    { title: language === 'ar' ? "مبادرة السيادة الرقمية (TEOS)" : "Digital Sovereignty (TEOS)", fullText: "Sovereign cloud project ensuring data stays within borders." }
  ];

  const handleSummarize = async (title: string, text: string) => {
    setIsLoading(true);
    setActivePolicyTitle(title);
    setActivePolicyFullText(text);
    const result = await summarizePolicy(text);
    setSummarizedPolicyText(result || '');
    setIsLoading(false);
  };

  const handleSelectPolicy = (title: string, text: string) => {
    setActivePolicyTitle(title);
    setActivePolicyFullText(text);
    setSummarizedPolicyText('');
  };

  const handleShare = async (title: string, text: string, type: 'original' | 'summary' = 'original') => {
    const label = type === 'summary' ? `(${t.summary})` : `(${t.original})`;
    const shareData = {
      title: `TEOS Civic Hub: ${title} ${label}`,
      text: `${title}\n${label}\n\n${text}`,
      url: window.location.href,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (err) { console.error(err); }
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-slate-950/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-10 animate-fade-in">
      <div className="max-w-6xl w-full bg-slate-950 border border-slate-800/60 rounded-[3rem] shadow-[0_0_120px_-30px_rgba(0,0,0,1)] flex flex-col h-[88vh] overflow-hidden ring-1 ring-white/5 relative">
        <div className="px-10 py-8 border-b border-slate-800/40 flex justify-between items-center bg-slate-900/10 backdrop-blur-3xl">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-slate-900 border border-slate-700/50 rounded-2xl flex items-center justify-center text-amber-500 shadow-inner group transition-all hover:border-amber-500/40">
              <svg className="h-9 w-9 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase">{t.civicHub}</h2>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{t.sovereignSub}</p>
            </div>
          </div>
          <button onClick={onClose} className="group p-4 text-slate-500 hover:text-white rounded-3xl transition-all border border-transparent hover:border-slate-800/50">
            <svg className="h-7 w-7 transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
          <section className={`lg:w-[420px] border-slate-800/40 bg-slate-900/10 overflow-y-auto p-8 scrollbar-hide space-y-8 ${isRtl ? 'border-l' : 'border-r'}`}>
            <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em] px-2">Official National Archive</h3>
            <div className="space-y-6">
              {policies.map((p, i) => {
                const isActive = activePolicyTitle === p.title;
                return (
                  <div 
                    key={i} 
                    onClick={() => handleSelectPolicy(p.title, p.fullText)} 
                    className={`relative p-7 rounded-[2.5rem] border transition-all duration-300 cursor-pointer group overflow-hidden ${
                      isActive 
                        ? 'bg-slate-900/60 border-amber-500/50 shadow-[0_20px_50px_-15px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/20 translate-x-1' 
                        : 'bg-slate-900/20 border-slate-800/60 hover:border-slate-700 hover:bg-slate-900/40 hover:-translate-y-1'
                    }`}
                  >
                    {isActive && (
                      <div className={`absolute top-0 bottom-0 w-1 bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)] ${isRtl ? 'right-0' : 'left-0'}`}></div>
                    )}
                    
                    <h4 className={`text-[14px] font-black mb-3 transition-colors ${isActive ? 'text-amber-500' : 'text-slate-200 group-hover:text-amber-400'}`}>
                      {p.title}
                    </h4>
                    <p className={`text-[12px] leading-relaxed transition-colors line-clamp-2 ${isActive ? 'text-slate-300' : 'text-slate-500 group-hover:text-slate-400'}`}>
                      {p.fullText}
                    </p>
                    
                    <div className="flex items-center justify-between mt-6">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleSummarize(p.title, p.fullText); }} 
                        className={`text-[10px] font-black uppercase px-6 py-2.5 rounded-2xl border transition-all ${
                          isActive 
                            ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-lg shadow-amber-950/20' 
                            : 'text-amber-500/80 border-amber-500/20 hover:bg-amber-500/10 hover:border-amber-500/40'
                        }`}
                      >
                        {t.aiSummary}
                      </button>
                      <span className={`text-[9px] font-black uppercase tracking-widest ${isActive ? 'text-amber-500/40' : 'text-slate-700'}`}>Sovereign Grade</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="flex-1 bg-slate-950 p-10 lg:p-16 overflow-y-auto scrollbar-hide relative">
            <div className="max-w-4xl mx-auto flex flex-col h-full">
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  {t.aiSummary} Intelligence Node
                </h3>
                {activePolicyTitle && (
                  <button onClick={() => handleShare(activePolicyTitle, summarizedPolicyText || activePolicyFullText, summarizedPolicyText ? 'summary' : 'original')} className="group text-[11px] font-black text-amber-500 bg-amber-500/5 px-6 py-3 rounded-2xl border border-amber-500/20 hover:bg-amber-500/10 transition-all flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    {t.share}
                  </button>
                )}
              </div>
              <div className="flex-1 flex flex-col justify-center items-center text-center">
                {isLoading ? (
                  <div className="animate-pulse space-y-6">
                    <div className="w-20 h-20 border-[3px] border-amber-500/10 border-t-amber-500 rounded-full animate-spin shadow-[0_0_30px_rgba(245,158,11,0.1)] mx-auto"></div>
                    <p className="text-amber-500 font-black uppercase tracking-[0.2em]">{t.processing}</p>
                  </div>
                ) : summarizedPolicyText ? (
                  <div className={`bg-slate-900/40 border border-slate-800/60 rounded-[3rem] p-12 w-full shadow-2xl animate-fade-in ${isRtl ? 'text-right' : 'text-left'}`}>
                    <div className="flex items-center gap-4 mb-8">
                       <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500 border border-amber-500/20">
                         <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"/>
                         </svg>
                       </div>
                       <h4 className="text-2xl font-black text-slate-100">{activePolicyTitle}</h4>
                    </div>
                    <div className="text-lg text-slate-200 leading-[2.1] font-medium p-10 bg-slate-950/60 rounded-[2.5rem] border border-white/5 shadow-inner backdrop-blur-xl">
                      {summarizedPolicyText}
                    </div>
                    <div className="mt-8 flex justify-between items-center text-[10px] font-black text-slate-600 uppercase tracking-widest opacity-60">
                       <span>Engine: Gemini-3-Flash</span>
                       <span>Grade: Institutional (Verified)</span>
                    </div>
                  </div>
                ) : activePolicyTitle ? (
                  <div className={`bg-slate-900/30 border border-slate-800 rounded-[3rem] p-12 w-full shadow-xl animate-fade-in ${isRtl ? 'text-right' : 'text-left'}`}>
                    <h4 className="text-3xl font-black text-white mb-8 tracking-tight">{activePolicyTitle}</h4>
                    <p className={`text-slate-400 text-lg leading-relaxed italic pr-8 border-amber-500/40 ${isRtl ? 'border-r-4' : 'border-l-4 pl-8'}`}>
                      {activePolicyFullText}
                    </p>
                  </div>
                ) : (
                  <div className="opacity-20 flex flex-col items-center group">
                    <div className="w-24 h-24 rounded-[2rem] border-2 border-slate-800 flex items-center justify-center mb-10 transition-all group-hover:border-amber-500/30 group-hover:shadow-[0_0_50px_rgba(245,158,11,0.05)]">
                      <svg className="h-12 w-12 text-slate-700 transition-colors group-hover:text-amber-500/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.4em] transition-colors group-hover:text-slate-400">
                      {language === 'ar' ? 'اختر وثيقة للتحليل الوطني' : 'Select a document for national analysis'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CivicHub;
