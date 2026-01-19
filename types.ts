
export type UserRole = 'CIVILIAN' | 'GOVERNMENT' | 'ENTERPRISE';

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
  type: 'TEXT' | 'FILE' | 'SYSTEM' | 'MINUTES' | 'IMAGE' | 'VIDEO';
  mediaUrl?: string;
  groundingSources?: GroundingSource[];
  isThinking?: boolean;
  disappearing?: boolean;
  expiresAt?: number;
}

export interface ChatRoom {
  id: string;
  name: string;
  participants: TeosUser[];
  type: 'DIRECT' | 'GROUP' | 'CIVIC';
  messages: Message[];
  lastMessage?: string;
  unreadCount: number;
}

export enum CivicActionType {
  MEETING_MINUTES = 'MEETING_MINUTES',
  POLICY_DRAFT = 'POLICY_DRAFT',
  INCIDENT_REPORT = 'INCIDENT_REPORT'
}

export interface TeosUser {
  id: string;
  handle: string;
  publicKey: string;
  role: UserRole;
  isVerified: boolean;
}
