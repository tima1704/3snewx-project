import { URL_HOME, URL_NEWS } from "Constants/URLConstants";
import {
  URL_OFFER,
  URL_STATISTICS,
  URL_ADVERTISERS,
  URL_PARTNERS,
  URL_USERS,
  URL_TICKETS,
  URL_BILLING,
  URL_TASKS,
  URL_CONVERSIONS,
  URL_SETTINGS,
} from "Constants/URLConstants/URLCabinet";
import { IMainMenu } from ".";

export const MainMenuItems: IMainMenu[] = [
  { title: "Dashboard", to: URL_HOME },
  { title: "Statistics", to: URL_STATISTICS.URL_STATISTICS },
  {
    title: "Offers",
    to: URL_OFFER.URL_OFFER,
    bottomContainer: [
      { title: "Offer Main", to: URL_OFFER.URL_OFFERS },
      { title: "Offer Draft", to: URL_OFFER.URL_OFFERS_DRAFT },
    ],
  },
  { title: "Advertisers", to: URL_ADVERTISERS.URL_ADVERTISERS },
  {
    title: "Affiliates",
    to: URL_PARTNERS.URL_PARTNERS,
    bottomContainer: [
      {
        title: "Affiliate management",
        to: URL_PARTNERS.URL_PARTNERS_MANAGMENT,
      },
      {
        title: "Affiliates an auth log",
        to: URL_PARTNERS.URL_PARTNERS_AFFILIATES_AN_AUTH_LOG,
      },
      { title: "Testing links", to: URL_PARTNERS.URL_PARTNERS_TESTING_LINKS },
      { title: "TOP affiliates", to: URL_PARTNERS.URL_PARTNERS_TOP_AFFILIATES },
    ],
  },
  { title: "Admins", to: URL_USERS.URL_USERS },
  { title: "Tickets", to: URL_TICKETS.URL_TICKETS },
  { title: "Billing", to: URL_BILLING.URL_BILLING },
  { title: "Tasks", to: URL_TASKS.URL_TASKS },
  { title: "News", to: URL_NEWS },
  {
    title: "Settings",
    to: URL_SETTINGS.URL_SETTINGS,
    bottomContainer: [
      { title: "System settings", to: URL_SETTINGS.URL_SYSTEM_SETTINGS },
      {
        title: "Affiliate dashboard design",
        to: URL_SETTINGS.URL_SETTINGS_DASHBOARD,
      },
      { title: "Content", to: URL_SETTINGS.URL_CONTENT_SETTINGS },
    ],
  },
  { title: "Conversions", to: URL_CONVERSIONS.URL_CONVERSIONS },
];
