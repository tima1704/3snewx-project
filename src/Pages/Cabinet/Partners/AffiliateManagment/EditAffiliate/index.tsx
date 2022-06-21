import { useEffect, useMemo } from "react";

import { useAppDispatch } from "Hooks";

import { Redirect, Route, Switch, useParams } from "react-router-dom";
import {
  URL_PARTNERS_MANAGMENT_AFFILIATES,
  URL_PARTNERS_MANAGMENT_AFFILIATES_ID_PRIMARY_INFO,
  URL_PARTNERS_MANAGMENT_AFFILIATES_ID_PAYMENT_METHOD,
} from "Constants/URLConstants/URLCabinet/URLPartners";

import PrimaryInfoAffiliate from "Components/Partners/AffiliateManagment/PrimaryInfoTab";
import PaymentTabAffiliate from "Components/Partners/AffiliateManagment/PaymentTab";
import NavigationTabs from "Components/MiniComponents/NavigationTabs";

import { TabItemProps } from "Components/MiniComponents/NavigationTabs/TabItem";

interface IParams {
  id: string;
}

export default function EditAffiliatePages() {
  const { fetchAffiliate } = useAppDispatch();

  const id = useParams<IParams>().id;

  useEffect(() => {
    fetchAffiliate(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const navigationTabs = useMemo<TabItemProps[]>(() => {
    return [
      {
        title: "Primary Info",
        to: URL_PARTNERS_MANAGMENT_AFFILIATES(id, "primary-info"),
        includes: URL_PARTNERS_MANAGMENT_AFFILIATES(id, "primary-info"),
      },
      {
        title: "Payment method",
        to: URL_PARTNERS_MANAGMENT_AFFILIATES(id, "payment-method"),
        includes: URL_PARTNERS_MANAGMENT_AFFILIATES(id, "payment-method"),
      },
    ];
  }, [id]);

  return (
    <div>
      <h1 className="title">Edit Affiliate ID {id}</h1>
      <NavigationTabs items={navigationTabs} />
      <Switch>
        <Route path={URL_PARTNERS_MANAGMENT_AFFILIATES_ID_PRIMARY_INFO}>
          <PrimaryInfoAffiliate id={id} />
        </Route>

        <Route path={URL_PARTNERS_MANAGMENT_AFFILIATES_ID_PAYMENT_METHOD}>
          <PaymentTabAffiliate id={id} />
        </Route>

        <Redirect to={URL_PARTNERS_MANAGMENT_AFFILIATES(id, "primary-info")} />
      </Switch>
    </div>
  );
}
