import { IUsersState, UsersActions, UsersActionsTypes } from "./types";

const initialState: IUsersState = {
  list: [],
  activeUser: {},
};

export default function UsersReducer(
  state: IUsersState = initialState,
  action: UsersActions
): IUsersState {
  switch (action.type) {
    case UsersActionsTypes.USERS_FILL_LIST:
      return { ...state, list: action.payload };

    case UsersActionsTypes.USERS_FILL_PERMISSION:
      return {
        ...state,
        activeUser: {
          ...state.activeUser,
          [action.id]: {
            ...state.activeUser[action.id],
            permissions: action.payload,
          },
        },
      };

    case UsersActionsTypes.USERS_CHECKED_PERMISSION:
      if (
        state.activeUser[action.payload.userId]?.permissions?.[
          action.payload.key
        ]?.[action.payload.permission] !== undefined
      ) {
        return {
          ...state,
          activeUser: {
            ...state.activeUser,
            [action.payload.userId]: {
              ...state.activeUser[action.payload.userId],
              permissions: {
                ...state.activeUser[action.payload.userId].permissions,
                [action.payload.key]: {
                  ...state.activeUser[action.payload.userId].permissions[
                    action.payload.key
                  ],
                  [action.payload.permission]: action.payload.value,
                },
              },
            },
          },
        };
      }

      return state;

    case UsersActionsTypes.USERS_FILL_AUTH_TOKENS:
      return {
        ...state,
        activeUser: {
          ...state.activeUser,
          [action.id]: {
            ...state.activeUser[action.id],
            authTokens: action.payload,
          },
        },
      };

    default:
      return state;
  }
}
