export interface IPaymentSyst {
  id?: number;
  title: string;
  currencie: string[];
  fields: IFields[];
}

export interface IFields {
  title: string;
  required: boolean;
}
