export interface ISetUrls {
  id?: number;
  link: string;
  type?:
    | "tracking_site_url"
    | "admin_url"
    | "affiliate_network_url"
    | "api_url"
    | "impressions_domain";
  is_http: boolean;
  is_https: boolean;
}

export enum ESetUrls {
  link = "link",
  is_http = "is_http",
  is_https = "is_https",
}
