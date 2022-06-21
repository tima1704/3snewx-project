export const URL_ADVERTISERS = "/advertisers";

export const URL_ADVERTISERS_EDIT_$ID = URL_ADVERTISERS + "/edit/:id";

export const URL_ADVERTISERS_NEW = URL_ADVERTISERS + "/new/primary-info";

export const URL_ADVERTISERS_EDIT_$ID_PRIMARY_INFO =
  URL_ADVERTISERS_EDIT_$ID + "/primary-info";
export const URL_ADVERTISERS_EDIT_$ID_CONTACTS =
  URL_ADVERTISERS_EDIT_$ID + "/contacts";
export const URL_ADVERTISERS_EDIT_$ID_REQUISITES =
  URL_ADVERTISERS_EDIT_$ID + "/requisites";
export const URL_ADVERTISERS_EDIT_$ID_POSTBACKS =
  URL_ADVERTISERS_EDIT_$ID + "/postbacks";
export const URL_ADVERTISERS_EDIT_$ID_DOCUMENTS =
  URL_ADVERTISERS_EDIT_$ID + "/documents";
export const URL_ADVERTISERS_EDIT_$ID_NOTES =
  URL_ADVERTISERS_EDIT_$ID + "/notes";

export type TTabAdvertisers =
  | "primary-info"
  | "contacts"
  | "requisites"
  | "postbacks"
  | "documents"
  | "notes";

export const URL_ADVERTISERS_EDIT = (
  id: string | number,
  tab: TTabAdvertisers = "primary-info"
) => URL_ADVERTISERS + "/edit/" + id + "/" + tab;
