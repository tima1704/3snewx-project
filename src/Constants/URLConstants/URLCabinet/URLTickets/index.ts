export const URL_TICKETS = "/tickets";

export const URL_NEW_TICKETS = URL_TICKETS + "/new";
export const URL_TICKETS_$ID = URL_TICKETS + "/edit/:id";
export const URL_TICKETS_ID = (id: number | string) =>
  URL_TICKETS + "/edit/" + id;
