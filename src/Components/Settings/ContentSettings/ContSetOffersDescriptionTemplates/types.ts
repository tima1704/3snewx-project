export interface IDescriptionsTemplates {
  [lang: string]: IDescriptionsTemplate[];
}

export interface IDescriptionsTemplate {
  id: string | number;
  title: string;
  text: string;
  lang: string;
}
