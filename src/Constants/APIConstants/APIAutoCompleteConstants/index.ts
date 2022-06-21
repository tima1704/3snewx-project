import Config from "Configs";
const host = Config.apiHost;

export const API_AC_COUNTRY = host + "/autocomplete/enum/country";
export const API_GET_TAGS = host + "/autocomplete/tag";
export const API_GET_ADVERTICER = host + "/autocomplete/advert";
export const API_GET_CATEGORIES = host + "/autocomplete/category";
export const API_GET_VENDORS = host + "/autocomplete/enum/vendor";
export const API_GET_OS = host + "/autocomplete/enum/os";
export const API_GET_AFFILIATES = host + "/autocomplete/affiliate";
export const API_AC_OFFERS = host + "/autocomplete/offer";
