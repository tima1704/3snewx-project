export interface IOfferCard {
  title: string;
  advert?: { id: number; title: string };
  trackingUrl: string;
  previewUrl: string;
  clickTtl: string;
  clickTtlCustom?: string;
  kpi: { [lang: string]: string };
  description: { [lang: string]: string };
  trafficSource: {
    allow: { id: string; title: string }[];
    disallow: { id: string; title: string }[];
  };
  status: string;
  privacyLevel: string;
  isTop: boolean;
  connectionType: string[];
  caps: ICap[];
  landingPages: ILandingPage[];
  conversionHoldPeriod: string;
  categories: { id: string; title: string }[];
  allowDeeplinks: boolean;
  cr: string;
  epc: string;
  releaseDate: string;
  createdAt: string;
  updatedAt: string;
}

export const initialCardOffer: IOfferCard = {
  title: "",
  trackingUrl: "",
  previewUrl: "",
  clickTtl: "",
  kpi: {},
  description: {},
  trafficSource: { allow: [], disallow: [] },
  status: "",
  privacyLevel: "",
  isTop: false,
  connectionType: [],
  caps: [],
  landingPages: [],
  conversionHoldPeriod: "",
  categories: [],
  allowDeeplinks: false,
  cr: "",
  epc: "",
  releaseDate: "",
  createdAt: "",
  updatedAt: "",
};

interface ICap {
  id: string;
  affiliate: string[];
  affiliateType: "all" | "each" | "select";
  conversionStatus: string[];
  createdAt: string;
  goal: string;
  hide: boolean;
  offerId: string;
  overCap: boolean;
  timeframe: string;
  timezone: string;
  type: string;
  updatedAt: string;
  value: string;
}

interface ILandingPage {
  id: string;
  previewUrl: string;
  title: string;
  trackingUrl: string;
  type: string;
}
