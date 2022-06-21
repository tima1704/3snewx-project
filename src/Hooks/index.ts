import { useCallback, useMemo, useState } from "react";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AxiosError, AxiosResponse } from "axios";

import type { RootState } from "Redux/RootReducer";
import { AllActions } from "Redux/RootReducer";

import { bindActionCreators } from "redux";
import { IValidError } from "Types";
import { IErrorRes, ISuccessRes } from "Types/Response";
import { ErrorUtil } from "Helpers/CustomFunc";

import messages from "Data/Messages";

export const useAppDispatch = () => {
  const dispatch = useDispatch();
  return bindActionCreators(AllActions, dispatch);
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useLanguage = (initialLang: string = "general") => {
  const languages = useAppSelector((state) => state.App.languages);
  // const { fetchAppLanguages } = useAppDispatch();

  // useEffect(() => {
  //   if (languages.length === 0) {
  //     fetchAppLanguages();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const [language, setLanguage] = useState<string>(initialLang);

  const languagesNotGeneral = useMemo(() => {
    return languages.filter((lang) => lang.value !== "general");
  }, [languages]);

  return { languages, language, setLanguage, languagesNotGeneral };
};

export function useAsyncSave<Res = any>(
  asyncFunction: (
    ...payload: any[]
  ) => Promise<AxiosResponse<ISuccessRes<Res>, any>>,
  edit = false
) {
  const [disabled, setDisabled] = useState(false);

  const [errors, setError] = useState<IValidError[]>([]);
  const { addAppToastSuccess } = useAppDispatch();

  const execute = useCallback(
    (...payload: Parameters<typeof asyncFunction>) => {
      setDisabled(true);
      setError([]);

      return asyncFunction(...payload)
        .then((res) => {
          addAppToastSuccess(edit ? messages.successEdit : messages.successAdd);
          return res;
        })
        .catch((e: AxiosError<IErrorRes>) => {
          if (e.response?.data.errors) {
            setError(e.response.data.errors);
          }

          ErrorUtil(e);

          throw e;
        })
        .finally(() => {
          setDisabled(false);
        });

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [asyncFunction, addAppToastSuccess, edit]
  );

  return { execute, disabled, errors };
}
