export interface ITrackingDomains {
  id?: number;
  domain: string;
  main_domain: number;
  domain_type: "3SNET" | "web";
  is_http: boolean;
  is_https: boolean;
  is_default?: boolean;
}

export enum ETrackingDomains {
  domain = "domain",
  domain_type = "domain_type",
  main_domain = "main_domain",
  is_http = "is_http",
  is_https = "is_https",
}
