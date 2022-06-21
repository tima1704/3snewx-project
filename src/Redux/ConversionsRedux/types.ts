import { IConversions } from "../../Components/Conversions/types";

export interface IConversionsState {
  list?: IConversions[];
}

export enum ConversionsTypes {
  FETCH_CONVERSIONS_LIST = "FETCH_CONVERSIONS_LIST",
  FILL_CONVERSIONS_LIST = "FILL_CONVERSIONS_LIST",
}

export type ConversionsActions = fetchConversionsList | fillConversionsList;

interface fetchConversionsList {
  type: ConversionsTypes.FETCH_CONVERSIONS_LIST;
}

interface fillConversionsList {
  type: ConversionsTypes.FILL_CONVERSIONS_LIST;
  payload: IConversions[];
}
