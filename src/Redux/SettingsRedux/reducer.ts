import { ISettingsState, SettingsActions, SettingsActionTypes } from "./types";

const initialState: ISettingsState = {};

export default function SettingsReducer(
  state: ISettingsState = initialState,
  action: SettingsActions
): ISettingsState {
  switch (action.type) {
    case SettingsActionTypes.SETTINGS_RESET:
      return initialState;

    case SettingsActionTypes.SETTINGS_FILL_EMAIL:
      return { ...state, mail_server: action.payload };

    case SettingsActionTypes.SETTINGS_FILL_TAGS:
      return { ...state, tags: action.payload };

    case SettingsActionTypes.SETTINGS_FILL_GOALS:
      return { ...state, goals: action.payload };

    case SettingsActionTypes.SETTINGS_FILL_CATEGORIES:
      return { ...state, categories: action.payload };

    case SettingsActionTypes.SETTINGS_FILL_TRAFFIC_SOURCES:
      return { ...state, traffciSources: action.payload };

    case SettingsActionTypes.SETTINGS_FILL_TICKET_TYPE:
      return { ...state, ticket_type: action.payload };

    case SettingsActionTypes.SETTINGS_FILL_MESSENGER:
      return { ...state, messenger: action.payload };

    case SettingsActionTypes.SETTINGS_FILL_PAYMENT_SYSTEM:
      return { ...state, paymnet_systems: action.payload };

    case SettingsActionTypes.SETTINGS_FILL_TRACKING_DOMAINS_AND_URLS:
      return {
        ...state,
        tracking_domain: action.payload.tracking_domain,
        tracking_url: action.payload.tracking_url,
      };

    case SettingsActionTypes.SETTINGS_FILL_CURRENCES:
      return {
        ...state,
        currencies: action.payload,
      };

    case SettingsActionTypes.SETTINGS_FILL_OFFER_KPI_TEMPLATE:
      return { ...state, offer_kpi_template: action.payload };

    case SettingsActionTypes.SETTINGS_FILL_OFFER_DESCRIPTIONS_TEMPLATE:
      return { ...state, offer_description_template: action.payload };

    case SettingsActionTypes.SETTINGS_FILL_OFFER_GOAL_TEMPLATE:
      return { ...state, offer_goal_template: action.payload };

    default:
      return state;
  }
}
