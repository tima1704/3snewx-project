export const URL_TASKS = "/tasks";

export const URL_TASKS_NEW = URL_TASKS + "/new";
export const URL_TASKS_EDIT_$ID = URL_TASKS + "/edit/:id";
export const URL_TASKS_EDIT_ID = (id: string | number) =>
  URL_TASKS + "/edit/" + id;
