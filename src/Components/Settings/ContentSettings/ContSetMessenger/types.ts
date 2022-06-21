export interface IMessenger {
  general: { id: number; title: string };
  [key: string]: {
    id: number;
    title: string;
  };
}

export interface IMessengerEdit {
  [key: string]: {
    id?: number;
    title: string;
  };
}

export enum EMessenger {
  title = "title",
}
