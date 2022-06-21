import Config from "Configs";
const { apiHost } = Config;

export const API_AFFILIATES = apiHost + "/affiliate";
export const API_AFFILIATE_MAIN_INFO = API_AFFILIATES + "/get-form-info";

export const API_AFFILIATE_ID = (id: string) => API_AFFILIATES + "/" + id;

export const API_AFFILIATE_NEW = API_AFFILIATES + "/new";
export const API_AFFILIATE_EDIT_ID = (id: string) =>
  API_AFFILIATE_ID(id) + "/edit";

export const API_AFFILIATE_AVAILABLE_PAYMENT =
  API_AFFILIATES + "/get-available-payments";
export const API_AFFILIATE_PAYMENT_INFO = (id: string) =>
  API_AFFILIATES + "/" + id + "/payment";
export const API_AFFILIATE_PAYMENT_METHOD_SAVE = (id: string) =>
  API_AFFILIATES + "/" + id + "/payment/add";
export const API_AFFILIATE_DELETE_PAYMENT_METHOD = (
  idAffiliate: string,
  idMethod: string
) => API_AFFILIATES + "/" + idAffiliate + "/payment/" + idMethod;
