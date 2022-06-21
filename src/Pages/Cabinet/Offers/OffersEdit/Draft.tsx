import { useEffect } from "react";
import { Redirect, Route, Switch, useParams } from "react-router";

import {
  URL_OFFERS_DRAFT_EDIT_AFFILIATES,
  URL_OFFERS_DRAFT_EDIT_CAPS,
  URL_OFFERS_DRAFT_EDIT_GENERAL,
  URL_OFFERS_DRAFT_EDIT_PAYOUTS,
  URL_OFFERS_DRAFT_EDIT_POSTBACKS,
  URL_OFFERS_DRAFT_EDIT_TARGETING,
  URL_OFFERS_DRAFT_EDIT_TRACKING,
} from "Constants/URLConstants/URLCabinet/URLOffers";

import AEOfferHeader from "Components/Offers/OffersMiniComponents/AEOfferHeader";
import AEOfferGeneralTab from "Components/Offers/AEOfferTabs/AEOfferGeneralTab";
import AEOfferTrackingTab from "Components/Offers/AEOfferTabs/AEOfferTrackingTab";
import AEOfferPostbacksTab from "Components/Offers/AEOfferTabs/AEOfferPostbacksTab";
import AEOfferAffiliateTab from "Components/Offers/AEOfferTabs/AEOfferAffiliatesTab";
import AEOfferCapsTab from "Components/Offers/AEOfferTabs/AEOfferCapsTab";
import AEOfferTargetingTab from "Components/Offers/AEOfferTabs/AEOfferTargetingTab";
import AEOfferPayoutsTab from "Components/Offers/AEOfferTabs/AEOfferPayoutsTab";

import { useAppDispatch } from "Hooks";

import styles from "Components/Offers/AEOfferTabs/Styles/index.module.css";

export default function OffersEditDraft() {
  const id = useParams<{ id: string }>().id;

  const { fillFullErrorsOffers } = useAppDispatch();

  useEffect(() => {
    return () => {
      fillFullErrorsOffers();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <section className={styles.ContentWrapper}>
      <AEOfferHeader className={styles.ContentWrapperMain} id={id} draft />
      <Switch>
        <Route
          path={URL_OFFERS_DRAFT_EDIT_GENERAL}
          children={<AEOfferGeneralTab draft id={id} newStatus={false} />}
          exact
        />

        <Route
          path={URL_OFFERS_DRAFT_EDIT_TRACKING}
          children={<AEOfferTrackingTab draft id={id} />}
          exact
        />

        <Route
          path={URL_OFFERS_DRAFT_EDIT_TARGETING}
          children={<AEOfferTargetingTab draft id={id} />}
          exact
        />

        <Route
          path={URL_OFFERS_DRAFT_EDIT_AFFILIATES}
          children={<AEOfferAffiliateTab draft id={id} />}
          exact
        />

        <Route
          path={URL_OFFERS_DRAFT_EDIT_POSTBACKS}
          children={<AEOfferPostbacksTab draft id={id} />}
          exact
        />

        <Route
          path={URL_OFFERS_DRAFT_EDIT_PAYOUTS}
          children={<AEOfferPayoutsTab draft id={id} />}
          exact
        />

        <Route
          path={URL_OFFERS_DRAFT_EDIT_CAPS}
          children={<AEOfferCapsTab draft id={id} />}
          exact
        />

        <Redirect to={URL_OFFERS_DRAFT_EDIT_GENERAL} />
      </Switch>
    </section>
  );
}
