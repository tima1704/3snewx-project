import {
  ConversionsActions,
  ConversionsTypes,
  IConversionsState,
} from "./types";

const initialState: IConversionsState = {};

export default function ConversionsReducer(
  state: IConversionsState = initialState,
  action: ConversionsActions
): IConversionsState {
  switch (action.type) {
    case ConversionsTypes.FILL_CONVERSIONS_LIST:
      return { ...state, list: action.payload };

    default:
      return state;
  }
}
