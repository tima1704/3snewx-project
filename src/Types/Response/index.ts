import { IValidError } from "../";

export interface ISuccessRes<Data = any> {
  status: "success";
  data: Data;
}

export interface IErrorRes {
  status: "error";
  errors: IValidError[];
}
