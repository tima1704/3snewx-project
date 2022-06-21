import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import {
  URL_PARTNERS,
  URL_PARTNERS_AFFILIATES_AN_AUTH_LOG,
  URL_PARTNERS_MANAGMENT,
  URL_PARTNERS_TESTING_LINKS,
  URL_PARTNERS_TOP_AFFILIATES,
} from "Constants/URLConstants/URLCabinet/URLPartners";

import AffiliatesAnAuthLog from "./AffiliatesAnAuthLog";
import PartnersRouteList from "./RouteList";
import TestingLinks from "./TestingLinks";
import TopAffiliatesPage from "./TopAffiliate";
import AffiliateManagmentPages from "./AffiliateManagment";

import { useAppDispatch } from "Hooks";

import styles from "Styles/pagesStyles/PartnersPages.module.css";

export default function PartnersPage() {
  const { resetAffiliateState } = useAppDispatch();

  useEffect(() => {
    return () => {
      resetAffiliateState();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.ContentWrapper}>
      <Switch>
        <Route
          path={URL_PARTNERS_MANAGMENT}
          component={AffiliateManagmentPages}
        />
        <Route
          path={URL_PARTNERS_AFFILIATES_AN_AUTH_LOG}
          component={AffiliatesAnAuthLog}
        />
        <Route
          path={URL_PARTNERS_TESTING_LINKS}
          component={TestingLinks}
          exact
        />
        <Route
          path={URL_PARTNERS_TOP_AFFILIATES}
          component={TopAffiliatesPage}
          exact
        />
        <Route path={URL_PARTNERS} component={PartnersRouteList} exact />
        <Redirect to={URL_PARTNERS} />
      </Switch>
    </div>
  );
}
