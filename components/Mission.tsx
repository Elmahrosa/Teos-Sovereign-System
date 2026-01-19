
import React from 'react';
import { Globe, Shield, Heart, Zap, Github, Mail, Briefcase, FileCheck, ExternalLink, Newspaper } from 'lucide-react';

const Mission: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-bold text-emerald-400 uppercase tracking-widest">
          Sovereign Civic Infrastructure
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Infrastructure, <span className="text-emerald-500">Not Hype</span>
        </h1>
        <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
          Positioning Elmahrosa International as the foundational governance layer for Egypt's digital future.
        </p>
      </div>

      {/* Core Mission Text */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 relative overflow-hidden group shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
          <Globe className="w-64 h-64 text-emerald-500" />
        </div>
        
        <div className="relative z-10 space-y-8">
          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-slate-200 leading-relaxed font-semibold border-l-4 border-emerald-500 pl-6">
              TEOS Egypt / Elmahrosa International: A compliance-first, civic-first blockchain ecosystem for a sustainable future.
            </p>
            <p className="text-slate-400 leading-relaxed text-lg">
              We separate from speculative crypto. TEOS is designed for <strong>regulator maturity</strong>, providing the infrastructure for digital identity, secure value transfer, and impact tracking aligned with UN SDGs.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <a 
                href="https://medium.com/@Elmahrosapi/teos-egypt-a-compliance-first-civic-first-blockchain-ecosystem-for-a-sustainable-future-ea9d2115372e"
                target="_blank"
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
              >
                <Newspaper className="w-5 h-5" />
                Read the Strategic Vision on Medium
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-slate-800">
            <div className="flex items-start gap-4">
              <div className="bg-emerald-500/10 p-2 rounded-lg">
                <Briefcase className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Institutional Anchor</h4>
                <p className="text-sm text-slate-500">Built to empower governments and institutions with modular, production-ready code.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-emerald-500/10 p-2 rounded-lg">
                <FileCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Source-Available Compliance</h4>
                <p className="text-sm text-slate-500">Governed by the PolyForm Noncommercial License 1.0.0 + TESL Sovereign Overlay.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Links */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-4">
        <a 
          href="https://github.com/Elmahrosa" 
          target="_blank"
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 hover:text-white hover:border-emerald-500/50 transition-all font-semibold"
        >
          <Github className="w-5 h-5" />
          github.com/Elmahrosa
        </a>
        <a 
          href="mailto:ayman@teosegypt.com"
          className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-slate-950 rounded-2xl hover:bg-emerald-400 transition-all font-bold shadow-[0_0_20px_rgba(16,185,129,0.2)]"
        >
          <Mail className="w-5 h-5" />
          ayman@teosegypt.com
        </a>
      </div>

      <div className="text-center pt-8">
        <p className="text-[10px] text-slate-600 uppercase font-bold tracking-[0.3em]">
          Constitutionalizing AI • Sovereign Blockchain Infrastructure
        </p>
      </div>
    </div>
  );
};

export default Mission;
