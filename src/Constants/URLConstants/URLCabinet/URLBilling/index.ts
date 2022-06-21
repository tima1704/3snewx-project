export const URL_BILLING: string = "/billing";

// billing affiliates
export const URL_BILLING_AFFILIATES: string = URL_BILLING + "/affiliates";
export const URL_BILLING_AFFILIATES_EXPORT: string =
  URL_BILLING_AFFILIATES + "/export";
export const URL_BILLING_AFF_CREATE_INVOICE: string =
  URL_BILLING_AFFILIATES + "/create-invoice";

export const URL_BILLING_AFF_INVOICE_$ID: string =
  URL_BILLING_AFFILIATES + "/invoice/:id";
export const URL_BILLING_AFF_INVOICE_$ID_PRIMARY_INFO: string =
  URL_BILLING_AFF_INVOICE_$ID + "/primary-info";
export const URL_BILLING_AFF_INVOICE_$ID_OFFER_DETAILS: string =
  URL_BILLING_AFF_INVOICE_$ID + "/offer-details";
export const URL_BILLING_AFF_INVOICE_$ID_CONVERSION_LIST: string =
  URL_BILLING_AFF_INVOICE_$ID + "/conversion-list";

export const URL_BILLING_AFF_INVOICE_ID = (id: number | string): string =>
  URL_BILLING_AFFILIATES + "/invoice/" + id;
export const URL_BILLING_AFF_INVOICE_ID_PRIMARY_INFO = (
  id: number | string
): string => URL_BILLING_AFF_INVOICE_ID(id) + "/primary-info";
export const URL_BILLING_AFF_INVOICE_ID_OFFER_DETAILS = (
  id: number | string
): string => URL_BILLING_AFF_INVOICE_ID(id) + "/offer-details";
export const URL_BILLING_AFF_INVOICE_ID_CONVERSION_LIST = (
  id: number | string
): string => URL_BILLING_AFF_INVOICE_ID(id) + "/conversion-list";
