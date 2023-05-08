export interface QuerySummary {
  id: string;
  competitors_tracked: number;
  created_at: string;
  old_update: string;
  recent_update: string;
  query_name: string;
  google_domain: string;
  is_pc: boolean;
  country: string;
  new_changes: null;
  serp_chnages: number;
  changes_per_website: number;
}

export type Competitor = {
  current_position?: number;
  last_position?: number;
  title?: string;
  domain?: string;
  link?: string;
  query_id?: string;
  id: string;
  is_custom?: boolean;
  content_changed?: number;
  changes_detected?: number;
};
