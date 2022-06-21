import Config from "Configs";
const { apiHost } = Config;

export const API_ADVERTISERS = apiHost + "/advert";

export const API_ADVERT_ID = (id: string | number) =>
  API_ADVERTISERS + "/" + id;

export const API_ADVERT_EDIT = (id: string | number) =>
  API_ADVERT_ID(id) + "/edit";
export const API_ADVERT_NEW = API_ADVERTISERS + "/new";

// Notes

export const API_ADVERT_NOTES = (advertId: string | number) =>
  API_ADVERT_ID(advertId) + "/notes";
export const API_ADVERT_NOTES_NEW = (advertId: string | number) =>
  API_ADVERT_NOTES(advertId) + "/add";
export const API_ADVERT_NOTES_EDIT = (
  advertId: string | number,
  notesId: string
) => API_ADVERT_NOTES(advertId) + "/" + notesId + "/edit";
export const API_ADVERT_NOTES_DELETE = (
  advertId: string | number,
  notesId: string
) => API_ADVERT_NOTES(advertId) + "/" + notesId + "/delete";

// Documents
export const API_ADVERT_DOCUMENTS = (advertId: string | number) =>
  API_ADVERT_ID(advertId) + "/document";

const API_ADVERT_DOCUMENTS_ID = (
  advertId: string | number,
  idDocument: string
) => API_ADVERT_DOCUMENTS(advertId) + "/" + idDocument;

export const API_ADVERT_DOCUMENTS_DOWNLOAD = (
  advertId: string | number,
  idDocument: string
) => API_ADVERT_DOCUMENTS_ID(advertId, idDocument) + "/download";

export const API_ADVERT_DOCUMENTS_UPLOAD = (advertId: string | number) =>
  API_ADVERT_DOCUMENTS(advertId) + "/upload";
