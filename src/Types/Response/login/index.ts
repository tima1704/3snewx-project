export interface ILoginData {
  userName: string;
  password: string;
}

export interface ResILogin {
  key: string;
  expiredAt: string;
}

export interface ErrILogin {
  code: number;
  message: string;
  error: string;
}
