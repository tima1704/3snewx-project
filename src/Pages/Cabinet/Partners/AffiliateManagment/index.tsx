import { Redirect, Route, Switch } from "react-router-dom";
import {
  URL_PARTNERS_MANAGMENT,
  URL_PARTNERS_MANAGMENT_AFFILIATES_$ID,
  URL_PARTNERS_MANAGMENT_NEW,
} from "Constants/URLConstants/URLCabinet/URLPartners";

import AffiliateMangmentTable from "./AffiliateMangmentTable";
import NewAffiliate from "./AffilaiteNew";

import EditAffiliatePages from "./EditAffiliate";
import { useEffect } from "react";
import { useAppDispatch } from "Hooks";

export default function AffiliateManagmentPages() {
  const { fetchMainInfoAffiliate } = useAppDispatch();
  useEffect(() => {
    fetchMainInfoAffiliate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Switch>
      <Route
        path={URL_PARTNERS_MANAGMENT}
        component={AffiliateMangmentTable}
        exact
      />
      <Route path={URL_PARTNERS_MANAGMENT_NEW} component={NewAffiliate} exact />

      <Route
        path={URL_PARTNERS_MANAGMENT_AFFILIATES_$ID}
        component={EditAffiliatePages}
      />

      <Redirect to={URL_PARTNERS_MANAGMENT} />
    </Switch>
  );
}
