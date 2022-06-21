import { Redirect, Route, Switch } from "react-router";
import {
  URL_OFFERS,
  URL_OFFER_CARD,
  URL_OFFER_EDIT,
  URL_OFFER_NEW_GENERAL,
} from "Constants/URLConstants/URLCabinet/URLOffers";

import NewOffer from "../NewOffer";
import OfferCard from "../OfferCard";
import OffersList from "../OfferList";
import OffersEditMain from "../OffersEdit/Main";

export default function OffersMainPages() {
  return (
    <Switch>
      <Route path={URL_OFFERS} component={OffersList} exact />

      <Route path={URL_OFFER_CARD} component={OfferCard} exact />

      <Route path={URL_OFFER_NEW_GENERAL} component={NewOffer} exact />

      <Route path={URL_OFFER_EDIT} component={OffersEditMain} />

      <Redirect to={URL_OFFERS} />
    </Switch>
  );
}
