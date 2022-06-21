import { GENERAL } from "Constants/AppConstants/Settings/SystemSettings";
import {
  URL_SYSTEM_SETTINGS_EMAIL,
  URL_SYSTEM_SETTINGS_GENERAL,
  URL_SYSTEM_SETTINGS_OFFERS_TRACKING_DOMAINS,
  URL_SYSTEM_SETTINGS_SECURITY,
  URL_SYSTEM_SETTINGS_TRACKING_DOMAINS,
  URL_SYSTEM_SETTINGS_TRAFFICBACK,
  URL_SYSTEM_SETTINGS_URLS,
} from "Constants/URLConstants/URLCabinet/URLSettings";

interface URL {
  title: string;
  to: string;
  includes: string;
}

const SYSTEM_SETTINGS_URL: URL[] = [
  { title: "General", to: URL_SYSTEM_SETTINGS_GENERAL, includes: GENERAL },
  {
    title: "Tracking domains",
    to: URL_SYSTEM_SETTINGS_TRACKING_DOMAINS,
    includes: URL_SYSTEM_SETTINGS_TRACKING_DOMAINS,
  },
  {
    title: "URLs",
    to: URL_SYSTEM_SETTINGS_URLS,
    includes: URL_SYSTEM_SETTINGS_URLS,
  },
  {
    title: "E-mail",
    to: URL_SYSTEM_SETTINGS_EMAIL,
    includes: URL_SYSTEM_SETTINGS_EMAIL,
  },
  {
    title: "Trafficback",
    to: URL_SYSTEM_SETTINGS_TRAFFICBACK,
    includes: URL_SYSTEM_SETTINGS_TRAFFICBACK,
  },
  {
    title: "Security",
    to: URL_SYSTEM_SETTINGS_SECURITY,
    includes: URL_SYSTEM_SETTINGS_SECURITY,
  },
  {
    title: "Offers - Tracking Domains",
    to: URL_SYSTEM_SETTINGS_OFFERS_TRACKING_DOMAINS,
    includes: URL_SYSTEM_SETTINGS_OFFERS_TRACKING_DOMAINS,
  },
];

export default SYSTEM_SETTINGS_URL;
