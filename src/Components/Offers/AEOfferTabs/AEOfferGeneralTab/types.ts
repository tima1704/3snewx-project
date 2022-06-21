import { ITag } from "Types";

export interface IOffersTabGeneral {
  title: string;
  advert_id?: ITag;
  status: string;
  sendEmail: boolean;
  tag?: ITag[];
  privacy_level: string;
  is_top: boolean;
  release_date: Date;
  stop_date?: Date;
  categories?: ITag[];
  notes: string;
  reconciliation: string;
  payouts: string;
  send_before_stoping?: string;
  traffic_source: string[];
  kpi?: { [key: string]: string };
  paid_goal?: { [key: string]: string };
  description?: { [key: string]: string };
  logo?: string | null;
}

export enum EOffersLang {
  kpi = "kpi",
  paid_goal = "paid_goal",
  description = "description",
}
