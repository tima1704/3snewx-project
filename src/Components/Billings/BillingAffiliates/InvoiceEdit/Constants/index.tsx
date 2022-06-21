import { URL_BILLING } from "Constants/URLConstants/URLCabinet";

export const InvoicePages = (id: string | number) => [
  {
    title: "Primary Info",
    to: URL_BILLING.URL_BILLING_AFF_INVOICE_ID_PRIMARY_INFO(id),
    includes: URL_BILLING.URL_BILLING_AFF_INVOICE_ID_PRIMARY_INFO(id),
  },
  {
    title: "Offer details",
    to: URL_BILLING.URL_BILLING_AFF_INVOICE_ID_OFFER_DETAILS(id),
    includes: URL_BILLING.URL_BILLING_AFF_INVOICE_ID_OFFER_DETAILS(id),
  },
  {
    title: "Conversion list",
    to: URL_BILLING.URL_BILLING_AFF_INVOICE_ID_CONVERSION_LIST(id),
    includes: URL_BILLING.URL_BILLING_AFF_INVOICE_ID_CONVERSION_LIST(id),
  },
];
