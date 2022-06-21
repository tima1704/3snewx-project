export interface IPostbacks {
  postback_allowed_ip: string[];
  postback_secure_code: string;
  integration_pixel: string;
  integration_pixel_text: string;
  conversion_hold_period: string;
  forbid_conversion_status: string[];
  conversion_unique_ip: boolean;
  conversion_reject_not_unique_ip: boolean;
}
