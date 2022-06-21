import { ITag } from "Types";

export interface IFilterOffers {
  title: string;
  advert_id?: ITag;
  category: ITag[];
  status: string[];
  privacy_level: string[];
  country: string[];
  traffic_sources: string[];
  tags: ITag[];
  size: string | number;
  page: string | number;
}

export const initialFilterOffers: IFilterOffers = {
  title: "",
  category: [],
  status: [],
  privacy_level: [],
  country: [],
  traffic_sources: [],
  tags: [],
  size: 10,
  page: 1,
};
