import { Dispatch } from "redux";
import { Icons } from "../../Components/MiniComponents/Icon";
import messages from "../../Data/Messages";
import { checkLoginApi, fetchAppLanguagesApi } from "../../Helpers/api/App";
import { AppAction, AppActionTypes, TErrorPage } from "./types";

export const checkUserAuth = () => async (dispatch: Dispatch<AppAction>) => {
  checkLoginApi()
    .then((res) => {
      if (res.data.data) {
        dispatch({
          type: AppActionTypes.SUCCESS_LOGIN,
          payload: res.data.data,
        });
      }
    })
    .catch((e) => {
      dispatch({ type: AppActionTypes.LOGOUT_APP });
    });
};

export const fetchAppLanguages = () => async (
  dispatch: Dispatch<AppAction>
) => {
  dispatch({ type: AppActionTypes.FETCH_APP_LANGUAGES });

  fetchAppLanguagesApi().then((lang) => {
    dispatch({ type: AppActionTypes.FILL_APP_LANGUAGES, payload: lang });
  });
};

export const addAppToastSuccess = (
  message?: string,
  icon?: Icons
): AppAction => ({
  type: AppActionTypes.ADD_GLOBAL_TOAST_APP,
  payload: {
    intent: "success",
    messageHeader: message || messages.successAdd,
    icon: icon,
  },
});

export const deleteAppToastGlobal = (index: number): AppAction => ({
  type: AppActionTypes.DELETE_GLOBAL_TOAST_APP,
  payload: index,
});

export const addErrorPage = (codePage: TErrorPage): AppAction => ({
  type: AppActionTypes.ERROR_PAGE_ADD,
  payload: codePage,
});

export const removeErrorPage = (): AppAction => ({
  type: AppActionTypes.ERROR_PAGE_REMOVE,
});
