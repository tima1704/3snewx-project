import {
  URL_STATISTICS_ADVERTISERS,
  URL_STATISTICS_AFFILIATES,
  URL_STATISTICS_AFFILIATE_MANAGERS,
  URL_STATISTICS_AFFILIATE_POSTBACKS,
  URL_STATISTICS_CATEGORIES,
  URL_STATISTICS_CITIES,
  URL_STATISTICS_COMPARISON_REPORT,
  URL_STATISTICS_CONNECTION_TYPE,
  URL_STATISTICS_CONVERSIONS,
  URL_STATISTICS_COUNTRIES,
  URL_STATISTICS_CUSTOM,
  URL_STATISTICS_DAILY,
  URL_STATISTICS_DEVICES,
  URL_STATISTICS_GOALS,
  URL_STATISTICS_KPI,
  URL_STATISTICS_LANDING,
  URL_STATISTICS_MOBILE_ISP,
  URL_STATISTICS_OFFERS,
  URL_STATISTICS_OS,
  URL_STATISTICS_REFERRALS,
  URL_STATISTICS_RETENTION_RATE,
  URL_STATISTICS_SALES_MANAGER,
  URL_STATISTICS_SERVER_POSTBACKS,
  URL_STATISTICS_USER_AGENTS,
} from "Constants/URLConstants/URLCabinet/URLStatistics";
import { TabItemProps } from "Components/MiniComponents/NavigationTabs/TabItem";
import { TTabsStatistics } from "./types";

interface IStatisticsMenu extends TabItemProps {
  tab: TTabsStatistics;
}

export const URLS_STATISTICKS: IStatisticsMenu[] = [
  {
    title: "Daily",
    to: URL_STATISTICS_DAILY,
    includes: URL_STATISTICS_DAILY,
    tab: "daily",
  },
  {
    title: "Conversions",
    to: URL_STATISTICS_CONVERSIONS,
    includes: URL_STATISTICS_CONVERSIONS,
    tab: "conversions",
  },
  {
    title: "Affiliates",
    to: URL_STATISTICS_AFFILIATES,
    includes: URL_STATISTICS_AFFILIATES,
    tab: "affiliates",
  },
  {
    title: "Advertisers",
    to: URL_STATISTICS_ADVERTISERS,
    includes: URL_STATISTICS_ADVERTISERS,
    tab: "advertisers",
  },
  {
    title: "Offers",
    to: URL_STATISTICS_OFFERS,
    includes: URL_STATISTICS_OFFERS,
    tab: "offers",
  },
  {
    title: "Sales managers",
    to: URL_STATISTICS_SALES_MANAGER,
    includes: URL_STATISTICS_SALES_MANAGER,
    tab: "sales-managers",
  },
  {
    title: "Affiliate managers",
    to: URL_STATISTICS_AFFILIATE_MANAGERS,
    includes: URL_STATISTICS_AFFILIATE_MANAGERS,
    tab: "affiliate-managers",
  },
  {
    title: "Referrals",
    to: URL_STATISTICS_REFERRALS,
    includes: URL_STATISTICS_REFERRALS,
    tab: "referrals",
  },
  {
    title: "Countries",
    to: URL_STATISTICS_COUNTRIES,
    includes: URL_STATISTICS_COUNTRIES,
    tab: "countries",
  },
  {
    title: "Cities",
    to: URL_STATISTICS_CITIES,
    includes: URL_STATISTICS_CITIES,
    tab: "cities",
  },
  {
    title: "OS",
    to: URL_STATISTICS_OS,
    includes: URL_STATISTICS_OS,
    tab: "os",
  },
  {
    title: "Goals",
    to: URL_STATISTICS_GOALS,
    includes: URL_STATISTICS_GOALS,
    tab: "goals",
  },
  {
    title: "Devices",
    to: URL_STATISTICS_DEVICES,
    includes: URL_STATISTICS_DEVICES,
    tab: "devices",
  },
  {
    title: "Mobile isp",
    to: URL_STATISTICS_MOBILE_ISP,
    includes: URL_STATISTICS_MOBILE_ISP,
    tab: "mobile-isp",
  },
  {
    title: "Connection type",
    to: URL_STATISTICS_CONNECTION_TYPE,
    includes: URL_STATISTICS_CONNECTION_TYPE,
    tab: "connection-type",
  },
  {
    title: "Landing",
    to: URL_STATISTICS_LANDING,
    includes: URL_STATISTICS_LANDING,
    tab: "landing",
  },
  {
    title: "Affiliate postbacks",
    to: URL_STATISTICS_AFFILIATE_POSTBACKS,
    includes: URL_STATISTICS_AFFILIATE_POSTBACKS,
    tab: "affiliate-postbacks",
  },
  {
    title: "Server postbacks",
    to: URL_STATISTICS_SERVER_POSTBACKS,
    includes: URL_STATISTICS_SERVER_POSTBACKS,
    tab: "server-postbacks",
  },
  {
    title: "Retention rate",
    to: URL_STATISTICS_RETENTION_RATE,
    includes: URL_STATISTICS_RETENTION_RATE,
    tab: "retention-rate",
  },
  {
    title: "Kpi",
    to: URL_STATISTICS_KPI,
    includes: URL_STATISTICS_KPI,
    tab: "kpi",
  },
  {
    title: "Categories",
    to: URL_STATISTICS_CATEGORIES,
    includes: URL_STATISTICS_CATEGORIES,
    tab: "categories",
  },
  {
    title: "User Agents",
    to: URL_STATISTICS_USER_AGENTS,
    includes: URL_STATISTICS_USER_AGENTS,
    tab: "user-agents",
  },
  {
    title: "Custom",
    to: URL_STATISTICS_CUSTOM,
    includes: URL_STATISTICS_CUSTOM,
    tab: "custom",
  },
  {
    title: "Comparison report",
    to: URL_STATISTICS_COMPARISON_REPORT,
    includes: URL_STATISTICS_COMPARISON_REPORT,
    tab: "comparison-report",
  },
];
