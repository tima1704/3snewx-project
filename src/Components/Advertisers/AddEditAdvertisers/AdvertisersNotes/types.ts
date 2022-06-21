export interface IAdvertNotes {
  id: string;
  advertId: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  adminId: number;
  adminName: string;
}

export interface IEditAdvertNotes {
  id: string;
  text: string;
  advertId: string | number;
}
