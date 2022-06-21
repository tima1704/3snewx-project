import Config from "Configs";
const { apiHost } = Config;
export const API_USERS = apiHost + "/admin";

export const API_USERS_NEW = API_USERS + "/new";
export const API_USERS_DELETE = (userId: string) => API_USERS + "/" + userId;

export const API_USER_ID_EDIT = (id: string) => API_USERS + "/" + id + "/edit";
export const API_USER_ID = (id: string) => API_USERS + "/" + id;

export const API_USER_PERMISSION = (id: string) =>
  API_USERS + "/" + id + "/permission";

export const API_USER_AUTH_KEYS = (id: string) =>
  API_USERS + "/" + id + "/auth-key";

export const API_USERS_DELETE_AUTH_KEY = (token: string) =>
  API_USERS + "/auth-keys/" + token;
