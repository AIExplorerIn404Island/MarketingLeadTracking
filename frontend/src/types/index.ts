export interface Lead {
  id: number;
  name: string;
  company: string;
  role: string;
  website: string;
  social_links: Record<string, string>;
  email: string;
  location: string;
  industry: string;
  score: number;
  source_id: number;
  created_at: string;
}

export interface Job {
  id: number;
  status: 'pending' | 'running' | 'completed' | 'failed';
  parameters: Record<string, any>;
  created_at: string;
  updated_at?: string;
}

export interface LeadHuntParams {
  industry: string;
  target_role: string;
  location: string;
  keywords: string;
  company_size?: string;
}
