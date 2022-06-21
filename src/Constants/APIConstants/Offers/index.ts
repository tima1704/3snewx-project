import Config from "Configs";
const { apiHost } = Config;

type offerTabs =
  | "general"
  | "tracking"
  | "targeting"
  | "affiliate"
  | "postback"
  | "payout"
  | "cap";

export const API_OFFERS = apiHost + "/offer";
export const API_OFFERS_DRAFT = apiHost + "/offer-draft";

export const API_OFFERS_CARD = (draft: boolean, id: string) =>
  draft ? API_OFFERS_DRAFT + "/" + id : API_OFFERS + "/" + id;

export const API_GET_MAIN_INFO_OFFER = API_OFFERS + "/get-form-info";

export const API_ADD_OFFER = API_OFFERS + "/new";
export const API_ADD_OFFER_DRAFT = API_OFFERS_DRAFT + "/new";

export const API_GET_OFFER_INFO = (id: string, tab: offerTabs) =>
  API_OFFERS + "/" + id + "/edit?tab=" + tab;
export const API_GET_OFFER_DRAFT_INFO = (id: string, tab: offerTabs) =>
  API_OFFERS_DRAFT + "/" + id + "/edit?tab=" + tab;

export const API_EDIT_OFFER = (id: string) => API_OFFERS + "/" + id + "/edit";

export const API_EDIT_OFFER_DRAFT = (id: string) =>
  API_OFFERS_DRAFT + "/" + id + "/edit";

export const API_OFFER_PUBLIC_OFFER_DRAFT = (id: string) =>
  API_OFFERS_DRAFT + "/" + id + "/public";

export const API_UPLOAD_OFFER_LOGO = (id: string, draft: boolean) =>
  (draft ? API_OFFERS_DRAFT : API_OFFERS) + "/" + id + "/update-logo";
export const API_DELETE_OFFER_LOGO = (id: string, draft: boolean) =>
  (draft ? API_OFFERS_DRAFT : API_OFFERS) + "/" + id + "/delete-logo";

export const API_OFFER_CARD_AFFILIATE_ENEBLED = (id: string, draft: boolean) =>
  (draft ? API_OFFERS_DRAFT : API_OFFERS) + "/" + id + "/enable-affiliate";
export const API_OFFER_CARD_AFFILIATE_DISABLED = (id: string, draft: boolean) =>
  (draft ? API_OFFERS_DRAFT : API_OFFERS) + "/" + id + "/disable-affiliate";
export const API_OFFER_CARD_AFFILIATE_ADD = (id: string, draft: boolean) =>
  (draft ? API_OFFERS_DRAFT : API_OFFERS) + "/" + id + "/add-affiliate";
export const API_OFFER_CARD_REQUESTS = (id: string | number) =>
  API_OFFERS + "/" + id + "/request";
export const API_OFFER_REQUESTS_STATUS = (
  offerId: string,
  reqId: string | number,
  status: "reject" | "accept"
) => API_OFFER_CARD_REQUESTS(offerId) + "/" + reqId + "/" + status;
