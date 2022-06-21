export interface IDocumentAdvert {
  name: string;
  created_at: string;
  title: string;
  hash: string;
}

export interface IDocumentEditAdvert {
  hash?: string | "new";
  title: string;
}

export interface IDocumnetsAdvert {
  documents: IDocumentAdvert[];
  page: number;
  totalCount: number;
  countPerPage: 20;
}
