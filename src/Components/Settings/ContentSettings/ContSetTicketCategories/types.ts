export interface ITicketCategory {
  general: { id: number; title: string };
  [key: string]: {
    id: number;
    title: string;
  };
}

export interface ITicketCategoryEdit {
  [key: string]: {
    id?: number;
    title: string;
  };
}

export enum ETicketCategory {
  title = "title",
}
