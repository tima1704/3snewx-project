export interface IOfferList {
  id: number;
  title: string;
  status: string;
  affiliates: {
    enabled: number[];
    disabled: number[];
  };
  notes: string;
  trafficSources: IObjectBack[];
  categories: IObjectBack[];
}

export interface IObjectBack {
  id: number;
  title: string;
}
