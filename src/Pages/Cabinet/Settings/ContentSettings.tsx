import { Redirect, Route, Switch } from "react-router";

import {
  URL_CONTENT_SETTINGS_CATEGORIES,
  URL_CONTENT_SETTINGS_CURRENCIES,
  URL_CONTENT_SETTINGS_EMAIL_TEMPLATES,
  URL_CONTENT_SETTINGS_GOALS,
  URL_CONTENT_SETTINGS_MESSENGER,
  URL_CONTENT_SETTINGS_OFFERS_DESCRIPTION_TEMPLATES,
  URL_CONTENT_SETTINGS_OFFERS_GOAL_TEMPLATES,
  URL_CONTENT_SETTINGS_OFFERS_KPI_TEMPLATES,
  URL_CONTENT_SETTINGS_PAGES,
  URL_CONTENT_SETTINGS_PAYMENT_SYSTEM,
  URL_CONTENT_SETTINGS_TAGS,
  URL_CONTENT_SETTINGS_TICKETS_CATEGORIES,
  URL_CONTENT_SETTINGS_TRAFFIC_SOURCES,
} from "Constants/URLConstants/URLCabinet/URLSettings";
import CONTENT_SETTINGS_URL from "Components/Settings/ContentSettings/Constants";

import SettingsHeader from "Components/Settings/SettingsHeader";
import ContentSettingsTags from "Components/Settings/ContentSettings/ContSetTags";
import ContentSettingsGoals from "Components/Settings/ContentSettings/ContSetGoals";
import ContentCategories from "Components/Settings/ContentSettings/ContSetCategories";
import ContentSettingTrafficSources from "Components/Settings/ContentSettings/ContSetTrafficSources";
import ContSetTicketCategories from "Components/Settings/ContentSettings/ContSetTicketCategories";
import ContSetMessenger from "Components/Settings/ContentSettings/ContSetMessenger";
import ContSetPaymentSyst from "Components/Settings/ContentSettings/ContSetPaymentSyst";
import ContSetEmailTemplates from "Components/Settings/ContentSettings/ContSetEmailTemplates";
import ContSetCurrencies from "Components/Settings/ContentSettings/ContSetCurrencies";
import ContentSettingsOfferKPITemplate from "Components/Settings/ContentSettings/ContSetOffersKPITemplates";
import ContentSettingsOfferDescriptionsTemplate from "Components/Settings/ContentSettings/ContSetOffersDescriptionTemplates";
import ContentSettingsOfferGoalTemplate from "Components/Settings/ContentSettings/ContSetOffersGoalTemplates";

import styles from "Styles/pagesStyles/SettingsPages.module.css";

export default function ContentSettingsPages() {
  return (
    <section className={styles.ContentWrapper}>
      <SettingsHeader
        urlArray={CONTENT_SETTINGS_URL}
        title={"Content settings"}
      />
      <div>
        <Switch>
          <Route
            path={URL_CONTENT_SETTINGS_CATEGORIES}
            component={ContentCategories}
            exact
          />
          <Route
            path={URL_CONTENT_SETTINGS_PAYMENT_SYSTEM}
            component={ContSetPaymentSyst}
            exact
          />
          <Route
            path={URL_CONTENT_SETTINGS_TRAFFIC_SOURCES}
            component={ContentSettingTrafficSources}
            exact
          />
          <Route
            path={URL_CONTENT_SETTINGS_OFFERS_KPI_TEMPLATES}
            component={ContentSettingsOfferKPITemplate}
            exact
          />
          <Route
            path={URL_CONTENT_SETTINGS_OFFERS_DESCRIPTION_TEMPLATES}
            component={ContentSettingsOfferDescriptionsTemplate}
            exact
          />
          <Route
            path={URL_CONTENT_SETTINGS_OFFERS_GOAL_TEMPLATES}
            component={ContentSettingsOfferGoalTemplate}
            exact
          />
          <Route
            path={URL_CONTENT_SETTINGS_GOALS}
            component={ContentSettingsGoals}
            exact
          />
          <Route
            path={URL_CONTENT_SETTINGS_CURRENCIES}
            component={ContSetCurrencies}
            exact
          />
          <Route
            path={URL_CONTENT_SETTINGS_EMAIL_TEMPLATES}
            component={ContSetEmailTemplates}
            exact
          />
          <Route
            path={URL_CONTENT_SETTINGS_TAGS}
            component={ContentSettingsTags}
            exact
          />
          <Route
            path={URL_CONTENT_SETTINGS_TICKETS_CATEGORIES}
            component={ContSetTicketCategories}
            exact
          />
          <Route
            path={URL_CONTENT_SETTINGS_MESSENGER}
            component={ContSetMessenger}
            exact
          />
          <Redirect to={URL_CONTENT_SETTINGS_PAGES} />
        </Switch>
      </div>
    </section>
  );
}
