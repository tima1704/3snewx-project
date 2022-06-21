export interface ITrafficSources {
  general: { id: number; title: string };
  [key: string]: {
    id: number;
    title: string;
  };
}

export interface ITrafficSourcesEdit {
  [key: string]: {
    id?: number;
    title: string;
  };
}

export enum ETrafficSources {
  title = "title",
}
