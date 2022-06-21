import { ITag } from "Types";

export interface IRequestsItem {
  id: number;
  affiliate: {
    id: number;
    title: string;
  };
  status: "pending" | "accept" | "reject";
  created_at: string;
}

export interface IFilterRequestCard {
  affiliate?: ITag;
  page?: number | string;
}
