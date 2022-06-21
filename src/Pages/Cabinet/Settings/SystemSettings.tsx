import classNames from "classnames";

import { Redirect, Route, Switch } from "react-router";

import {
  URL_SYSTEM_SETTINGS_EMAIL,
  URL_SYSTEM_SETTINGS_GENERAL,
  URL_SYSTEM_SETTINGS_SECURITY,
  URL_SYSTEM_SETTINGS_TRACKING_DOMAINS,
  URL_SYSTEM_SETTINGS_TRAFFICBACK,
  URL_SYSTEM_SETTINGS_URLS,
} from "Constants/URLConstants/URLCabinet/URLSettings";
import SYSTEM_SETTINGS_URL from "Components/Settings/SystemSettings/Constants";

import SettingsHeader from "Components/Settings/SettingsHeader";
import SystemSettingsGeneralTab from "Components/Settings/SystemSettings/SysSetGeneralTab";
import SysSetEmailTab from "Components/Settings/SystemSettings/SysSetEmailTab";
import SysSetTrafficbackTab from "Components/Settings/SystemSettings/SysSetTrafficbackTab";
import SysSetSecurity from "Components/Settings/SystemSettings/SysSetSecurity";
import SysSetDomains from "Components/Settings/SystemSettings/SysSetDomains";
import SysSetUrls from "Components/Settings/SystemSettings/SysSetUrls";

import styles from "Styles/pagesStyles/SettingsPages.module.css";

export default function SystemSettingsPages() {
  return (
    <section
      className={classNames(styles.ContentWrapper, styles.ContentWrapperPages)}
    >
      <SettingsHeader
        urlArray={SYSTEM_SETTINGS_URL}
        title={"System settings"}
      />
      <Switch>
        <Route
          path={URL_SYSTEM_SETTINGS_GENERAL}
          component={SystemSettingsGeneralTab}
          exact
        />
        <Route
          path={URL_SYSTEM_SETTINGS_TRACKING_DOMAINS}
          component={SysSetDomains}
          exact
        />
        <Route path={URL_SYSTEM_SETTINGS_URLS} component={SysSetUrls} exact />
        <Route
          path={URL_SYSTEM_SETTINGS_EMAIL}
          component={SysSetEmailTab}
          exact
        />
        <Route
          path={URL_SYSTEM_SETTINGS_TRAFFICBACK}
          component={SysSetTrafficbackTab}
          exact
        />
        <Route
          path={URL_SYSTEM_SETTINGS_SECURITY}
          component={SysSetSecurity}
          exact
        />
        <Redirect to={URL_SYSTEM_SETTINGS_GENERAL} />
      </Switch>
    </section>
  );
}
