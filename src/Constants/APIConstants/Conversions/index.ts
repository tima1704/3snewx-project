import Config from "Configs";
const { apiHost } = Config;

export const API_CONVERSIONS = apiHost + "/conversion",
  API_CONVERSION_APROVE_DECLINE = (
    id: string | number,
    method: "approve" | "decline"
  ) => API_CONVERSIONS + "/" + id + "/" + method;
