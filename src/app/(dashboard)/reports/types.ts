export interface BaseReport {
  id: number;
  reporter_email: string;
  reported_email: string;
  Report_Type: string;
  isEmailVerified: boolean;
}

export interface HighlightReport extends BaseReport {
  highlight_url?: string;
}

export interface StoryReport extends BaseReport {
  story_url?: string;
}

export interface DMReport extends BaseReport {
  message_content?: string;
}

export interface PostReport extends BaseReport {
  post_url?: string;
}

export interface ProfileReport extends BaseReport {
  profile_id?: string;
}

export type ReportType = "Highlight" | "Stories" | "Dm" | "Post" | "Profiles";
