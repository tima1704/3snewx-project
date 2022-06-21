import { Dispatch } from "redux";
import {
  fetchAffiliateApi,
  fetchAffiliateListApi,
  fetchAffiliateMainInfoFormApi,
  fetchAffiliatePaymentInfo,
  fetchAvailablePaymentAffiliatesApi,
} from "../../Helpers/api/Affiliates";
import { AffiliateAction, AffiliateActionTypes } from "./types";

export const resetAffiliateState = (): AffiliateAction => ({
  type: AffiliateActionTypes.RESET_AFFILIATE_STATE,
});

export const fetchAffiliateList = (
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => async (dispatch: Dispatch<AffiliateAction>) => {
  if (setLoading) {
    setLoading(true);
  }

  dispatch({ type: AffiliateActionTypes.FETCH_AFFILIATE_LIST });

  fetchAffiliateListApi().then((res) => {
    dispatch({
      type: AffiliateActionTypes.FILL_AFFILIATE_LIST,
      payload: res.data.affiliate,
    });

    if (setLoading) {
      setLoading(false);
    }
  });
};

export const fetchMainInfoAffiliate = () => async (
  dispatch: Dispatch<AffiliateAction>
) => {
  dispatch({ type: AffiliateActionTypes.FETCH_MAIN_INFO_AFFILIATE });

  fetchAffiliateMainInfoFormApi().then((data) => {
    if (data) {
      dispatch({
        type: AffiliateActionTypes.FILL_MAIN_INFO_AFFILIATE,
        payload: data,
      });
    }
  });
};

export const fetchAffiliate = (
  id: string,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => async (dispatch: Dispatch<AffiliateAction>) => {
  if (setLoading) {
    setLoading(true);
  }

  dispatch({ type: AffiliateActionTypes.FETCH_AFFILIATE });

  fetchAffiliateApi(id).then(({ data, id }) => {
    dispatch({
      type: AffiliateActionTypes.FILL_AFFILIATE,
      payload: data,
      id: id,
    });

    if (setLoading) {
      setLoading(false);
    }
  });
};

export const fetchAvailablePaymentAffiliate = () => async (
  dispatch: Dispatch<AffiliateAction>
) => {
  dispatch({ type: AffiliateActionTypes.FETCH_AFFILIATE_AVAILABLE_PAYMENT });

  fetchAvailablePaymentAffiliatesApi().then((res) => {
    if (res.data.data) {
      dispatch({
        type: AffiliateActionTypes.FILL_AFFILIATE_AVAILABLE_PAYMENT,
        payload: res.data.data,
      });
    }
  });
};

export const fetchAffiliatePayment = (id: string) => async (
  dispatch: Dispatch<AffiliateAction>
) => {
  dispatch({ type: AffiliateActionTypes.FETCH_AFFILIATE_PAYMENT });

  fetchAffiliatePaymentInfo(id).then((res) => {
    if (res.data.data) {
      dispatch({
        type: AffiliateActionTypes.FILL_AFFILIATE_PAYMENT,
        payload: res.data.data,
        id,
      });
    }
  });
};
