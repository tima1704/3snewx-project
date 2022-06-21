import React from "react";
import { Redirect, Route, Switch } from "react-router";

import {
  URL_NEW_TICKETS,
  URL_TICKETS,
  URL_TICKETS_$ID,
} from "Constants/URLConstants/URLCabinet/URLTickets";

import TicketsEditPage from "./TicketsEdit";
import TicketsListPage from "./TicketsList/index";
import TicketsNewPage from "./TicketsNew";

export default function TicketsPages() {
  return (
    <Switch>
      <Route path={URL_TICKETS} component={TicketsListPage} exact />
      <Route path={URL_NEW_TICKETS} component={TicketsNewPage} exact />
      <Route path={URL_TICKETS_$ID} component={TicketsEditPage} exact />
      <Redirect to={URL_TICKETS} />
    </Switch>
  );
}
