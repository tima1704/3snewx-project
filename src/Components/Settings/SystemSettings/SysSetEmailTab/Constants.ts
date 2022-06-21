export enum EnumEmail {
  type = "type",
  protocol = "protocol",
  server = "server",
  port = "port",
  user = "user",
  password = "password",
}

export interface ISettingsEmail {
  id?: number;
  type?: "system" | "announcements" | "weekly_summaries";
  protocol: "smtp_ssl";
  server: string;
  port: string;
  user: string;
  password: string;
}

export const placeholerEmailServer: ISettingsEmail[] = [
  {
    id: 1,
    password: "",
    protocol: "smtp_ssl",
    user: "",
    server: "",
    port: "",
    type: "system",
  }, {
    id: 2,
    password: "",
    protocol: "smtp_ssl",
    user: "",
    server: "",
    port: "",
    type: "system",
  },
];
