import axios from "axios";
import { API_APP } from "Constants/APIConstants";
import { ILanguages } from "Types";
import { ISuccessRes } from "Types/Response";
import HttpHeadersAuthorization from "Helpers/HttpHeaders";

type ResObj = {
  [key: string]: string;
};

interface ResCheckLogin {
  user: {
    username: string;
    email: string;
    name: string;
  };
  available_lang: string[];
}

export async function checkLoginApi() {
  return axios.get<ISuccessRes<ResCheckLogin>>(API_APP.API_APP_AUTH, {
    headers: HttpHeadersAuthorization(),
  });
}

export async function fetchAppLanguagesApi(): Promise<ILanguages[]> {
  try {
    const res = await axios.get<ISuccessRes<ResObj>>(API_APP.API_APP_LANGUAGES, {
      headers: HttpHeadersAuthorization(),
    });

    if (!res.data.data) {
      return [];
    }

    return Object.entries<string>(res.data.data).map((lang) => ({
      title: lang[1],
      value: lang[0],
    }));
  } catch (e) {
    console.log(e);
    return [];

    // errorUtils(e, null, { deleteLocalStor: false })
  }
}
