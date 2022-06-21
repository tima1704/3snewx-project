import { Dispatch } from "redux";
import { fetchAdvertInfo, fetchAdvertsList } from "Helpers/api/Advert";
import { fetchAffiliateMainInfoFormApi } from "Helpers/api/Affiliates";
import { AdvertActions, AdvertActionTypes } from "./types";

export const fetchAdvertList = (
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => async (dispatch: Dispatch<AdvertActions>) => {
  if (setLoading) {
    setLoading(true);
  }

  dispatch({ type: AdvertActionTypes.FETCH_ADVERT_LIST });

  fetchAdvertsList().then((res) => {
    dispatch({
      type: AdvertActionTypes.FILL_ADVERT_LIST,
      payload: res.data.data.adverts,
    });

    if (setLoading) {
      setLoading(false);
    }
  });
};

export const fetchAdvert = (id: string | number) => async (
  dispatch: Dispatch<AdvertActions>
) => {
  dispatch({ type: AdvertActionTypes.FETCH_ADVERT });

  fetchAdvertInfo(id).then((res) => {
    dispatch({
      type: AdvertActionTypes.FILL_ADVERT,
      payload: res.data.data,
    });
  });
};

export const removeAdvertInfo = (): AdvertActions => ({
  type: AdvertActionTypes.REMOVE_ADVERT_INFO,
});

export const fetchAdvertFormInfo = () => async (
  dispatch: Dispatch<AdvertActions>
) => {
  dispatch({ type: AdvertActionTypes.FETCH_ADVERT_FORM_INFO });

  fetchAffiliateMainInfoFormApi().then((res) => {
    dispatch({
      type: AdvertActionTypes.FILL_ADVERT_FORM_INFO,
      payload: { messengers: res.messengers, managers: res.managers },
    });
  });
};

export const onChangeAdvert = (value: any, key: string): AdvertActions => ({
  type: AdvertActionTypes.ON_CHANGE_ADVERT,
  payload: { value, key },
});
