
import React from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Users, 
  Activity, 
  Database, 
  Gavel,
  Download,
  Globe
} from 'lucide-react';
import { ComplianceStatus, SecurityMetric, SDGAlignment } from './types';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Executive Dashboard', icon: <Activity className="w-5 h-5" /> },
  { id: 'mission', label: 'Sovereign Mission', icon: <Globe className="w-5 h-5" /> },
  { id: 'gateway', label: 'AI Gateway', icon: <ShieldCheck className="w-5 h-5" /> },
  { id: 'governance', label: 'Data Governance', icon: <Database className="w-5 h-5" /> },
  { id: 'identity', label: 'Civic Identity', icon: <Users className="w-5 h-5" /> },
  { id: 'compliance', label: 'Compliance Map', icon: <Gavel className="w-5 h-5" /> },
  { id: 'logs', label: 'Audit Logs', icon: <FileText className="w-5 h-5" /> },
  { id: 'export', label: 'Repository Export', icon: <Download className="w-5 h-5" /> },
];

export const MOCK_METRICS: SecurityMetric[] = [
  { name: 'Gateway Integrity', value: 99.8, change: 0.2, trend: 'up' },
  { name: 'Filtered Attacks', value: 1240, change: 12, trend: 'up' },
  { name: 'DLP Compliance', value: 94.5, change: -1.2, trend: 'down' },
  { name: 'Avg Latency (ms)', value: 42, change: -5, trend: 'up' },
];

export const SDG_GOALS: SDGAlignment[] = [
  { goal: 'SDG 16: Peace, Justice, Strong Institutions', score: 85, color: '#00689D' },
  { goal: 'SDG 9: Industry, Innovation, Infrastructure', score: 72, color: '#FD6925' },
  { goal: 'SDG 10: Reduced Inequalities', score: 91, color: '#DD1367' },
  { goal: 'SDG 17: Partnerships for the Goals', score: 64, color: '#19486A' },
];

export const INITIAL_LOGS = [
  { id: '1', timestamp: '2025-05-20T10:30:12Z', action: 'Prompt Scanned', source: 'Pi-Auth-0x21', status: ComplianceStatus.PASSED, details: 'Identity verified via Pi Network. No PII detected.', explainabilityScore: 0.98 },
  { id: '2', timestamp: '2025-05-20T10:32:45Z', action: 'DDR Triggered', source: 'Storage-Sync', status: ComplianceStatus.FLAGGED, details: 'Unusual outbound data volume from civic ledger.', explainabilityScore: 0.85 },
  { id: '3', timestamp: '2025-05-20T10:45:00Z', action: 'Model Routing', source: 'Gateway-Edge', status: ComplianceStatus.PASSED, details: 'Routed to Gemini-3-Pro for complex reasoning.', explainabilityScore: 0.92 },
];
