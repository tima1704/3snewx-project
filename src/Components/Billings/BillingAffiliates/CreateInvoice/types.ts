import { ITag } from "Types";

export interface ICreateInvoice {
  comment: string;
  date?: Date;
  affiliates: ITag[];
  offers: ITag[];
}

export interface IErrorbilling {
  type?: "collection";
  value?: {
    text: string;
    btn?: { text: string; link?: string };
  }[];
  text: string;
  btn?: {
    text: string;
    link?: string;
  };
}
