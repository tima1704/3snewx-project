import Config from "Configs";
const { apiHost } = Config;

export const API_APP_LANGUAGES = apiHost + "/setting/get-available-lang";
export const API_APP_AUTH = apiHost + "/get-state";
