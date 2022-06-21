import {
  AffiliateAction,
  AffiliateActionTypes,
  IAffiliateState,
} from "./types";

const initialState: IAffiliateState = {
  activeAffiliate: {},
};

export default function AffiliateReducer(
  state: IAffiliateState = initialState,
  action: AffiliateAction
): IAffiliateState {
  switch (action.type) {
    case AffiliateActionTypes.FILL_AFFILIATE_LIST:
      return { ...state, affiliateList: action.payload };

    case AffiliateActionTypes.FILL_AFFILIATE:
      return {
        ...state,
        activeAffiliate: {
          ...state.activeAffiliate,
          [action.id]: {
            ...state.activeAffiliate[action.id],
            primaryInfo: action.payload,
          },
        },
      };

    case AffiliateActionTypes.FILL_AFFILIATE_PAYMENT:
      return {
        ...state,
        activeAffiliate: {
          ...state.activeAffiliate,
          [action.id]: {
            ...state.activeAffiliate[action.id],
            paymentInfo: action.payload,
          },
        },
      };

    case AffiliateActionTypes.FILL_MAIN_INFO_AFFILIATE:
      return { ...state, mainInfo: action.payload };

    case AffiliateActionTypes.FILL_AFFILIATE_AVAILABLE_PAYMENT:
      return { ...state, availablePayment: action.payload };

    case AffiliateActionTypes.RESET_AFFILIATE_STATE:
      return initialState;

    default:
      return state;
  }
}

