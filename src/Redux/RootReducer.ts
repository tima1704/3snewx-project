import { combineReducers } from "redux";

import * as AppActions from "./AppRedux/actions";
import * as SettingsActions from "./SettingsRedux/actions";
import * as OffersActions from "./OffersRedux/actions";
import * as UsersActions from "./UsersRedux/actions";
import * as AffiliateActions from "./AffiliateRedux/actions";
import * as ConversionsActions from "./ConversionsRedux/actions";
import * as AdvertActions from "./AdvertRedux/actions";

import AppReducer from "./AppRedux/reducer";
import SettingsReducer from "./SettingsRedux/reducer";
import OffersReducer from "./OffersRedux/reducer";
import UsersReducer from "./UsersRedux/reducer";
import AffiliateReducer from "./AffiliateRedux/reducer";
import ConversionsReducer from "./ConversionsRedux/reducer";
import AdvertReducer from "./AdvertRedux/reducer";

export const RootReducer = combineReducers({
  App: AppReducer,
  Settings: SettingsReducer,
  Offers: OffersReducer,
  Users: UsersReducer,
  Affiliate: AffiliateReducer,
  Conversions: ConversionsReducer,
  Advert: AdvertReducer,
});

export type RootState = ReturnType<typeof RootReducer>;

export const AllActions = {
  ...AppActions,
  ...SettingsActions,
  ...OffersActions,
  ...UsersActions,
  ...AffiliateActions,
  ...ConversionsActions,
  ...AdvertActions,
};
