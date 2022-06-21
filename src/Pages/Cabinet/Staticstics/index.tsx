import { Redirect, Route, Switch } from "react-router-dom";
import { NavigationTabs } from "Components/MiniComponents";

import { URLS_STATISTICKS } from "Components/Statisticks/constants";
import PageItemStatistics from "./PageItem";

export default function StaticstisPages() {
  return (
    <div className="wrapper">
      <NavigationTabs items={URLS_STATISTICKS} />
      <Switch>
        {URLS_STATISTICKS.map((statItem, index) => (
          <Route path={statItem.to} exact key={index + statItem.tab}>
            <PageItemStatistics tab={statItem.tab} />
          </Route>
        ))}
        <Redirect to={URLS_STATISTICKS[0].to} />
      </Switch>
    </div>
  );
}
