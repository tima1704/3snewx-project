import { AppAction, AppActionTypes, IAppState } from "./types";

import produce from "immer";

const initialState: IAppState = {
  isLogged: false,
  loading: true,
  languageApp: "rus",
  languages: [],
  errors: [],
  user: {},
};

export default function AppReducer(
  state: IAppState = initialState,
  action: AppAction
): IAppState {
  switch (action.type) {
    case AppActionTypes.SUCCESS_LOGIN:
      return produce(state, (draft) => {
        draft.isLogged = true;
        draft.loading = false;
        draft.user = action.payload.user;
        draft.available_lang = action.payload.available_lang;
      });

    case AppActionTypes.LOGOUT_APP:
      return produce(state, (draft) => {
        draft.isLogged = false;
        draft.loading = false;
      });

    case AppActionTypes.FILL_APP_LANGUAGES:
      return { ...state, languages: action.payload };

    case AppActionTypes.ADD_GLOBAL_TOAST_APP:
      return { ...state, errors: [...state.errors, action.payload] };

    case AppActionTypes.DELETE_GLOBAL_TOAST_APP:
      const newToasts = [...state.errors];
      newToasts.splice(action.payload, 1);
      return {
        ...state,
        errors: newToasts,
      };

    case AppActionTypes.ERROR_PAGE_ADD:
      return { ...state, errorPage: action.payload };

    case AppActionTypes.ERROR_PAGE_REMOVE:
      return { ...state, errorPage: undefined };

    default:
      return state;
  }
}
