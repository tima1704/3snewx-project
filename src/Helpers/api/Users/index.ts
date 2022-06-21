import axios from "axios";
import { API_USERS } from "Constants/APIConstants";
import { IAuthToken } from "Pages/Cabinet/Users/AddEditUser/AuthTokens/types";
import { IUserGeneral } from "Pages/Cabinet/Users/AddEditUser/General/types";
import { IUser } from "Pages/Cabinet/Users/UserList/types";
import { IPermissions } from "Redux/UsersRedux/types";
import { ISuccessRes } from "Types/Response/index";
import { ErrorUtil } from "Helpers/CustomFunc";
import HttpHeadersAuthorization from "Helpers/HttpHeaders";

export async function userSaveAdmin(data: IUserGeneral, id?: string) {
  return axios.post(
    id ? API_USERS.API_USER_ID_EDIT(id) : API_USERS.API_USERS_NEW,
    id
      ? {
          admin_edit: data,
        }
      : { admin: data },
    {
      headers: HttpHeadersAuthorization(),
    }
  );
}

interface ResUsers {
  pagination: IUser[];
  filter: {
    email: [];
    firstName: [];
    secondName: [];
    messenger: [];
    _token: [];
  };
}

export async function fetchUsersList() {
  return axios
    .get<ResUsers>(API_USERS.API_USERS, {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function deleteUserById(userId: string) {
  return axios
    .delete(API_USERS.API_USERS_DELETE(userId), {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function fetchUserById(userId: string) {
  return axios
    .get(API_USERS.API_USER_ID(userId), {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function fetchUserPermission(userId: string) {
  return axios
    .get<ISuccessRes<IPermissions>>(API_USERS.API_USER_PERMISSION(userId), {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function saveUserPermissions(userId: string, data: IPermissions) {
  return axios.post(
    API_USERS.API_USER_PERMISSION(userId),
    { permissions: data },
    {
      headers: HttpHeadersAuthorization(),
    }
  );
}
export async function fetchAuthTokensUser(userId: string) {
  return axios
    .get<ISuccessRes<IAuthToken[]>>(API_USERS.API_USER_AUTH_KEYS(userId), {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function deleteTokenUser(token: string) {
  return axios
    .delete(API_USERS.API_USERS_DELETE_AUTH_KEY(token), {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}
