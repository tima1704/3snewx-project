import { IOfferList } from "../../Types/Offers";

import { ITrackingDomains } from "../../Components/Settings/SystemSettings/SysSetDomains/types";
import { IFilterOffers } from "../../Components/Offers/OffersMiniComponents/HeaderFilter/types";
import { IPageMeta, IValidError } from "../../Types";
import { IOfferCard } from "../../Pages/Cabinet/Offers/OfferCard/types";
import { IRequestsItem } from "../../Components/Offers/OffersCard/Requests/types";

export interface IOffersState {
  list: IOfferList[];
  offerEdit: {};
  offerCard: {
    data?: IOfferCard;
    disableAffiliates?: IAffiliateOffer;
    enableAffiliates?: IAffiliateOffer;
    requests?: IRequests;
  };
  mainInfo: {
    availableLanguage?: string[];
    trackingDomain?: ITrackingDomains[];
    trafficSources?: { id: string; text: string }[];
    descriptionTemplates?: [];
    kpiTemplates?: [];
    goalTemplates?: {
      id: string;
      title: string;
    }[];
  };
  filter?: IFilterOffers;
  pageMeta?: IPageMeta;
  errors: IErrorsOfferTabs;
}

export interface IAffiliateOffer {
  affiliates: {
    id: number;
    email: string;
  }[];
  page: 1;
  countPerPage: 1;
  totalCount: 1;
}

export interface IRequests {
  requests: IRequestsItem[];
  page: number;
  totalCount: number;
  countPerPage: number;
}

export interface IErrorsOfferTabs {
  OfferGeneralTabType: IValidError[];
  OfferTrackingTabType: IValidError[];
  OfferTargetingTabType: IValidError[];
  OfferAffiliateTabType: IValidError[];
  OfferPostbackTabType: IValidError[];
  OfferPayoutTabType: IValidError[];
  OfferCapTabType: IValidError[];
  OfferCreativesTabType: IValidError[];
}

export const resetErroresOffers: IErrorsOfferTabs = {
  OfferGeneralTabType: [],
  OfferTrackingTabType: [],
  OfferTargetingTabType: [],
  OfferAffiliateTabType: [],
  OfferPostbackTabType: [],
  OfferPayoutTabType: [],
  OfferCapTabType: [],
  OfferCreativesTabType: [],
};

export enum OffersActionTypes {
  FETCH_OFFERS_LIST = "FETCH_OFFERS_LIST",
  FILL_OFFERS_LIST = "FILL_OFFERS_LIST",
  FETCH_OFFER_MAIN_INFO = "FETCH_OFFER_MAIN_INFO",
  FILL_OFFER_MAIN_INFO = "FILL_OFFER_MAIN_INFO",
  SET_FILTER_OFFERS = "SET_FILTER_OFFERS",
  RESET_FILTER_OFFFERS = "RESET_FILTER_OFFFERS",
  FILL_OFFERS_ERROR = "FILL_OFFERS_ERROR",
  FILL_FULL_OFFERS_ERROR = "FILL_FULL_OFFERS_ERROR",
  FETCH_AFFILIATES_ENEBLED = "FETCH_AFFILIATES_ENEBLED",
  FILL_AFFILIATES_ENEBLED = "FILL_AFFILIATES_ENEBLED",
  FETCH_AFFILIATES_DISABLED = "FETCH_AFFILIATES_DISABLED",
  FILL_AFFILIATES_DISABLED = "FILL_AFFILIATES_DISABLED",
  FETCH_REQUESTS_CARD = "FETCH_REQUESTS_CARD",
  FILL_REQUESTS_CARD = "FILL_REQUESTS_CARD",
}

export type OffersAction =
  | OffersFetchList
  | offersFillList
  | offersFetchMainInfo
  | offersFillMaininfo
  | setFilterOffers
  | resetFilterOffers
  | fillOffersError
  | fillFullOffersError
  | fetchAffiliatesEnebled
  | fillAffiliatesEnebled
  | fetchAffiliatesDisabled
  | fillAffiliatesDisabled
  | fetchRequestsCard
  | fillRequestsCard;

interface OffersFetchList {
  type: OffersActionTypes.FETCH_OFFERS_LIST;
}

interface offersFillList {
  type: OffersActionTypes.FILL_OFFERS_LIST;
  payload: { offers: IOfferList[]; meta: IPageMeta };
}

interface offersFetchMainInfo {
  type: OffersActionTypes.FETCH_OFFER_MAIN_INFO;
}

interface offersFillMaininfo {
  type: OffersActionTypes.FILL_OFFER_MAIN_INFO;
  payload: {
    availableLanguage?: string[];
    trackingDomain?: ITrackingDomains[];
    trafficSources?: { [key: number]: string };
    descriptionTemplates?: [];
    kpiTemplates?: [];
    goalTemplates?: {
      id: string;
      title: string;
    }[];
  };
}

interface setFilterOffers {
  type: OffersActionTypes.SET_FILTER_OFFERS;
  payload: IFilterOffers;
}

interface resetFilterOffers {
  type: OffersActionTypes.RESET_FILTER_OFFFERS;
}

interface fillOffersError {
  type: OffersActionTypes.FILL_OFFERS_ERROR;
  payload: IValidError[];
  tab: keyof IErrorsOfferTabs;
}

interface fillFullOffersError {
  type: OffersActionTypes.FILL_FULL_OFFERS_ERROR;
  payload: IErrorsOfferTabs;
}

interface fetchAffiliatesEnebled {
  type: OffersActionTypes.FETCH_AFFILIATES_ENEBLED;
}

interface fillAffiliatesEnebled {
  type: OffersActionTypes.FILL_AFFILIATES_ENEBLED;
  payload: IAffiliateOffer;
}

interface fetchAffiliatesDisabled {
  type: OffersActionTypes.FETCH_AFFILIATES_DISABLED;
}

interface fillAffiliatesDisabled {
  type: OffersActionTypes.FILL_AFFILIATES_DISABLED;
  payload: IAffiliateOffer;
}

interface fetchRequestsCard {
  type: OffersActionTypes.FETCH_REQUESTS_CARD;
}

interface fillRequestsCard {
  type: OffersActionTypes.FILL_REQUESTS_CARD;
  payload: IRequests;
}
