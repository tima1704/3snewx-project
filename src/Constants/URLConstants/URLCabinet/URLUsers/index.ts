export const URL_USERS = "/users";
export const URL_NEW_USER = URL_USERS + "/new";
export const URL_NEW_USER_GENERAL = URL_NEW_USER + "/general";

export const URL_USER_$ID_EDIT = URL_USERS + "/edit/:id";
export const URL_USER_$ID_EDIT_GENERAL = URL_USER_$ID_EDIT + "/general";
export const URL_USER_$ID_EDIT_PERMISSIONS = URL_USER_$ID_EDIT + "/permissions";
export const URL_USER_$ID_AUTH_TOKEN = URL_USER_$ID_EDIT + "/auth-key";

export const URL_USER_ID_EDIT_GENERAL = (id: string | number) =>
  URL_USERS + "/edit/" + id + "/general";
export const URL_USER_ID_EDIT_PERMISSIONS = (id: string | number) =>
  URL_USERS + "/edit/" + id + "/permissions";
export const URL_USER_ID_AUTH_TOKEN = (id: string | number) =>
  URL_USERS + "/edit/" + id + "/auth-key";
