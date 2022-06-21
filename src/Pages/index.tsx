import { Redirect, Route, Switch } from "react-router-dom";

import { useAppSelector } from "Hooks";

import AdvertisersPages from "./Cabinet/Advertisers";
import BillingAffiliatesPages from "./Cabinet/Billings";
import ConversionsPages from "./Cabinet/Conversions";
import dashboardPage from "./Cabinet/Dashboard";
import NewsPage from "./Cabinet/News";
import OffersPages from "./Cabinet/Offers";
import PartnersPage from "./Cabinet/Partners";
import SettingsPages from "./Cabinet/Settings";
import StaticstisPages from "./Cabinet/Staticstics";
import TasksPages from "./Cabinet/Tasks";
import TicketsPages from "./Cabinet/Tickets";
import UsersPages from "./Cabinet/Users";
import ErrorsPages from "./ErrorsPages";
import { URL_HOME, URL_NEWS } from "Constants/URLConstants";
import {
  URL_ADVERTISERS,
  URL_BILLING,
  URL_CONVERSIONS,
  URL_OFFER,
  URL_PARTNERS,
  URL_SETTINGS,
  URL_STATISTICS,
  URL_TASKS,
  URL_TICKETS,
  URL_USERS,
} from "Constants/URLConstants/URLCabinet";

export default function PagesCabinet() {
  const errorPageState = useAppSelector((state) => state.App.errorPage);

  return (
    <div>
      {errorPageState ? (
        <ErrorsPages errorPage={errorPageState} />
      ) : (
        <Switch>
          <Route path={URL_HOME} component={dashboardPage} exact />
          <Route
            path={URL_STATISTICS.URL_STATISTICS}
            component={StaticstisPages}
          />
          <Route
            path={URL_ADVERTISERS.URL_ADVERTISERS}
            component={AdvertisersPages}
          />
          <Route path={URL_SETTINGS.URL_SETTINGS} component={SettingsPages} />
          <Route path={URL_OFFER.URL_OFFER} component={OffersPages} />
          <Route path={URL_PARTNERS.URL_PARTNERS} component={PartnersPage} />
          <Route path={URL_TICKETS.URL_TICKETS} component={TicketsPages} />
          <Route path={URL_USERS.URL_USERS} component={UsersPages} />
          <Route
            path={URL_BILLING.URL_BILLING}
            component={BillingAffiliatesPages}
          />
          <Route path={URL_TASKS.URL_TASKS} component={TasksPages} />
          <Route path={URL_NEWS} component={NewsPage} />
          <Route
            path={URL_CONVERSIONS.URL_CONVERSIONS}
            component={ConversionsPages}
            exact
          />
          <Redirect to={URL_HOME} />
        </Switch>
      )}
    </div>
  );
}
