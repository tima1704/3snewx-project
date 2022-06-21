export interface ICategory {
  general: { id: number; title: string };
  [key: string]: {
    id: number;
    title: string;
  };
}

export interface ICategoryEdit {
  [key: string]: {
    id?: number;
    title: string;
  };
}

export enum ECategory {
  title = "title",
}
