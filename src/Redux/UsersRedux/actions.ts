import { Dispatch } from "redux";
import { EPermissions } from "../../Components/Users/permissionsItem";
import {
  fetchAuthTokensUser,
  fetchUserPermission,
  fetchUsersList,
} from "../../Helpers/api/Users";
import { UsersActions, UsersActionsTypes } from "./types";

export const fetchUSersListAction = (
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => async (dispatch: Dispatch<UsersActions>) => {
  dispatch({
    type: UsersActionsTypes.USERS_FETCH_LIST,
  });

  fetchUsersList().then((res) => {
    dispatch({
      type: UsersActionsTypes.USERS_FILL_LIST,
      payload: res.data.pagination,
    });

    if (setLoading) {
      setLoading(false);
    }
  });
};

export const fetchUserPermissionAction = (
  id: string,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => async (dispatch: Dispatch<UsersActions>) => {
  dispatch({
    type: UsersActionsTypes.USERS_FETCH_PERMISSION,
  });

  fetchUserPermission(id).then((res) => {
    dispatch({
      type: UsersActionsTypes.USERS_FILL_PERMISSION,
      payload: res.data.data,
      id,
    });

    if (setLoading) {
      setLoading(false);
    }
  });
};

export const onCheckedUserPermission = (
  key: string,
  permission: EPermissions,
  value: boolean,
  userId: string
): UsersActions => ({
  type: UsersActionsTypes.USERS_CHECKED_PERMISSION,
  payload: { key, permission, value, userId },
});

export const fetchAuthTokens = (id: string) => async (
  dispatch: Dispatch<UsersActions>
) => {
  dispatch({
    type: UsersActionsTypes.USERS_FETCH_AUTH_TOKENS,
  });

  fetchAuthTokensUser(id).then((res) => {
    if (res.data.data) {
      dispatch({
        type: UsersActionsTypes.USERS_FILL_AUTH_TOKENS,
        payload: res.data.data,
        id,
      });
    }
  });
};
