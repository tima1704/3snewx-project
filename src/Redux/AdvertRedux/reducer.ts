import { initialStateActiveAdvert } from "../../Components/Advertisers/AddEditAdvertisers/constants";
import { AdvertActions, AdvertActionTypes, IAdvertState } from "./types";

const initialState: IAdvertState = {};

export default function AdvertReducer(
  state: IAdvertState = initialState,
  action: AdvertActions
): IAdvertState {
  switch (action.type) {
    case AdvertActionTypes.FILL_ADVERT_LIST:
      return { ...state, advertList: action.payload };

    case AdvertActionTypes.FILL_ADVERT:
      return { ...state, activeAdvert: action.payload };

    case AdvertActionTypes.REMOVE_ADVERT_INFO:
      return { ...state, activeAdvert: undefined };

    case AdvertActionTypes.FILL_ADVERT_FORM_INFO:
      return { ...state, formInfo: action.payload };

    case AdvertActionTypes.ON_CHANGE_ADVERT:
      if (state.activeAdvert) {
        return {
          ...state,
          activeAdvert: {
            ...state.activeAdvert,
            [action.payload.key]: action.payload.value,
          },
        };
      }
      return {
        ...state,
        activeAdvert: {
          ...initialStateActiveAdvert,
          [action.payload.key]: action.payload.value,
        },
      };

    default:
      return state;
  }
}
