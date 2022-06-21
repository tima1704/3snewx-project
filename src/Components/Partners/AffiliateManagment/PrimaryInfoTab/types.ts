import { ITag } from "../../../../Types";

export interface IAffiliatePrimaryInfo {
  email: string;
  plain_password?: string;
  manager_id: string;
  status: string;
  address1: string;
  address2: string;
  city: string;
  country: string;
  zip_code: string;
  note: string;
  allowed_sub_account: string[];
  disallowed_sub_account: string[];
  referer_desc: string;
  referral_percent: string;
  hide_conversion_percent: boolean;
  // messenger
  category?: ITag[];
  tag?: ITag[];
  traffic_source: string[];
  traffic_geo?: string[];
}

export const initialAffiliatePrimaryInfo: IAffiliatePrimaryInfo = {
  email: "",
  plain_password: "",
  status: "",
  address1: "",
  address2: "",
  city: "",
  country: "",
  zip_code: "",
  traffic_geo: [],
  traffic_source: [],
  note: "",
  allowed_sub_account: [],
  disallowed_sub_account: [],
  manager_id: "",
  referer_desc: "",
  referral_percent: "",
  hide_conversion_percent: true,
};
