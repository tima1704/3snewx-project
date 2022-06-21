import { IToast } from "../../Components/MiniComponents/ErrorsToasts";

import { ILanguages } from "../../Types";

export type TErrorPage = 404 | 500 | 403;

export interface IAppState {
  isLogged: boolean;
  languageApp: string;
  languages: ILanguages[];
  errors: IToast[];
  errorPage?: TErrorPage;
  user: {
    username?: string;
    email?: string;
    name?: string;
  };
  available_lang?: string[];
  loading: boolean;
}

export enum AppActionTypes {
  SUCCESS_LOGIN = "SUCCESS_LOGIN",
  LOGOUT_APP = "LOGOUT_APP",
  ADD_GLOBAL_TOAST_APP = "ADD_GLOBAL_TOAST_APP",
  DELETE_GLOBAL_TOAST_APP = "DELETE_GLOBAL_TOAST_APP",
  FETCH_APP_LANGUAGES = "FETCH_APP_LANGUAGES",
  FILL_APP_LANGUAGES = "FILL_APP_LANGUAGES",
  ERROR_PAGE_ADD = "ERROR_PAGE_ADD",
  ERROR_PAGE_REMOVE = "ERROR_PAGE_REMOVE",
}

export type AppAction =
  | AppAuthSuccessAction
  | AppAuthErrorAction
  | AppAddGlobalToast
  | AppDeleteGlobalToast
  | AppFillLanguages
  | AppFetchLangauage
  | AppErrorPageAdd
  | AppErrorPageRemove;

interface AppAuthSuccessAction {
  type: AppActionTypes.SUCCESS_LOGIN;
  payload: {
    user: {
      username?: string;
      email?: string;
      name?: string;
    };
    available_lang?: string[];
  };
}

interface AppAuthErrorAction {
  type: AppActionTypes.LOGOUT_APP;
}

interface AppAddGlobalToast {
  type: AppActionTypes.ADD_GLOBAL_TOAST_APP;
  payload: IToast;
}

interface AppDeleteGlobalToast {
  type: AppActionTypes.DELETE_GLOBAL_TOAST_APP;
  payload: number;
}

interface AppFetchLangauage {
  type: AppActionTypes.FETCH_APP_LANGUAGES;
}

interface AppFillLanguages {
  type: AppActionTypes.FILL_APP_LANGUAGES;
  payload: ILanguages[];
}

interface AppErrorPageAdd {
  type: AppActionTypes.ERROR_PAGE_ADD;
  payload: TErrorPage;
}

interface AppErrorPageRemove {
  type: AppActionTypes.ERROR_PAGE_REMOVE;
}
