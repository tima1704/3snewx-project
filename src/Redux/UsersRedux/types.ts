import { EPermissions } from "../../Components/Users/permissionsItem";
import { IAuthToken } from "../../Pages/Cabinet/Users/AddEditUser/AuthTokens/types";
import { IUser } from "../../Pages/Cabinet/Users/UserList/types";

export interface IPermissions {
  [permission: string]: {
    view?: boolean;
    create?: boolean;
    edit?: boolean;
    delete?: boolean;
    export?: boolean;
  };
}

export interface IUsersState {
  list: IUser[];
  activeUser: {
    [id: string]: { permissions: IPermissions; authTokens?: IAuthToken[] };
  };
}

export type UsersActions =
  | fetchUsers
  | fillUsers
  | fetchUserPermission
  | fillUserPermission
  | checkedPermissions
  | fetchAuthToken
  | fillAuthToken;

export enum UsersActionsTypes {
  USERS_FETCH_LIST = "USERS_FETCH_LIST",
  USERS_FILL_LIST = "USERS_FILL_LIST",
  USERS_FETCH_PERMISSION = "USERS_FETCH_PERMISSION",
  USERS_FILL_PERMISSION = "USERS_FILL_PERMISSION",
  USERS_CHECKED_PERMISSION = "USERS_CHECKED_PERMISSION",
  USERS_FETCH_AUTH_TOKENS = "USERS_FETCH_AUTH_TOKENS",
  USERS_FILL_AUTH_TOKENS = "USERS_FILL_AUTH_TOKENS",
}

interface fetchUsers {
  type: UsersActionsTypes.USERS_FETCH_LIST;
}

interface fillUsers {
  type: UsersActionsTypes.USERS_FILL_LIST;
  payload: IUser[];
}

interface fetchUserPermission {
  type: UsersActionsTypes.USERS_FETCH_PERMISSION;
}

interface fillUserPermission {
  type: UsersActionsTypes.USERS_FILL_PERMISSION;
  payload: IPermissions;
  id: string;
}

interface checkedPermissions {
  type: UsersActionsTypes.USERS_CHECKED_PERMISSION;
  payload: {
    key: string;
    permission: EPermissions;
    value: boolean;
    userId: string;
  };
}

interface fetchAuthToken {
  type: UsersActionsTypes.USERS_FETCH_AUTH_TOKENS;
}

interface fillAuthToken {
  type: UsersActionsTypes.USERS_FILL_AUTH_TOKENS;
  payload: IAuthToken[];
  id: string;
}
