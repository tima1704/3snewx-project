export interface IPaymentAffiliate {
  id: string;
  currency: string;
  requisites: {
    [key: string]: string;
  };
  payment: string;
}

export interface IPaymentEdit {
  payment_system_id: string;
  currency: string;
  is_default: boolean;
  requisites: {
    [key: string]: string;
  };
}

export const initialDataPaymentAffiliate: IPaymentEdit = {
  payment_system_id: "",
  currency: "",
  is_default: false,
  requisites: {},
};
