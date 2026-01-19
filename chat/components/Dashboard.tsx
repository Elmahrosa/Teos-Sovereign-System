
import React from 'react';
import { MOCK_METRICS, SDG_GOALS } from '../constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';

const data = [
  { name: '00:00', requests: 4000, threats: 240 },
  { name: '04:00', requests: 3000, threats: 139 },
  { name: '08:00', requests: 2000, threats: 980 },
  { name: '12:00', requests: 2780, threats: 390 },
  { name: '16:00', requests: 1890, threats: 480 },
  { name: '20:00', requests: 2390, threats: 380 },
  { name: '23:59', requests: 3490, threats: 430 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_METRICS.map((metric) => (
          <div key={metric.name} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl hover:border-emerald-500/30 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">{metric.name}</span>
              <div className={`p-1.5 rounded-lg ${
                metric.trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 
                metric.trend === 'down' ? 'bg-rose-500/10 text-rose-400' : 'bg-slate-800 text-slate-400'
              }`}>
                {metric.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : 
                 metric.trend === 'down' ? <TrendingDown className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
              </div>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-white tracking-tight">{metric.value}{metric.name.includes('%') ? '%' : ''}</span>
              <span className={`text-xs font-medium pb-1.5 ${metric.change > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {metric.change > 0 ? '+' : ''}{metric.change}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Traffic */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-white">Network Sovereignty Traffic</h3>
              <p className="text-sm text-slate-500">Live monitoring of AI-Guard gateway requests vs. filtered threats.</p>
            </div>
            <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
              <Info className="w-4 h-4 text-slate-400" />
            </button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="requests" stroke="#10b981" fillOpacity={1} fill="url(#colorRequests)" />
                <Area type="monotone" dataKey="threats" stroke="#f43f5e" fillOpacity={1} fill="url(#colorThreats)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SDG Impact */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-6">
          <div>
            <h3 className="text-lg font-bold text-white">Civic SDG Alignment</h3>
            <p className="text-sm text-slate-500">How AI interactions map to global sustainability goals.</p>
          </div>
          <div className="space-y-4 flex-1 flex flex-col justify-center">
            {SDG_GOALS.map((goal) => (
              <div key={goal.goal} className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-400 max-w-[80%] truncate">{goal.goal}</span>
                  <span className="text-emerald-400">{goal.score}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all duration-1000" 
                    style={{ width: `${goal.score}%`, backgroundColor: goal.color }} 
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-slate-800">
            <p className="text-[10px] text-slate-500 text-center uppercase font-bold tracking-widest">Powered by Gemini Real-time Ethics Engine</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
