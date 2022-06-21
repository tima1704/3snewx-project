import React from "react";
import { Dispatch } from "redux";
import {
  fetchSettingsCategories,
  fetchSettingsCurrences,
  fetchSettingsEmail,
  fetchSettingsGoals,
  fetchSettingsMessenger,
  fetchSettingsOfferDescriptionsTemplates,
  fetchSettingsOfferKPITemplates,
  fetchSettingsPaymentSustyms,
  fetchSettingsTags,
  fetchSettingsTicketCategory,
  fetchSettingsTrackingDomainUrls,
  fetchTrafficSources,
  fetchSettingsOfferGoalTemplates,
} from "../../Helpers/api/Settings";
import { SettingsActionTypes, SettingsActions } from "./types";

export const settingsReset = (): SettingsActions => ({
  type: SettingsActionTypes.SETTINGS_RESET,
});

export const fetchSetEmail = (
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => async (dispatch: Dispatch<SettingsActions>) => {
  dispatch({ type: SettingsActionTypes.SETTINGS_FETSH_EMAIL });

  fetchSettingsEmail().then(({ data }) => {
    dispatch({
      type: SettingsActionTypes.SETTINGS_FILL_EMAIL,
      payload: data.data,
    });

    if (setLoading) {
      setLoading(false);
    }
  });
};

export const fetchSetTags = (
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => async (dispatch: Dispatch<SettingsActions>) => {
  dispatch({ type: SettingsActionTypes.SETTINGS_FETCH_TAGS });

  fetchSettingsTags().then(({ data }) => {
    dispatch({
      type: SettingsActionTypes.SETTINGS_FILL_TAGS,
      payload: data.data.tags,
    });

    if (setLoading) {
      setLoading(false);
    }
  });
};

export const fetchSetGoals = (
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => async (dispatch: Dispatch<SettingsActions>) => {
  dispatch({ type: SettingsActionTypes.SETTINGS_FETCH_GOALS });

  fetchSettingsGoals().then((res) => {
    dispatch({
      type: SettingsActionTypes.SETTINGS_FILL_GOALS,
      payload: res.data.data,
    });

    if (setLoading) {
      setLoading(false);
    }
  });
};

export const fetchSetCategories = (
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => async (dispatch: Dispatch<SettingsActions>) => {
  dispatch({ type: SettingsActionTypes.SETTINGS_FETCH_CATEGORIES });

  fetchSettingsCategories().then(({ data }) => {
    dispatch({
      type: SettingsActionTypes.SETTINGS_FILL_CATEGORIES,
      payload: data.data,
    });

    if (setLoading) {
      setLoading(false);
    }
  });
};

export const fetchSetTrafficSources = (
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => async (dispatch: Dispatch<SettingsActions>) => {
  dispatch({ type: SettingsActionTypes.SETTINGS_FETCH_TRAFFIC_SOURCES });

  fetchTrafficSources().then(({ data }) => {
    dispatch({
      type: SettingsActionTypes.SETTINGS_FILL_TRAFFIC_SOURCES,
      payload: data.data,
    });

    if (setLoading) {
      setLoading(false);
    }
  });
};

export const fetchSetTiketsCategories = (
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => async (dispatch: Dispatch<SettingsActions>) => {
  dispatch({ type: SettingsActionTypes.SETTINGS_FETCH_TICKET_TYPE });

  fetchSettingsTicketCategory().then(({ data }) => {
    dispatch({
      type: SettingsActionTypes.SETTINGS_FILL_TICKET_TYPE,
      payload: data.data,
    });

    if (setLoading) {
      setLoading(false);
    }
  });
};

export const fetchSetMessenger = (
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => async (dispatch: Dispatch<SettingsActions>) => {
  dispatch({ type: SettingsActionTypes.SETTINGS_FETCH_MESSENGER });

  fetchSettingsMessenger().then(({ data }) => {
    dispatch({
      type: SettingsActionTypes.SETTINGS_FILL_MESSENGER,
      payload: data.data,
    });

    if (setLoading) {
      setLoading(false);
    }
  });
};

export const fetchSetPaymentSettings = (
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => async (dispatch: Dispatch<SettingsActions>) => {
  dispatch({ type: SettingsActionTypes.SETTINGS_FETCH_PAYMENT_SYSTEM });

  fetchSettingsPaymentSustyms().then(({ data }) => {
    dispatch({
      type: SettingsActionTypes.SETTINGS_FILL_PAYMENT_SYSTEM,
      payload: data.data,
    });

    if (setLoading) {
      setLoading(false);
    }
  });
};

export const fetchSetTrackingDomainUrl = (
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => async (dispatch: Dispatch<SettingsActions>) => {
  dispatch({
    type: SettingsActionTypes.SETTINGS_FETCH_TRACKING_DOMAINS_AND_URLS,
  });
  // сделать при then вывод tracking_url из объекта
  fetchSettingsTrackingDomainUrls().then(({ data }) => {
    dispatch({
      type: SettingsActionTypes.SETTINGS_FILL_TRACKING_DOMAINS_AND_URLS,
      payload: {
        tracking_domain: data.data.tracking_domain,
        tracking_url: data.data.tracking_site_url,
      },
    });

    if (setLoading) {
      setLoading(false);
    }
  });
};

export const fetchSetCurriences = (
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => async (dispatch: Dispatch<SettingsActions>) => {
  dispatch({
    type: SettingsActionTypes.SETTINGS_FETCH_CURRENCES,
  });

  fetchSettingsCurrences().then((data) => {
    dispatch({
      type: SettingsActionTypes.SETTINGS_FILL_CURRENCES,
      payload: data,
    });

    if (setLoading) {
      setLoading(false);
    }
  });
};

export const fetchSetOfferKpiTemplate = (
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => async (dispatch: Dispatch<SettingsActions>) => {
  dispatch({
    type: SettingsActionTypes.SETTINGS_FETCH_OFFER_KPI_TEMPLATE,
  });

  fetchSettingsOfferKPITemplates().then((data) => {
    dispatch({
      type: SettingsActionTypes.SETTINGS_FILL_OFFER_KPI_TEMPLATE,
      payload: data,
    });

    if (setLoading) {
      setLoading(false);
    }
  });
};

export const fetchSetOfferDescriptionsTemplate = (
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => async (dispatch: Dispatch<SettingsActions>) => {
  dispatch({
    type: SettingsActionTypes.SETTINGS_FETCH_OFFER_DESCRIPTIONS_TEMPLATE,
  });

  fetchSettingsOfferDescriptionsTemplates().then((data) => {
    dispatch({
      type: SettingsActionTypes.SETTINGS_FILL_OFFER_DESCRIPTIONS_TEMPLATE,
      payload: data,
    });

    if (setLoading) {
      setLoading(false);
    }
  });
};
export const fetchSetOfferGoalTemplate = (
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => async (dispatch: Dispatch<SettingsActions>) => {
  dispatch({
    type: SettingsActionTypes.SETTINGS_FETCH_OFFER_GOAL_TEMPLATE,
  });

  fetchSettingsOfferGoalTemplates().then((data) => {
    dispatch({
      type: SettingsActionTypes.SETTINGS_FILL_OFFER_GOAL_TEMPLATE,
      payload: data,
    });

    if (setLoading) {
      setLoading(false);
    }
  });
};
