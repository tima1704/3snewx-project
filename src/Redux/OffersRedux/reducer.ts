import {
  IOffersState,
  OffersAction,
  OffersActionTypes,
  resetErroresOffers,
} from "./types";

const initialState: IOffersState = {
  list: [],
  offerEdit: {},
  mainInfo: {},
  errors: resetErroresOffers,
  offerCard: {},
};

export default function OffersReducer(
  state: IOffersState = initialState,
  action: OffersAction
): IOffersState {
  switch (action.type) {
    case OffersActionTypes.FILL_OFFER_MAIN_INFO:
      const trafficSourcesValues = Object.values(
        action.payload.trafficSources || {}
      );
      const trafficSourcesKey = Object.keys(
        action.payload.trafficSources || {}
      );

      return {
        ...state,
        mainInfo: {
          ...action.payload,
          trafficSources: trafficSourcesValues.map((el, index) => {
            return { id: trafficSourcesKey[index], text: el };
          }),
        },
      };

    case OffersActionTypes.FILL_OFFERS_LIST:
      return {
        ...state,
        list: action.payload.offers,
        pageMeta: action.payload.meta,
      };

    case OffersActionTypes.SET_FILTER_OFFERS:
      return { ...state, filter: action.payload };

    case OffersActionTypes.RESET_FILTER_OFFFERS:
      return { ...state, filter: undefined, pageMeta: undefined };

    case OffersActionTypes.FILL_OFFERS_ERROR:
      return {
        ...state,
        errors: { ...state.errors, [action.tab]: action.payload },
      };

    case OffersActionTypes.FILL_FULL_OFFERS_ERROR:
      return { ...state, errors: action.payload };

    case OffersActionTypes.FILL_AFFILIATES_ENEBLED:
      return {
        ...state,
        offerCard: { ...state.offerCard, enableAffiliates: action.payload },
      };

    case OffersActionTypes.FILL_AFFILIATES_DISABLED:
      return {
        ...state,
        offerCard: { ...state.offerCard, disableAffiliates: action.payload },
      };

    case OffersActionTypes.FILL_REQUESTS_CARD:
      return {
        ...state,
        offerCard: { ...state.offerCard, requests: action.payload },
      };

    default:
      return state;
  }
}
