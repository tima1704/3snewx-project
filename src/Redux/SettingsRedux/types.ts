import { ICategory } from "../../Components/Settings/ContentSettings/ContSetCategories/types";
import { IEmailTemplates } from "../../Components/Settings/ContentSettings/ContSetEmailTemplates/types";
import { IGoalSet } from "../../Components/Settings/ContentSettings/ContSetGoals/types";
import { IMessenger } from "../../Components/Settings/ContentSettings/ContSetMessenger/types";
import { IPaymentSyst } from "../../Components/Settings/ContentSettings/ContSetPaymentSyst/types";
import { ITagSettings } from "../../Components/Settings/ContentSettings/ContSetTags/Types";
import { ITicketCategory } from "../../Components/Settings/ContentSettings/ContSetTicketCategories/types";
import { ITrafficSources } from "../../Components/Settings/ContentSettings/ContSetTrafficSources/types";
import { ISettingsEmail } from "../../Components/Settings/SystemSettings/SysSetEmailTab/Constants";
import { ISetUrls } from "../../Components/Settings/SystemSettings/SysSetUrls/types";
import { ITrackingDomains } from "../../Components/Settings/SystemSettings/SysSetDomains/types";
import { ICurrence } from "../../Components/Settings/ContentSettings/ContSetCurrencies/types";
import { IKPITemplates } from "../../Components/Settings/ContentSettings/ContSetOffersKPITemplates/types";
import { IDescriptionsTemplates } from "../../Components/Settings/ContentSettings/ContSetOffersDescriptionTemplates/types";
import { IGoalTemplates } from "../../Components/Settings/ContentSettings/ContSetOffersGoalTemplates/types";

export interface ISettingsState {
  mail_server?: ISettingsEmail[];
  tags?: ITagSettings[];
  goals?: IGoalSet[];
  categories?: ICategory[];
  traffciSources?: ITrafficSources[];
  offer_kpi_template?: IKPITemplates;
  offer_description_template?: IDescriptionsTemplates;
  offer_goal_template?: IGoalTemplates;
  ticket_type?: ITicketCategory[];
  messenger?: IMessenger[];
  paymnet_systems?: IPaymentSyst[];
  email_templates?: IEmailTemplates;
  tracking_url?: ISetUrls[];
  tracking_domain?: ITrackingDomains[];
  currencies?: {
    currencie: ICurrence[];
    default_currencie: string;
  };
}

export enum SettingsActionTypes {
  SETTINGS_RESET = "SETTINGS_RESET",
  SETTINGS_FETSH_EMAIL = "SETTINGS_FETSH_EMAIL",
  SETTINGS_FILL_EMAIL = "SETTINGS_FILL_EMAIL",
  SETTINGS_FETCH_TAGS = "SETTINGS_FETCH_TAGS",
  SETTINGS_FILL_TAGS = "SETTINGS_FILL_TAGS",
  SETTINGS_FETCH_GOALS = "SETTINGS_FETCH_GOALS",
  SETTINGS_FILL_GOALS = "SETTINGS_FILL_GOALS",
  SETTINGS_FETCH_CATEGORIES = "SETTINGS_FETCH_CATEGORIES",
  SETTINGS_FILL_CATEGORIES = "SETTINGS_FILL_CATEGORIES",
  SETTINGS_FETCH_TRAFFIC_SOURCES = "SETTINGS_FETCH_TRAFFIC_SOURCES",
  SETTINGS_FILL_TRAFFIC_SOURCES = "SETTINGS_FILL_TRAFFIC_SOURCES",
  SETTINGS_FETCH_TICKET_TYPE = "SETTINGS_FETCH_TICKET_TYPE",
  SETTINGS_FILL_TICKET_TYPE = "SETTINGS_FILL_TICKET_TYPE",
  SETTINGS_FETCH_MESSENGER = "SETTINGS_FETCH_MESSENGER",
  SETTINGS_FILL_MESSENGER = "SETTINGS_FILL_MESSENGER",
  SETTINGS_FETCH_PAYMENT_SYSTEM = "SETTINGS_FETCH_PAYMENT_SYSTEM",
  SETTINGS_FILL_PAYMENT_SYSTEM = "SETTINGS_FILL_PAYMENT_SYSTEM",
  SETTINGS_FETCH_EMAIL_TEMPLATES = "SETTINGS_FETCH_EMAIL_TEMPLATES",
  SETTINGS_FILL_EMAIL_TEMPLATES = "SETTINGS_FILL_EMAIL_TEMPLATES",
  SETTINGS_FETCH_TRACKING_DOMAINS_AND_URLS = "SETTINGS_FETCH_TRACKING_DOMAINS_AND_URLS",
  SETTINGS_FILL_TRACKING_DOMAINS_AND_URLS = "SETTINGS_FILL_TRACKING_DOMAINS_AND_URLS",
  SETTINGS_FETCH_CURRENCES = "SETTINGS_FETCH_CURRENCES",
  SETTINGS_FILL_CURRENCES = "SETTINGS_FILL_CURRENCES",
  SETTINGS_FETCH_OFFER_KPI_TEMPLATE = "SETTINGS_FETCH_OFFER_KPI_TEMPLATE",
  SETTINGS_FILL_OFFER_KPI_TEMPLATE = "SETTINGS_FILL_OFFER_KPI_TEMPLATE",
  SETTINGS_FETCH_OFFER_DESCRIPTIONS_TEMPLATE = "SETTINGS_FETCH_OFFER_DESCRIPTIONS_TEMPLATE",
  SETTINGS_FILL_OFFER_DESCRIPTIONS_TEMPLATE = "SETTINGS_FILL_OFFER_DESCRIPTIONS_TEMPLATE",
  SETTINGS_FETCH_OFFER_GOAL_TEMPLATE = "SETTINGS_FETCH_OFFER_GOAL_TEMPLATE",
  SETTINGS_FILL_OFFER_GOAL_TEMPLATE = "SETTINGS_FILL_OFFER_GOAL_TEMPLATE",
}

