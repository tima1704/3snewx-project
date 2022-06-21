export interface IKPITemplates {
  [lang: string]: IKPITemplate[];
}

export interface IKPITemplate {
  id: string | number;
  title: string;
  text: string;
  lang: string;
}
