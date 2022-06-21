import { AxiosError } from "axios";
import { TOKEN } from "../Constants/AppConstants";
import { addErrorPage } from "../Redux/AppRedux/actions";

import { AppActionTypes } from "../Redux/AppRedux/types";

import State from "../Redux/Store";

export function getObjectOfArray(
  array: any[],
  value: string | number = "",
  key = "value"
) {
  if (!array) {
    return null;
  }

  if (typeof value === "object") {
    const obj = array.find((o) => o[key] === value[key]);
    return obj;
  }

  const obj = array.find((o) => o[key] === value);
  return obj;
}

export function generateCode(length: number, lowerCase: boolean = true) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var code = "";
  for (var i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }

  if (lowerCase) {
    return code.toLocaleLowerCase();
  }

  return code;
}

export function SliceTextAndMore(
  text: string,
  length: number,
  more: boolean = true
) {
  const slicedText = text.slice(0, length);
  return more ? slicedText + "..." : slicedText;
}

interface IErrorUtilOptions {
  errorPage: boolean;
}

const errorUtilOptions: IErrorUtilOptions = {
  errorPage: true,
};

export function ErrorUtil(
  e: AxiosError,
  options: IErrorUtilOptions = errorUtilOptions
) {
  const dispatch = State.dispatch;

  if (e.response) {
    switch (e.response.status) {
      case 500:
        dispatch({
          type: AppActionTypes.ADD_GLOBAL_TOAST_APP,
          payload: {
            messageHeader: "Unknow error...",
            intent: "danger",
            debugInfo: e.response.data.toString(),
          },
        });
        if (options.errorPage) {
          dispatch(addErrorPage(500));
        }
        return;

      case 403:
        dispatch({
          type: AppActionTypes.ADD_GLOBAL_TOAST_APP,
          payload: {
            messageHeader: "Access denied",
            intent: "danger",
            debugInfo: JSON.stringify(e.response.data),
          },
        });
        if (options.errorPage) {
          dispatch(addErrorPage(403));
        }
        return;

      case 404:
        if (options.errorPage) {
          dispatch(addErrorPage(404));
        }
        return;

      case 406:
        dispatch({
          type: AppActionTypes.ADD_GLOBAL_TOAST_APP,
          payload: {
            messageHeader: "Error Validation",
            intent: "danger",
            debugInfo: JSON.stringify(e.response.data),
          },
        });
        return;

      case 401:
        localStorage.removeItem(TOKEN);
        dispatch({ type: AppActionTypes.LOGOUT_APP });
        return;

      default:
        dispatch({
          type: AppActionTypes.ADD_GLOBAL_TOAST_APP,
          payload: {
            messageHeader: "Unknow error...",
            intent: "danger",
            debugInfo: JSON.stringify(e),
          },
        });
    }
  }

  return dispatch({
    type: AppActionTypes.ADD_GLOBAL_TOAST_APP,
    payload: {
      messageHeader: "Unknow error...",
      intent: "danger",
      debugInfo: JSON.stringify(e),
    },
  });
}
