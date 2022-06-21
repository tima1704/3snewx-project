import { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router";
import {
  URL_CONTENT_SETTINGS,
  URL_SETTINGS,
  URL_SYSTEM_SETTINGS,
} from "Constants/URLConstants/URLCabinet/URLSettings";

import { useAppDispatch } from "Hooks";

import ContentSettingsPages from "./ContentSettings";
import ListSettings from "./ListSettings";
import SystemSettingsPages from "./SystemSettings";

export default function SettingsPages() {
  const { settingsReset } = useAppDispatch();
  useEffect(() => {
    return () => {
      settingsReset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Switch>
      <Route path={URL_SETTINGS} component={ListSettings} exact />
      <Route path={URL_SYSTEM_SETTINGS} component={SystemSettingsPages} />
      <Route path={URL_CONTENT_SETTINGS} component={ContentSettingsPages} />
      <Redirect to={URL_SETTINGS} />
    </Switch>
  );
}
