export interface IEmailTemplates {
  [type: string]: {
    [lang: string]: {
      available: boolean;
      template: {
        title: string;
        body: string;
        status: string;
        subject: string;
      };
    };
  };
}

export interface IEmailTemplatesEdit {
  [lang: string]: {
    type: string;
    available: boolean;
    template: {
      title: string;
      body: string;
      status: string;
      subject: string;
    };
  };
}

export enum EEmailTemplates {
  title = "title",
  subject = "subject",
  status = "status",
  body = "body",
}
