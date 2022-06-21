import React from "react";
import { Switch, Route, Redirect } from "react-router";

import {
  URL_BILLING_AFFILIATES,
  URL_BILLING_AFFILIATES_EXPORT,
  URL_BILLING_AFF_CREATE_INVOICE,
  URL_BILLING_AFF_INVOICE_$ID_CONVERSION_LIST,
  URL_BILLING_AFF_INVOICE_$ID_OFFER_DETAILS,
  URL_BILLING_AFF_INVOICE_$ID_PRIMARY_INFO,
} from "Constants/URLConstants/URLCabinet/URLBilling";

import BillingAffiliatesCreateInvoice from "Components/Billings/BillingAffiliates/CreateInvoice";
import BillingAffiliatesInvoiceEditPrimaryInfo from "Components/Billings/BillingAffiliates/InvoiceEdit/PrimaryInfo";
import BillingAffiliatesInvoiceEditOfferDetails from "Components/Billings/BillingAffiliates/InvoiceEdit/OfferDetails";
import BillingAffiliatesInvoiceEditConversionList from "Components/Billings/BillingAffiliates/InvoiceEdit/ConversionsList";
import BillingAffiliatesTable from "Components/Billings/BillingAffiliates/Table";
import BillingAffiliatesExport from "Components/Billings/BillingAffiliates/Export";

export default function BillingAffiliatesPages() {
  return (
    <Switch>
      <Route
        path={URL_BILLING_AFFILIATES}
        component={BillingAffiliatesTable}
        exact
      />

      <Route
        path={URL_BILLING_AFFILIATES_EXPORT}
        component={BillingAffiliatesExport}
        exact
      />

      <Route
        path={URL_BILLING_AFF_CREATE_INVOICE}
        component={BillingAffiliatesCreateInvoice}
        exact
      />

      <Route
        path={URL_BILLING_AFF_INVOICE_$ID_PRIMARY_INFO}
        exact
        component={BillingAffiliatesInvoiceEditPrimaryInfo}
      />

      <Route
        path={URL_BILLING_AFF_INVOICE_$ID_OFFER_DETAILS}
        exact
        component={BillingAffiliatesInvoiceEditOfferDetails}
      />

      <Route
        path={URL_BILLING_AFF_INVOICE_$ID_CONVERSION_LIST}
        exact
        component={BillingAffiliatesInvoiceEditConversionList}
      />

      <Redirect to={URL_BILLING_AFFILIATES} />
    </Switch>
  );
}
