
import React, { useState, useRef, useEffect } from 'react';
import { evaluatePrompt } from '../services/geminiService';
import { AIResponse, ComplianceStatus } from '../types';
import { ShieldAlert, ShieldCheck, Terminal, Cpu, Info, Send, Loader2 } from 'lucide-react';

const AIGateway: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<AIResponse | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [results, isProcessing]);

  const handleSimulate = async () => {
    if (!prompt.trim() || isProcessing) return;
    setIsProcessing(true);
    const result = await evaluatePrompt(prompt);
    setResults(result);
    setIsProcessing(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-12rem)] animate-in fade-in duration-500">
      {/* Simulation Input */}
      <div className="flex flex-col gap-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 overflow-hidden">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <Terminal className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-white">AI Guard Terminal</h3>
        </div>
        
        <div className="flex-1 space-y-4">
          <p className="text-sm text-slate-400">
            Test the TEOS-AI-Guard security layer. Submit a prompt to see how it is filtered, routed, and checked for SDG compliance.
          </p>
          
          <div className="relative group">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter a prompt to analyze... (e.g., 'Draft a civic funding proposal for water infrastructure in rural Egypt')"
              className="w-full h-48 bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50 transition-all resize-none font-mono"
            />
            <div className="absolute inset-0 rounded-xl pointer-events-none group-hover:shadow-[0_0_20px_rgba(16,185,129,0.05)] transition-all" />
          </div>

          <div className="flex flex-wrap gap-2">
            {['Attack Simulation', 'PII Leak Check', 'SDG Audit', 'Model Routing'].map((tag) => (
              <span key={tag} className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={handleSimulate}
          disabled={!prompt.trim() || isProcessing}
          className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-600 rounded-xl text-slate-950 font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(16,185,129,0.2)] active:scale-95"
        >
          {isProcessing ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Send className="w-4 h-4" />
              RUN SECURITY EVALUATION
            </>
          )}
        </button>
      </div>

      {/* Evaluation Results */}
      <div className="flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-slate-100/[0.03] pointer-events-none" />
        <div className="p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur flex justify-between items-center z-10">
          <div className="flex items-center gap-3">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white">Evaluation Output</h3>
          </div>
          {results && (
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${
              results.decision === ComplianceStatus.PASSED ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
              results.decision === ComplianceStatus.FLAGGED ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
              'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}>
              {results.decision === ComplianceStatus.PASSED ? <ShieldCheck className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3" />}
              {results.decision}
            </div>
          )}
        </div>

        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar z-10 space-y-6" ref={scrollRef}>
          {isProcessing ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-500">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
              </div>
              <p className="text-sm font-medium">Scanning prompt via TEOS-AI-Guard protocols...</p>
            </div>
          ) : results ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="space-y-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Routing Decision</span>
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-emerald-400">
                  Target: <span className="text-white">{results.routing}</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Sanitized Prompt</span>
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-300 italic">
                  "{results.filteredPrompt}"
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Audit Explanation</span>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {results.explanation}
                </p>
              </div>

              <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
                  <Info className="w-3 h-3" />
                  SDG Impact Assessment
                </div>
                <p className="text-sm text-slate-400 leading-relaxed italic">
                  {results.sdgImpact}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-2 text-slate-600 text-center px-12">
              <div className="p-4 rounded-full bg-slate-800/50 mb-4">
                <Terminal className="w-8 h-8 opacity-20" />
              </div>
              <p className="text-sm">Submit a prompt to generate a sovereign compliance report.</p>
              <p className="text-xs italic">"We don't ban AI. We constitutionalize it."</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIGateway;
