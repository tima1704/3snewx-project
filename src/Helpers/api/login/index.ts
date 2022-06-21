import axios from "axios";
import { API_LOGIN } from "Constants/APIConstants";

import { ISuccessRes } from "Types/Response";
import { ILoginData, ResILogin } from "Types/Response/login";

export function submitLogin({ userName, password }: ILoginData) {
  return axios.post<ISuccessRes<ResILogin>>(API_LOGIN.API_LOGIN, {
    password,
    username: userName,
  });
}
