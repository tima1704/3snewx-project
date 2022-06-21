// offer Main
export const URL_OFFER = "/offer";

export const URL_OFFERS = URL_OFFER + "/main";
export const URL_OFFERS_DRAFT = URL_OFFER + "/draft";

// offers
export const URL_OFFER_CARD = URL_OFFERS + "/:id";
export const URL_OFFER_CARD_ID = (id: number | string) => URL_OFFERS + `/${id}`;

export const URL_OFFER_NEW_GENERAL = URL_OFFERS + "/new/general";

export const URL_OFFER_EDIT = URL_OFFERS + "/:id/edit",
  URL_OFFER_EDIT_GENERAL = URL_OFFERS + "/:id/edit/general",
  URL_OFFER_EDIT_TRACKING = URL_OFFERS + "/:id/edit/tracking",
  URL_OFFER_EDIT_TARGETING = URL_OFFERS + "/:id/edit/targeting",
  URL_OFFER_EDIT_AFFILIATES = URL_OFFERS + "/:id/edit/affiliates",
  URL_OFFER_EDIT_POSTBACKS = URL_OFFERS + "/:id/edit/postbacks",
  URL_OFFER_EDIT_PAYOUTS = URL_OFFERS + "/:id/edit/payouts",
  URL_OFFER_EDIT_CAPS = URL_OFFERS + "/:id/edit/caps",
  URL_OFFER_EDIT_CREATIVES = URL_OFFERS + "/:id/edit/creatives";

// offers Draft
export const URL_OFFERS_DRAFT_CARD = URL_OFFERS_DRAFT + "/:id";
export const URL_OFFERS_DRAFT_CARD_ID = (id: number | string) =>
  URL_OFFERS_DRAFT + `/${id}`;

export const URL_OFFERS_DRAFT_NEW_GENERAL = URL_OFFERS_DRAFT + "/new/general";

export const URL_OFFERS_DRAFT_EDIT = URL_OFFERS_DRAFT + "/:id/edit",
  URL_OFFERS_DRAFT_EDIT_GENERAL = URL_OFFERS_DRAFT + "/:id/edit/general",
  URL_OFFERS_DRAFT_EDIT_TRACKING = URL_OFFERS_DRAFT + "/:id/edit/tracking",
  URL_OFFERS_DRAFT_EDIT_TARGETING = URL_OFFERS_DRAFT + "/:id/edit/targeting",
  URL_OFFERS_DRAFT_EDIT_AFFILIATES = URL_OFFERS_DRAFT + "/:id/edit/affiliates",
  URL_OFFERS_DRAFT_EDIT_POSTBACKS = URL_OFFERS_DRAFT + "/:id/edit/postbacks",
  URL_OFFERS_DRAFT_EDIT_PAYOUTS = URL_OFFERS_DRAFT + "/:id/edit/payouts",
  URL_OFFERS_DRAFT_EDIT_CAPS = URL_OFFERS_DRAFT + "/:id/edit/caps",
  URL_OFFERS_DRAFT_EDIT_CREATIVES = URL_OFFERS_DRAFT + "/:id/edit/creatives";

export const URL_OFFERS_EDIT_TAB = (
  draft = false,
  id = "new",
  tab = "general"
) =>
  `${draft ? URL_OFFERS_DRAFT : URL_OFFERS}/${
    id === "new" ? "new/general" : id + "/edit/" + tab
  }`;
