import axios from "axios";
import {
  ICategory,
  ICategoryEdit,
} from "Components/Settings/ContentSettings/ContSetCategories/types";
import { ICurrence } from "Components/Settings/ContentSettings/ContSetCurrencies/types";
import { IGoalSet } from "Components/Settings/ContentSettings/ContSetGoals/types";
import {
  IMessenger,
  IMessengerEdit,
} from "Components/Settings/ContentSettings/ContSetMessenger/types";
import {
  IDescriptionsTemplate,
  IDescriptionsTemplates,
} from "Components/Settings/ContentSettings/ContSetOffersDescriptionTemplates/types";
import {
  IGoalTemplate,
  IGoalTemplates,
} from "Components/Settings/ContentSettings/ContSetOffersGoalTemplates/types";
import {
  IKPITemplate,
  IKPITemplates,
} from "Components/Settings/ContentSettings/ContSetOffersKPITemplates/types";
import { IPaymentSyst } from "Components/Settings/ContentSettings/ContSetPaymentSyst/types";
import { ITagSettings } from "Components/Settings/ContentSettings/ContSetTags/Types";
import {
  ITicketCategory,
  ITicketCategoryEdit,
} from "Components/Settings/ContentSettings/ContSetTicketCategories/types";
import { ITrafficSources } from "Components/Settings/ContentSettings/ContSetTrafficSources/types";
import { ITrackingDomains } from "Components/Settings/SystemSettings/SysSetDomains/types";
import { ISettingsEmail } from "Components/Settings/SystemSettings/SysSetEmailTab/Constants";
import { IGeneralData } from "Components/Settings/SystemSettings/SysSetGeneralTab/types";
import { ISecuritySet } from "Components/Settings/SystemSettings/SysSetSecurity/types";
import { ITrafficbackSet } from "Components/Settings/SystemSettings/SysSetTrafficbackTab/types";
import { ISetUrls } from "Components/Settings/SystemSettings/SysSetUrls/types";
import { API_SETTINGS } from "Constants/APIConstants";
import { ISuccessRes } from "Types/Response";
import { ErrorUtil } from "Helpers/CustomFunc";
import HttpHeadersAuthorization from "Helpers/HttpHeaders";

