export interface IGeneralData {
  site_name: string;
  domain: string;
  default_language: string;
  timezone: string;
  country: string;
  city: string;
  zip_code: string;
  phone: string;
  email: string;
  show_commentator_name: boolean;
}

export enum EGeneralData {
  site_name = "site_name",
  domain = "domain",
  default_language = "default_language",
  timezone = "timezone",
  country = "country",
  city = "city",
  zip_code = "zip_code",
  phone = "phone",
  email = "email",
  show_commentator_name = "show_commentator_name",
}

export const initialDataGeneralSet: IGeneralData = {
  site_name: "",
  domain: "",
  city: "",
  default_language: "",
  timezone: "",
  country: "",
  zip_code: "",
  phone: "",
  email: "",
  show_commentator_name: false,
};
