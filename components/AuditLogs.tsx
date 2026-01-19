
import React from 'react';
import { INITIAL_LOGS } from '../constants';
import { ComplianceStatus } from '../types';
import { Search, Filter, ArrowUpRight, ShieldCheck, ShieldAlert, Clock } from 'lucide-react';

const AuditLogs: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden animate-in fade-in duration-700">
      <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/50 backdrop-blur">
        <div>
          <h3 className="text-lg font-bold text-white">Immutable Audit Trail</h3>
          <p className="text-sm text-slate-500">Decentralized logging for security forensics and compliance reporting.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search source or action..." 
              className="bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-300 focus:outline-none focus:border-emerald-500/50" 
            />
          </div>
          <button className="p-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white transition-all">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/50">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Timestamp</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Action</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Origin</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Confidence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {INITIAL_LOGS.map((log) => (
              <tr key={log.id} className="hover:bg-slate-800/30 transition-colors group cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-slate-200 text-sm">
                  {log.action}
                  <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{log.details}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-400">
                    {log.source}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className={`flex items-center gap-1.5 text-xs font-bold ${
                    log.status === ComplianceStatus.PASSED ? 'text-emerald-400' : 
                    log.status === ComplianceStatus.FLAGGED ? 'text-amber-400' : 'text-rose-400'
                  }`}>
                    {log.status === ComplianceStatus.PASSED ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                    {log.status}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 text-sm font-mono text-slate-300">
                    {(log.explainabilityScore * 100).toFixed(0)}%
                    <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-950/20 text-center">
        <button className="text-xs font-bold text-slate-500 hover:text-emerald-400 transition-colors uppercase tracking-widest">
          Download Comprehensive Compliance Report
        </button>
      </div>
    </div>
  );
};

export default AuditLogs;
