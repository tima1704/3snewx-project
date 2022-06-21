import { ITag } from "Types";

export interface IPayouts {
  general: IPayout[];
  personal: IPayout[];
}

export interface IPayout {
  affiliates?: ITag[];
  country: string[];
  country_exclude: boolean;
  city: string[];
  city_exclude: boolean;
  device: string[];
  os: string[];
  sub: { [key: number]: string };
  total: string;
  payouts: string;
  currency: string;
  goal_value: string;
  goal_title: string;
  payment_type: string;
  tracking_url: string;
}

export const initialStatePayouts: IPayouts = {
  general: [],
  personal: [],
};

export const initialPayout: IPayout = {
  country: [],
  country_exclude: false,
  city: [],
  city_exclude: false,
  device: [],
  os: [],
  sub: {},
  total: "",
  payouts: "",
  currency: "",
  goal_value: "",
  goal_title: "",
  payment_type: "",
  tracking_url: "",
};
