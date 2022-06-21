import Config from "Configs";
const { apiHost } = Config;
const API_SETTINGS = apiHost + "/setting";

// SYSTEM SETTINGS
export const API_SETTINGS_GENERAL = API_SETTINGS + "/general";
export const API_SETTINGS_EMAIL = API_SETTINGS + "/email";
export const API_SETTINGS_EMAIL_ADD = API_SETTINGS_EMAIL + "/add";
export const API_SETTINGS_EMAIL_EDIT = (id: number) =>
  API_SETTINGS_EMAIL + "/" + id + "/edit";
export const API_SETTINGS_EMAIL_REMOVE = (id: number) =>
  API_SETTINGS_EMAIL + "/" + id + "/remove";
export const API_SETTINGS_EMAIL_SEND = (id: number) =>
  API_SETTINGS_EMAIL + "/" + id + "/send-test";

export const API_SETTINGS_TRAFFICKBACK = API_SETTINGS + "/trafficback";
export const API_SETTINGS_SECURITY = API_SETTINGS + "/security";

// CONTENT SETTINGS

type APISettings =
  | "payment_system"
  | "messenger"
  | "ticket-type"
  | "traffic-source"
  | "category"
  | "tag"
  | "tracking-domain"
  | "tracking-url"
  | "currencie"
  | "goal"
  | "offer-kpi-template"
  | "offer-description-template"
  | "offer-goal-template";

export const GET_API_SETTINGS = (category: APISettings) =>
  API_SETTINGS + `/${category}`;

export const UPDATE_API_SETTINGS = (
  category: APISettings,
  id?: number | string
) => {
  if (!id) {
    return GET_API_SETTINGS(category) + "/add";
  }
  return GET_API_SETTINGS(category) + `/${id}/edit`;
};

export const DELETE_API_SETTINGS = (
  category: APISettings,
  id: number | string
) => GET_API_SETTINGS(category) + `/${id}/remove`;
