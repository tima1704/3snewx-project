import { TTabsStatistics } from "Components/Statisticks/types";
import Config from "Configs";
const { apiHost } = Config;

const API_STATISTIC = apiHost + "/statistic";

export const API_STATISTICS_TABS = (tab: TTabsStatistics) =>
  API_STATISTIC + "/" + tab;
