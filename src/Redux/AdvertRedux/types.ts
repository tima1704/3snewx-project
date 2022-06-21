import { IAdvertItem } from "../../Components/Advertisers/types";
import { ITag } from "../../Types";

export interface IAdvert {
  id: number | string;
  company: string;
  bank_info: string;
  vat_code: string;
  registration_number: string;
  manager: {
    id: string;
    name: string;
  };
  address1: string;
  address2: string;
  city: string;
  country: string;
  zip_code: string;
  allowed_ip: string[];
  allowed_sub_account: [];
  disallowed_sub_account: [];
  forbid_change_postback_status: boolean;
  secure_postback_code: string;
  s2s: string;
  offer_count: number;
  contacts: [];
  currency: string;
  payment_method: string;
  manager_id: string;
  email: string;
}

export interface IAdvertFormInfo {
  managers: ITag[];
  messengers: {
    [lang: string]: {
      id: number;
      title: string;
    }[];
  };
}

export interface IAdvertState {
  advertList?: IAdvertItem[];
  activeAdvert?: IAdvert;
  formInfo?: IAdvertFormInfo;
}

export enum AdvertActionTypes {
  FETCH_ADVERT_LIST = "FETCH_ADVERT_LIST",
  FILL_ADVERT_LIST = "FILL_ADVERT_LIST",
  FETCH_ADVERT = "FETCH_ADVERT",
  FILL_ADVERT = "FILL_ADVERT",
  REMOVE_ADVERT_INFO = "REMOVE_ADVERT_INFO",
  FETCH_ADVERT_FORM_INFO = "FETCH_ADVERT_FORM_INFO",
  FILL_ADVERT_FORM_INFO = "FILL_ADVERT_FORM_INFO",
  ON_CHANGE_ADVERT = "ON_CHANGE_ADVERT",
}

export type AdvertActions =
  | fetchAdvertList
  | fillAdvertList
  | fetchAdvert
  | fillAdvert
  | removeAdvertInfo
  | fetchAdvertFormInfo
  | fillAdvertFormInfo
  | onChangeAdvert;

interface fetchAdvertList {
  type: AdvertActionTypes.FETCH_ADVERT_LIST;
}

interface fillAdvertList {
  type: AdvertActionTypes.FILL_ADVERT_LIST;
  payload: IAdvertItem[];
}

interface fetchAdvert {
  type: AdvertActionTypes.FETCH_ADVERT;
}

interface fillAdvert {
  type: AdvertActionTypes.FILL_ADVERT;
  payload: IAdvert;
}

interface removeAdvertInfo {
  type: AdvertActionTypes.REMOVE_ADVERT_INFO;
}

interface fetchAdvertFormInfo {
  type: AdvertActionTypes.FETCH_ADVERT_FORM_INFO;
}

interface fillAdvertFormInfo {
  type: AdvertActionTypes.FILL_ADVERT_FORM_INFO;
  payload: IAdvertFormInfo;
}

interface onChangeAdvert {
  type: AdvertActionTypes.ON_CHANGE_ADVERT;
  payload: { key: string; value: any };
}
