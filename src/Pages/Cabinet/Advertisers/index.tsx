import { Redirect, Route, Switch } from "react-router-dom";
import {
  URL_ADVERTISERS,
  URL_ADVERTISERS_NEW,
  URL_ADVERTISERS_EDIT_$ID,
} from "Constants/URLConstants/URLCabinet/URLAdvertisers";

import AddAdvertisersPage from "./AddAdverisersPage";
import EditAdvertisersPages from "./EditAdvertisersPages";
import TableAdvertisers from "./TableAdvertisers";

export default function AdvertisersPages() {
  return (
    <div className={"wrapper"}>
      <Switch>
        <Route path={URL_ADVERTISERS} component={TableAdvertisers} exact />
        <Route path={URL_ADVERTISERS_NEW} component={AddAdvertisersPage} exact />
        <Route
          path={URL_ADVERTISERS_EDIT_$ID}
          component={EditAdvertisersPages}
        />
        <Redirect to={URL_ADVERTISERS} />
      </Switch>
    </div>
  );
}
