export interface ITrackingTab {
  tracking_url: string;
  preview_url: string;
  additional_macro: string;
  landing_page: ILanding[];
  trafficback_url: string;
  tracking_domain_url: string;
  redirect_type: string;
  allow_deeplinks: boolean;
  allow_impressions: boolean;
}

export interface ILanding {
  title: string;
  tracking_url: string;
  preview_url: string;
  type: string;
}

export enum ELanding {
  title = "title",
  tracking_url = "tracking_url",
  preview_url = "preview_url",
  type = "type",
}
