import { ITag } from "Types";

export interface ICapsOffer {
  cap: ICapOffer[];
}

export interface ICapOffer {
  timeframe: string;
  type: string;
  value: string;
  goal: string;
  affiliate_type: "all" | "each" | "select" | string;
  affiliate?: ITag[];
  over_cap: boolean;
  hide: boolean;
  timezone: string;
  conversion_status: string[];
  id?: undefined;
}

export const initialStateCap: ICapOffer = {
  timeframe: "day",
  type: "conversions",
  value: "",
  goal: "all",
  affiliate_type: "all",
  over_cap: false,
  hide: false,
  timezone: "",
  conversion_status: [],
};

export const initialStateCaps: ICapsOffer = {
  cap: [initialStateCap],
};

export enum ECap {
  timeframe = "timeframe",
  type = "type",
  value = "value",
  goal = "goal",
  affiliate_type = "affiliate_type",
  timezone = "timezone",
}

export enum ECapBoolean {
  over_cap = "over_cap",
  hide = "hide",
}
