// Common API Types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  from: number;
  to: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  roles: string[];
  permissions: string[];
  is_active: boolean;
  last_login_at?: string;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember_me?: boolean;
}

export interface AuthResponse {
  user: User;
  token?: string;
  requires_password_change?: boolean;
}

export interface Contract {
  id: string;
  contract_number: string;
  title: string;
  party_name: string;
  contract_value?: number;
  start_date: string;
  end_date?: string;
  contract_type: string;
  status: 'draft' | 'active' | 'expired' | 'terminated';
  description?: string;
  attachments?: string[];
  created_at: string;
  updated_at: string;
}

export interface Investigation {
  id: string;
  investigation_number: string;
  title: string;
  subject: string;
  investigator: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'closed';
  description?: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
}

export interface Litigation {
  id: string;
  case_number: string;
  title: string;
  court: string;
  judge?: string;
  plaintiff: string;
  defendant: string;
  case_type: string;
  status: 'pending' | 'in_progress' | 'closed' | 'appealed';
  next_hearing?: string;
  description?: string;
  sessions?: LitigationSession[];
  created_at: string;
  updated_at: string;
}

export interface LitigationSession {
  id: string;
  litigation_id: string;
  session_date: string;
  session_type: string;
  notes?: string;
  outcome?: string;
  next_session_date?: string;
  created_at: string;
}

export interface LegalAdvice {
  id: string;
  subject: string;
  client_name: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
  description: string;
  advice?: string;
  attachments?: string[];
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  data?: any;
  created_at: string;
}

export interface ReportFilter {
  type: string;
  from_date?: string;
  to_date?: string;
  status?: string;
  category?: string;
}

export interface DashboardStats {
  total_contracts: number;
  active_contracts: number;
  total_investigations: number;
  open_investigations: number;
  total_litigations: number;
  active_litigations: number;
  total_legal_advices: number;
  pending_legal_advices: number;
  total_users: number;
  active_users: number;
}

export interface FileUpload {
  file: File;
  name?: string;
  description?: string;
}