import { Prisma } from '@prisma/client';
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

export type User = {
  id?: string;
  email?: string;
  query_monitored?: number;
  competitors_tracked?: number;
  query_research?: number;
  stripe_id?: string;
  renewal_date?: Date;
  maxResearchQuery?: number;
  maxMonitoredQuery?: number;
  maxScrape?: number;
};

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
  current_content?: CurrentContent[];
  old_content?: CurrentContent[];
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

export type CurrentContent = [
  {
    h2?: string;
    p?: string;
    h1?: string;
    h3?: string;
    h4?: string;
    h5?: string;
    h6?: string;
  }
];

export type Change = {
  tag: string;
  value: any;
} | null;
