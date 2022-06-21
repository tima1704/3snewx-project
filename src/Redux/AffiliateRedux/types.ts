import { IPaymentAffiliate } from "../../Components/Partners/AffiliateManagment/PaymentTab/types";
import { IAffiliatePrimaryInfo } from "../../Components/Partners/AffiliateManagment/PrimaryInfoTab/types";
import { IAffiliate } from "../../Pages/Cabinet/Partners/AffiliateManagment/AffiliateMangmentTable/types";
import { IAvailablePayment, ITag } from "../../Types";

export interface IMainInfoAffiliate {
  trafficSources: ITag[];
  messengers: {
    [lang: string]: {
      id: number;
      title: string;
    }[];
  };
  managers: ITag[];
}

export interface IAffiliateState {
  affiliateList?: IAffiliate[];
  activeAffiliate: {
    [id: string]: {
      primaryInfo: IAffiliatePrimaryInfo;
      paymentInfo: IPaymentAffiliate[];
    };
  };
  mainInfo?: IMainInfoAffiliate;
  availablePayment?: IAvailablePayment[];
}

export enum AffiliateActionTypes {
  RESET_AFFILIATE_STATE = "RESET_AFFILIATE_STATE",
  FETCH_AFFILIATE_LIST = "FETCH_AFFILIATE_LIST",
  FILL_AFFILIATE_LIST = "FILL_AFFILIATE_LIST",
  FETCH_AFFILIATE = "FETCH_AFFILIATE",
  FILL_AFFILIATE = "FILL_AFFILIATE",
  FETCH_MAIN_INFO_AFFILIATE = "FETCH_MAIN_INFO_AFFILIATE",
  FILL_MAIN_INFO_AFFILIATE = "FILL_MAIN_INFO_AFFILIATE",
  FETCH_AFFILIATE_AVAILABLE_PAYMENT = "FETCH_AFFILIATE_AVAILABLE_PAYMENT",
  FILL_AFFILIATE_AVAILABLE_PAYMENT = "FILL_AFFILIATE_AVAILABLE_PAYMENT",
  FETCH_AFFILIATE_PAYMENT = "FETCH_AFFILIATE_PAYMENT",
  FILL_AFFILIATE_PAYMENT = "FILL_AFFILIATE_PAYMENT",
}

export type AffiliateAction =
  | fetchAffiliateList
  | fillAffiliateList
  | fetchAffiliate
  | fillAffiliate
  | fetchMainInfo
  | fillMainInfo
  | fetchAvailablePayment
  | fillAvailablePayment
  | fetchPaymentAffiliate
  | fillPaymentAffiliate
  | resetAffiliateState;

interface fetchAffiliateList {
  type: AffiliateActionTypes.FETCH_AFFILIATE_LIST;
}

interface fillAffiliateList {
  type: AffiliateActionTypes.FILL_AFFILIATE_LIST;
  payload: IAffiliate[];
}

interface fetchAffiliate {
  type: AffiliateActionTypes.FETCH_AFFILIATE;
}

interface fillAffiliate {
  type: AffiliateActionTypes.FILL_AFFILIATE;
  payload: IAffiliatePrimaryInfo;
  id: string;
}

interface fetchMainInfo {
  type: AffiliateActionTypes.FETCH_MAIN_INFO_AFFILIATE;
}
interface fillMainInfo {
  type: AffiliateActionTypes.FILL_MAIN_INFO_AFFILIATE;
  payload: IMainInfoAffiliate;
}

interface fetchAvailablePayment {
  type: AffiliateActionTypes.FETCH_AFFILIATE_AVAILABLE_PAYMENT;
}

interface fillAvailablePayment {
  type: AffiliateActionTypes.FILL_AFFILIATE_AVAILABLE_PAYMENT;
  payload: IAvailablePayment[];
}

interface fetchPaymentAffiliate {
  type: AffiliateActionTypes.FETCH_AFFILIATE_PAYMENT;
}

interface fillPaymentAffiliate {
  type: AffiliateActionTypes.FILL_AFFILIATE_PAYMENT;
  payload: IPaymentAffiliate[];
  id: string;
}

interface resetAffiliateState {
  type: AffiliateActionTypes.RESET_AFFILIATE_STATE;
}
