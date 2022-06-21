export interface IUserGeneral {
  email: string;
  plainPassword?: string;
  //   avatar: string;
  status: "enabled" | "disabled";
  firstName: string;
  secondName: string;
  skype: string;
  telegram: string;
  phone: string;
  openingHours: string;
}

export const initialDataUserGeneral: IUserGeneral = {
  email: "",
  plainPassword: "",
  status: "enabled",
  firstName: "",
  secondName: "",
  skype: "",
  telegram: "",
  phone: "",
  openingHours: "",
};