export type SettingsActions =
  | setingsReset
  | SetFillEmail
  | SetFetchEmail
  | SetFetchTags
  | SetFillTags
  | SetFetchGoals
  | setFillGoals
  | SetFetchCategories
  | setFillCategories
  | SetFetchTrafficSources
  | SetFillTrafficSources
  | SetFetchTicketCategory
  | SetFillTicketCategory
  | SetFetchMessenger
  | SetFillMessenger
  | SetFetchPeaymnetSystem
  | SetFillPaymentSystem
  | SetFetchEmailTemplates
  | SetFillEmailTemplates
  | SetFetchTrackingDomainAndUrls
  | SetFillTrackingDomainAndUrls
  | SetFetchCurriencies
  | SetFillCurrencies
  | setFetchOfferKpiTemplate
  | setFillOfferKPITemplate
  | setFetchOfferDescriptionsTemplate
  | setFillOfferDescriptionsTemplate
  | setFetchOfferGoalTemplate
  | setFillOfferGoalTemplate;

interface setingsReset {
  type: SettingsActionTypes.SETTINGS_RESET;
}

interface SetFetchEmail {
  type: SettingsActionTypes.SETTINGS_FETSH_EMAIL;
}

interface SetFillEmail {
  type: SettingsActionTypes.SETTINGS_FILL_EMAIL;
  payload: ISettingsEmail[];
}

interface SetFetchTags {
  type: SettingsActionTypes.SETTINGS_FETCH_TAGS;
}

interface SetFillTags {
  type: SettingsActionTypes.SETTINGS_FILL_TAGS;
  payload: ITagSettings[];
}

interface SetFetchGoals {
  type: SettingsActionTypes.SETTINGS_FETCH_GOALS;
}

interface setFillGoals {
  type: SettingsActionTypes.SETTINGS_FILL_GOALS;
  payload: IGoalSet[];
}

interface SetFetchCategories {
  type: SettingsActionTypes.SETTINGS_FETCH_CATEGORIES;
}

interface setFillCategories {
  type: SettingsActionTypes.SETTINGS_FILL_CATEGORIES;
  payload: ICategory[];
}

interface SetFetchTrafficSources {
  type: SettingsActionTypes.SETTINGS_FETCH_TRAFFIC_SOURCES;
}

interface SetFillTrafficSources {
  type: SettingsActionTypes.SETTINGS_FILL_TRAFFIC_SOURCES;
  payload: ITrafficSources[];
}

interface SetFetchTicketCategory {
  type: SettingsActionTypes.SETTINGS_FETCH_TICKET_TYPE;
}

interface SetFillTicketCategory {
  type: SettingsActionTypes.SETTINGS_FILL_TICKET_TYPE;
  payload: ITicketCategory[];
}

interface SetFetchMessenger {
  type: SettingsActionTypes.SETTINGS_FETCH_MESSENGER;
}

interface SetFillMessenger {
  type: SettingsActionTypes.SETTINGS_FILL_MESSENGER;
  payload: IMessenger[];
}

interface SetFetchPeaymnetSystem {
  type: SettingsActionTypes.SETTINGS_FETCH_PAYMENT_SYSTEM;
}

interface SetFillPaymentSystem {
  type: SettingsActionTypes.SETTINGS_FILL_PAYMENT_SYSTEM;
  payload: IPaymentSyst[];
}

interface SetFetchEmailTemplates {
  type: SettingsActionTypes.SETTINGS_FETCH_EMAIL_TEMPLATES;
}

interface SetFillEmailTemplates {
  type: SettingsActionTypes.SETTINGS_FILL_EMAIL_TEMPLATES;
  payload: IEmailTemplates[];
}

interface SetFetchTrackingDomainAndUrls {
  type: SettingsActionTypes.SETTINGS_FETCH_TRACKING_DOMAINS_AND_URLS;
}

interface SetFillTrackingDomainAndUrls {
  type: SettingsActionTypes.SETTINGS_FILL_TRACKING_DOMAINS_AND_URLS;
  payload: { tracking_url: ISetUrls[]; tracking_domain: ITrackingDomains[] };
}

interface SetFetchCurriencies {
  type: SettingsActionTypes.SETTINGS_FETCH_CURRENCES;
}

interface SetFillCurrencies {
  type: SettingsActionTypes.SETTINGS_FILL_CURRENCES;
  payload: { currencie: ICurrence[]; default_currencie: string };
}

interface setFetchOfferKpiTemplate {
  type: SettingsActionTypes.SETTINGS_FETCH_OFFER_KPI_TEMPLATE;
}

interface setFillOfferKPITemplate {
  type: SettingsActionTypes.SETTINGS_FILL_OFFER_KPI_TEMPLATE;
  payload: IKPITemplates;
}

interface setFetchOfferDescriptionsTemplate {
  type: SettingsActionTypes.SETTINGS_FETCH_OFFER_DESCRIPTIONS_TEMPLATE;
}

interface setFillOfferDescriptionsTemplate {
  type: SettingsActionTypes.SETTINGS_FILL_OFFER_DESCRIPTIONS_TEMPLATE;
  payload: IDescriptionsTemplates;
}

interface setFetchOfferGoalTemplate {
  type: SettingsActionTypes.SETTINGS_FETCH_OFFER_GOAL_TEMPLATE;
}

interface setFillOfferGoalTemplate {
  type: SettingsActionTypes.SETTINGS_FILL_OFFER_GOAL_TEMPLATE;
  payload: IGoalTemplates;
}
