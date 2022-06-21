import { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router";
import {
  URL_OFFERS,
  URL_OFFERS_DRAFT,
} from "Constants/URLConstants/URLCabinet/URLOffers";
import { useAppDispatch } from "Hooks";
import OfferDraftPages from "./OffersDraft";
import OffersMainPages from "./OffersMain";

export default function OffersPages() {
  const { fetchMainInfoFormOffer } = useAppDispatch();

  useEffect(() => {
    fetchMainInfoFormOffer(); // Загрузка Основной инфы для начала работы с офферами

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <Switch>
      <Route path={URL_OFFERS} component={OffersMainPages} />
      <Route path={URL_OFFERS_DRAFT} component={OfferDraftPages} />

      <Redirect to={URL_OFFERS} />
    </Switch>
  );
}
