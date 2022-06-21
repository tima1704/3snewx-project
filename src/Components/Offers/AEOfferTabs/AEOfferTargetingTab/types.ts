import { ITag } from "Types";

export interface ITargetingOfferPersonal {
  country: string[];
  country_exclude: boolean;
  region: string[];
  region_exclude: boolean;
  city: string[];
  city_exclude: boolean;
  device: string[];
  device_exclude: boolean;
  connection_type: string[];
  os: IOs[];
  os_exclude: boolean;
  affiliate?: ITag[];
  vendors: ITag[];
  CSL: string;
  CSLcustom: string;
  minimal_click_ttl: string;
  click_minimal_click_ttl: string;
  mobile_carrier: IMobileCaries[];
  mobile_carrier_exclude: boolean;
  sub: ISubAccaunt[];
  block_by_empty_sub: string;
  browser: string[];
  ip: string[];
}

export interface ITargetingOffer extends ITargetingOfferPersonal {
  enable_restriction: boolean;
  personal_targeting: ITargetingOfferPersonal[];
}

export interface IOs {
  name: string;
  condition: string;
  version: string;
}

export interface IMobileCaries {
  country: string[];
  mobileCarier: string;
}

export interface ISubAccaunt {
  value: string;
  equals: boolean;
  name: string;
}

export const initialTargetingPersonal: ITargetingOfferPersonal = {
  country: [],
  country_exclude: false,
  device: [],
  device_exclude: false,
  connection_type: [],
  region: [],
  region_exclude: false,
  city: [],
  city_exclude: false,
  os: [],
  os_exclude: false,
  vendors: [],
  CSL: "",
  CSLcustom: "",
  minimal_click_ttl: "",
  click_minimal_click_ttl: "",
  mobile_carrier: [],
  mobile_carrier_exclude: false,
  sub: [{ value: "", equals: false, name: "sub1" }],
  block_by_empty_sub: "",
  browser: [],
  ip: [],
};

export const initialStateTargeting: ITargetingOffer = {
  enable_restriction: false,
  country: [],
  country_exclude: false,
  device: [],
  device_exclude: false,
  connection_type: [],
  region: [],
  region_exclude: false,
  city: [],
  city_exclude: false,
  os: [],
  os_exclude: false,
  vendors: [],
  CSL: "",
  CSLcustom: "",
  minimal_click_ttl: "",
  click_minimal_click_ttl: "",
  mobile_carrier: [],
  mobile_carrier_exclude: false,
  sub: [{ value: "", equals: false, name: "sub1" }],
  block_by_empty_sub: "",
  browser: [],
  ip: [],
  personal_targeting: [],
};
