import { IErrorsOfferTabs } from "Redux/OffersRedux/types";

interface IOffersTab {
  title: string;
  includes: string;
  tab: keyof IErrorsOfferTabs;
}

export const OFFER_TABS_URL: IOffersTab[] = [
  { title: "General", includes: "general", tab: "OfferGeneralTabType" },
  { title: "Tracking", includes: "tracking", tab: "OfferTrackingTabType" },
  { title: "Targeting", includes: "targeting", tab: "OfferTargetingTabType" },
  { title: "Affiliates", includes: "affiliates", tab: "OfferAffiliateTabType" },
  { title: "Postbacks", includes: "postbacks", tab: "OfferPostbackTabType" },
  { title: "Payouts", includes: "payouts", tab: "OfferPayoutTabType" },
  { title: "Caps", includes: "caps", tab: "OfferCapTabType" },
  { title: "Creatives", includes: "creatives", tab: "OfferCreativesTabType" },
];
