import { Dispatch } from "redux";
import { IFilterOffers } from "../../Components/Offers/OffersMiniComponents/HeaderFilter/types";
import {
  fetchAffiliateDisabled,
  fetchAffiliateEnebled,
  fetchOffersList,
  fetchOffersMainInfo,
  fetchRequestsOfferCard,
} from "../../Helpers/api/Offers";
import {
  IErrorsOfferTabs,
  OffersAction,
  OffersActionTypes,
  resetErroresOffers,
} from "./types";

import { RootState } from "../RootReducer";
import { IValidError } from "../../Types";

export const fetchOffersListDispatch = (
  offerDraft: boolean = false,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => async (dispatch: Dispatch<OffersAction>, getState: () => RootState) => {
  if (setLoading) {
    setLoading(true);
  }

  dispatch({ type: OffersActionTypes.FETCH_OFFERS_LIST });

  const filter = getState().Offers.filter;

  fetchOffersList(offerDraft, filter).then((res) => {
    dispatch({
      type: OffersActionTypes.FILL_OFFERS_LIST,
      payload: res.data,
    });
    if (setLoading) {
      setLoading(false);
    }
  });
};

export const fetchMainInfoFormOffer = () => async (
  dispatch: Dispatch<OffersAction>
) => {
  fetchOffersMainInfo().then((res) => {
    dispatch({
      type: OffersActionTypes.FILL_OFFER_MAIN_INFO,
      payload: res.data,
    });
  });
};

export const onSetFilterOffers = (filterData: IFilterOffers): OffersAction => {
  return {
    type: OffersActionTypes.SET_FILTER_OFFERS,
    payload: filterData,
  };
};

export const resetFilterOffers = (): OffersAction => {
  return {
    type: OffersActionTypes.RESET_FILTER_OFFFERS,
  };
};

export const fillErrorsOffers = (
  tab: keyof IErrorsOfferTabs,
  errors: IValidError[]
): OffersAction => ({
  type: OffersActionTypes.FILL_OFFERS_ERROR,
  tab,
  payload: errors,
});

export const fillFullErrorsOffers = (
  errorsTab?: IErrorsOfferTabs
): OffersAction => {
  if (errorsTab) {
    return {
      type: OffersActionTypes.FILL_FULL_OFFERS_ERROR,
      payload: errorsTab,
    };
  } else {
    return {
      type: OffersActionTypes.FILL_FULL_OFFERS_ERROR,
      payload: resetErroresOffers,
    };
  }
};

export const fetchOffersAffiliatesEnebled = (
  id: string,
  draft: boolean,
  filter?: any,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => async (dispatch: Dispatch<OffersAction>) => {
  dispatch({ type: OffersActionTypes.FETCH_AFFILIATES_ENEBLED });
  if (setLoading) {
    setLoading(true);
  }

  fetchAffiliateEnebled(id, draft, filter).then((res) => {
    dispatch({
      type: OffersActionTypes.FILL_AFFILIATES_ENEBLED,
      payload: res.data.data,
    });
    if (setLoading) {
      setLoading(false);
    }
  });
};

export const fetchOffersAffiliatesDisabled = (
  id: string,
  draft: boolean,
  filter?: any,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => async (dispatch: Dispatch<OffersAction>) => {
  dispatch({ type: OffersActionTypes.FETCH_AFFILIATES_DISABLED });
  if (setLoading) {
    setLoading(true);
  }

  fetchAffiliateDisabled(id, draft, filter).then((res) => {
    dispatch({
      type: OffersActionTypes.FILL_AFFILIATES_DISABLED,
      payload: res.data.data,
    });
    if (setLoading) {
      setLoading(false);
    }
  });
};

export const fetchOffersCardRequests = (
  id: string,
  filter?: object,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => async (dispatch: Dispatch<OffersAction>) => {
  dispatch({ type: OffersActionTypes.FETCH_REQUESTS_CARD });
  if (setLoading) {
    setLoading(true);
  }

  fetchRequestsOfferCard(id, filter).then((data) => {
    dispatch({
      type: OffersActionTypes.FILL_REQUESTS_CARD,
      payload: data,
    });
    if (setLoading) {
      setLoading(false);
    }
  });
};
