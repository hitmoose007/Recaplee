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
  new_changes: number;
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
  changed_content?: ChangedContent[];
};
type ChangedContent = [
  '+' | '-' | '~',
  {
    h1?:
      | string
      | {
          __new: string;
          __old: string;
        };
    h2?:
      | string
      | {
          __new: string;
          __old: string;
        };
    h3?:
      | string
      | {
          __new: string;
          __old: string;
        };
    h4?:
      | string
      | {
          __new: string;
          __old: string;
        };
    h5?:
      | string
      | {
          __new: string;
          __old: string;
        };
    h6?:
      | string
      | {
          __new: string;
          __old: string;
        };
    p?:
      | string
      | {
          __new: string;
          __old: string;
        };
  }
];
