import { Redirect, Route, Switch } from "react-router";
import {
  URL_OFFERS_DRAFT,
  URL_OFFERS_DRAFT_CARD,
  URL_OFFERS_DRAFT_EDIT,
  URL_OFFERS_DRAFT_NEW_GENERAL,
} from "Constants/URLConstants/URLCabinet/URLOffers";

import NewOffer from "../NewOffer";
import OfferCard from "../OfferCard";
import OffersList from "../OfferList";
import OffersEditDraft from "../OffersEdit/Draft";

export default function OfferDraftPages() {
  return (
    <Switch>
      <Route path={URL_OFFERS_DRAFT} children={<OffersList draft />} exact />

      <Route
        path={URL_OFFERS_DRAFT_CARD}
        children={<OfferCard draft />}
        exact
      />

      <Route
        path={URL_OFFERS_DRAFT_NEW_GENERAL}
        children={<NewOffer draft />}
        exact
      />

      <Route path={URL_OFFERS_DRAFT_EDIT} component={OffersEditDraft} />

      <Redirect to={URL_OFFERS_DRAFT} />
    </Switch>
  );
}
