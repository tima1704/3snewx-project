export interface IPageMeta {
  countPerPage: number;
  page: number;
  totalCount: number;
}

export interface IValidError {
  name: string;
  msg: string;
}

export interface ITag {
  value: string;
  label: string;
}

export interface ILanguages {
  title: string;
  value: "general" | string;
}

export interface IMeta {
  page: number;
  totalCount: number;
  countPerPage: number;
}

export interface IAvailablePayment {
  id: string;
  title: string;
  currencie: string[];
  fields: {
    name: string;
    type: "string";
  }[];
}
