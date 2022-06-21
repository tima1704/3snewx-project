export interface IGoalTemplates {
  [lang: string]: IGoalTemplate[];
}

export interface IGoalTemplate {
  id: string | number;
  title: string;
  text: string;
  lang: string;
}
