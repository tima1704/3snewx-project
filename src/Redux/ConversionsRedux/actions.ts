import { Dispatch } from "redux";
import { fetchConversions } from "../../Helpers/api/Conversions";
import { ConversionsActions, ConversionsTypes } from "./types";

export const fetchConversionsList = (
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => async (dispatch: Dispatch<ConversionsActions>) => {
  if (setLoading) {
    setLoading(true);
  }

  dispatch({ type: ConversionsTypes.FETCH_CONVERSIONS_LIST });

  fetchConversions().then((res) => {
    dispatch({
      type: ConversionsTypes.FILL_CONVERSIONS_LIST,
      payload: res.data.data.conversions,
    });
    if (setLoading) {
      setLoading(false);
    }
  });
};
