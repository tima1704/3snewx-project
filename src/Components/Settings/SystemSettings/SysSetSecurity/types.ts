export enum ESecuritySet {
  ip_whitelist = "ip_whitelist",
  secure_postback_code = "secure_postback_code",
  ignore_secure_code = "ignore_secure_code",
  check_user_session_ip = "check_user_session_ip",
}

export interface ISecuritySet {
  ip_whitelist: string[];
  secure_postback_code: string;
  ignore_secure_code: boolean;
  check_user_session_ip: boolean;
}

export const initialSecuritySetData: ISecuritySet = {
  ip_whitelist: [],
  secure_postback_code: "",
  ignore_secure_code: false,
  check_user_session_ip: true,
};