export async function fetchSettingsGeneral() {
  return axios
    .get<ISuccessRes<IGeneralData>>(API_SETTINGS.API_SETTINGS_GENERAL, {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export function saveSettingsGeneral(data: IGeneralData) {
  return axios.post<ISuccessRes>(
    API_SETTINGS.API_SETTINGS_GENERAL,
    {
      setting_general: data,
    },
    { headers: HttpHeadersAuthorization() }
  );
}

export async function fetchSettingsEmail() {
  return axios
    .get<ISuccessRes<ISettingsEmail[]>>(API_SETTINGS.API_SETTINGS_EMAIL, {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export function saveSettingsEmail(data: ISettingsEmail) {
  return axios.post<ISuccessRes>(
    data.id
      ? API_SETTINGS.API_SETTINGS_EMAIL_EDIT(data.id)
      : API_SETTINGS.API_SETTINGS_EMAIL_ADD,
    { mail_server: { ...data, id: undefined } },
    {
      headers: HttpHeadersAuthorization(),
    }
  );
}

export async function deleteSettingsEmail(id: number) {
  return axios
    .delete<ISuccessRes>(API_SETTINGS.API_SETTINGS_EMAIL_REMOVE(id), {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export function sendTestEmailSettings(id: number, email: string) {
  return axios.post<ISuccessRes>(
    API_SETTINGS.API_SETTINGS_EMAIL_SEND(id),
    { email },
    {
      headers: HttpHeadersAuthorization(),
    }
  );
}

export async function fetchSettingsTraficback() {
  return axios
    .get<ISuccessRes<ITrafficbackSet>>(API_SETTINGS.API_SETTINGS_TRAFFICKBACK, {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export function saveSettingsTrafficBack(data: ITrafficbackSet) {
  return axios.post<ISuccessRes>(
    API_SETTINGS.API_SETTINGS_TRAFFICKBACK,
    { trafficback: data },
    {
      headers: HttpHeadersAuthorization(),
    }
  );
}

export async function fetchSettingsSecurity() {
  return axios
    .get<ISuccessRes<ISecuritySet>>(API_SETTINGS.API_SETTINGS_SECURITY, {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export function saveSettingsSecurity(data: ISecuritySet) {
  return axios.post<ISuccessRes>(
    API_SETTINGS.API_SETTINGS_SECURITY,
    { security: data },
    {
      headers: HttpHeadersAuthorization(),
    }
  );
}

interface tagsData {
  tags: ITagSettings[];
}

export async function fetchSettingsTags() {
  return axios
    .get<ISuccessRes<tagsData>>(API_SETTINGS.GET_API_SETTINGS("tag"), {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export function saveSettingsTag(data: ITagSettings) {
  return axios.post<ISuccessRes>(
    API_SETTINGS.UPDATE_API_SETTINGS("tag", data.id),
    { tag: { name: data.name, title: data.title } },
    {
      headers: HttpHeadersAuthorization(),
    }
  );
}

export async function deleteSettingsTag(tagId: number) {
  return axios
    .delete<ISuccessRes>(API_SETTINGS.DELETE_API_SETTINGS("tag", tagId), {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function fetchSettingsCategories() {
  return axios
    .get<ISuccessRes<ICategory[]>>(API_SETTINGS.GET_API_SETTINGS("category"), {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function saveSettingsCategories(data: ICategoryEdit) {
  const category: ICategoryEdit = {};
  for (var lang in data) {
    category[lang] = { title: data[lang].title };
  }

  return axios
    .post<ISuccessRes>(
      API_SETTINGS.UPDATE_API_SETTINGS("category", data.general.id),
      {
        category_lang: {
          category,
        },
      },
      {
        headers: HttpHeadersAuthorization(),
      }
    )
    .catch((e) => {
      console.log("catch Axios");
      throw e;
    });
}

export async function deleteSettingsCategory(id: number) {
  return axios
    .delete<ISuccessRes>(API_SETTINGS.DELETE_API_SETTINGS("category", id), {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function fetchTrafficSources() {
  return axios
    .get<ISuccessRes<ITrafficSources[]>>(
      API_SETTINGS.GET_API_SETTINGS("traffic-source"),
      {
        headers: HttpHeadersAuthorization(),
      }
    )
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function saveSettingsTrafficSources(data: ICategoryEdit) {
  const traffic_source: ICategoryEdit = {};
  for (var lang in data) {
    traffic_source[lang] = { title: data[lang].title };
  }

  return axios.post<ISuccessRes>(
    API_SETTINGS.UPDATE_API_SETTINGS("traffic-source", data.general.id),
    {
      traffic_source_lang: {
        traffic_source,
      },
    },
    {
      headers: HttpHeadersAuthorization(),
    }
  );
}

export async function deleteSettingsTrafficSources(id: number) {
  return axios
    .delete<ISuccessRes>(
      API_SETTINGS.DELETE_API_SETTINGS("traffic-source", id),
      {
        headers: HttpHeadersAuthorization(),
      }
    )
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function fetchSettingsOfferKPITemplates() {
  return axios
    .get<ISuccessRes<IKPITemplates>>(
      API_SETTINGS.GET_API_SETTINGS("offer-kpi-template"),
      {
        headers: HttpHeadersAuthorization(),
      }
    )
    .then((res) => res.data.data)
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function saveSettingsOfferKpiTemplate(data: IKPITemplate) {
  return axios.post(
    data.id === "new"
      ? API_SETTINGS.UPDATE_API_SETTINGS("offer-kpi-template")
      : API_SETTINGS.UPDATE_API_SETTINGS("offer-kpi-template", data.id),
    {
      offer_kpi_template: {
        lang: data.lang,
        title: data.title,
        text: data.text,
      },
    },
    {
      headers: HttpHeadersAuthorization(),
    }
  );
}

export async function deleleteSettingsOfferKpiTemplate(id: number | string) {
  return axios
    .delete(API_SETTINGS.DELETE_API_SETTINGS("offer-kpi-template", id), {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function fetchSettingsOfferDescriptionsTemplates() {
  return axios
    .get<ISuccessRes<IDescriptionsTemplates>>(
      API_SETTINGS.GET_API_SETTINGS("offer-description-template"),
      {
        headers: HttpHeadersAuthorization(),
      }
    )
    .then((res) => res.data.data)
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function saveSettingsOfferDescriptionsTemplate(
  data: IDescriptionsTemplate
) {
  return axios.post(
    data.id === "new"
      ? API_SETTINGS.UPDATE_API_SETTINGS("offer-description-template")
      : API_SETTINGS.UPDATE_API_SETTINGS("offer-description-template", data.id),
    {
      offer_description_template: {
        lang: data.lang,
        title: data.title,
        text: data.text,
      },
    },
    {
      headers: HttpHeadersAuthorization(),
    }
  );
}

export async function deleleteSettingsOfferDescriptionsTemplate(
  id: number | string
) {
  return axios
    .delete(
      API_SETTINGS.DELETE_API_SETTINGS("offer-description-template", id),
      {
        headers: HttpHeadersAuthorization(),
      }
    )
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function fetchSettingsOfferGoalTemplates() {
  return axios
    .get<ISuccessRes<IGoalTemplates>>(
      API_SETTINGS.GET_API_SETTINGS("offer-goal-template"),
      {
        headers: HttpHeadersAuthorization(),
      }
    )
    .then((res) => res.data.data)
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function saveSettingsOfferGoalTemplate(data: IGoalTemplate) {
  return axios.post(
    data.id === "new"
      ? API_SETTINGS.UPDATE_API_SETTINGS("offer-goal-template")
      : API_SETTINGS.UPDATE_API_SETTINGS("offer-goal-template", data.id),
    {
      offer_goal_template: {
        lang: data.lang,
        title: data.title,
        text: data.text,
      },
    },
    {
      headers: HttpHeadersAuthorization(),
    }
  );
}

export async function deleleteSettingsOfferGoalTemplate(id: number | string) {
  return axios
    .delete(API_SETTINGS.DELETE_API_SETTINGS("offer-goal-template", id), {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function fetchSettingsTicketCategory() {
  return axios
    .get<ISuccessRes<ITicketCategory[]>>(
      API_SETTINGS.GET_API_SETTINGS("ticket-type"),
      {
        headers: HttpHeadersAuthorization(),
      }
    )
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function saveSettingsTicketCategory(data: ITicketCategory) {
  const ticket_type: ITicketCategoryEdit = {};
  for (var lang in data) {
    ticket_type[lang] = { title: data[lang].title };
  }

  return axios.post<ISuccessRes>(
    API_SETTINGS.UPDATE_API_SETTINGS("ticket-type", data.general.id),
    {
      ticket_type_lang: {
        ticket_type,
      },
    },
    {
      headers: HttpHeadersAuthorization(),
    }
  );
}

export async function deleteSettingsTicketCategory(id: number) {
  return axios
    .delete<ISuccessRes>(API_SETTINGS.DELETE_API_SETTINGS("ticket-type", id), {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function fetchSettingsMessenger() {
  return axios
    .get<ISuccessRes<IMessenger[]>>(
      API_SETTINGS.GET_API_SETTINGS("messenger"),
      {
        headers: HttpHeadersAuthorization(),
      }
    )
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function saveSettingsMessenger(data: IMessenger) {
  const messenger_type: IMessengerEdit = {};
  for (var lang in data) {
    messenger_type[lang] = { title: data[lang].title };
  }

  return axios.post<ISuccessRes>(
    API_SETTINGS.UPDATE_API_SETTINGS("messenger", data.general.id),
    {
      messenger_type_lang: {
        messenger_type,
      },
    },
    {
      headers: HttpHeadersAuthorization(),
    }
  );
}

export async function deleteSettingsMessenger(id: number) {
  return axios
    .delete<ISuccessRes>(API_SETTINGS.DELETE_API_SETTINGS("messenger", id), {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function fetchSettingsPaymentSustyms() {
  return axios
    .get<ISuccessRes<IPaymentSyst[]>>(
      API_SETTINGS.GET_API_SETTINGS("payment_system"),
      {
        headers: HttpHeadersAuthorization(),
      }
    )
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function saveSettingsPaymentSystem(data: IPaymentSyst) {
  return axios
    .post<ISuccessRes>(
      API_SETTINGS.UPDATE_API_SETTINGS("payment_system", data.id),
      { payment_system: { ...data, id: undefined } },
      {
        headers: HttpHeadersAuthorization(),
      }
    )
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function deleteSettingsPaymentSystem(id: number) {
  return axios
    .delete<ISuccessRes>(
      API_SETTINGS.DELETE_API_SETTINGS("payment_system", id),
      {
        headers: HttpHeadersAuthorization(),
      }
    )
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export function fetchSettingsEmailTemplates() {}

export function saveSettings() {}
export function deleteSettings(id: string) {}

interface TrackingUrl {}

interface TrackingDomainUrls {
  tracking_domain: ITrackingDomains[];
  tracking_site_url: ISetUrls[];
  tracking_url: {
    admin_url: null | TrackingUrl | ISetUrls;
    affiliate_network_url: null | TrackingUrl | ISetUrls;
    api_url: null | TrackingUrl | ISetUrls;
    impressions_domain: null | TrackingUrl | ISetUrls;
  };
}

export async function fetchSettingsTrackingDomainUrls() {
  return axios
    .get<ISuccessRes<TrackingDomainUrls>>(
      API_SETTINGS.GET_API_SETTINGS("tracking-domain"),
      {
        headers: HttpHeadersAuthorization(),
      }
    )
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function saveTrackingDomains(data: ITrackingDomains) {
  return axios.post<ISuccessRes>(
    API_SETTINGS.UPDATE_API_SETTINGS("tracking-domain", data.id),
    { tracking_domain: { ...data, id: undefined, is_default: undefined } },
    {
      headers: HttpHeadersAuthorization(),
    }
  );
}

export async function saveTrackingUrl(data: ISetUrls) {
  return axios.post<ISuccessRes>(
    API_SETTINGS.UPDATE_API_SETTINGS(
      "tracking-url",
      data.id || (data.type !== "tracking_site_url" ? data.type : undefined)
    ),
    { tracking_url: { ...data, id: undefined, type: undefined } },
    {
      headers: HttpHeadersAuthorization(),
    }
  );
}

interface ResCurrience {
  currencie: {
    [currence: string]: ICurrence;
  };
  default_currencie: string;
}

export async function fetchSettingsCurrences() {
  return axios
    .get<ISuccessRes<ResCurrience>>(
      API_SETTINGS.GET_API_SETTINGS("currencie"),
      {
        headers: HttpHeadersAuthorization(),
      }
    )
    .then((res) => {
      const currencie = Object.values(res.data.data.currencie);
      return { currencie, default_currencie: res.data.data.default_currencie };
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function saveSttingsCurrence(data: ICurrence) {
  return axios.post<ISuccessRes>(
    API_SETTINGS.UPDATE_API_SETTINGS("currencie", data.code),
    {
      currencie: {
        code: data.code,
        min_payment: data.minPayment,
        status: data.status,
      },
    },
    {
      headers: HttpHeadersAuthorization(),
    }
  );
}

export async function fetchSettingsGoals() {
  return axios
    .get<ISuccessRes<IGoalSet[]>>(API_SETTINGS.GET_API_SETTINGS("goal"), {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function saveSttingsGoals(goal: IGoalSet, id?: string) {
  return axios.post<ISuccessRes>(
    API_SETTINGS.UPDATE_API_SETTINGS("goal", id),
    {
      goal: {
        title: goal.title,
      },
    },
    {
      headers: HttpHeadersAuthorization(),
    }
  );
}

export async function deleteGoal(id: string | number) {
  return axios
    .delete(API_SETTINGS.DELETE_API_SETTINGS("goal", id), {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}
