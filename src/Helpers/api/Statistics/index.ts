import axios from "axios";
import { ITableConstract } from "Components/MiniComponents/TableConstract/types";
import { TTabsStatistics } from "Components/Statisticks/types";
import { API_STATISTIC } from "Constants/APIConstants";
import { ISuccessRes } from "Types/Response";
import { ErrorUtil } from "Helpers/CustomFunc";
import HttpHeadersAuthorization from "Helpers/HttpHeaders";

import Config from "Configs";
const { apiHost } = Config;

// Statistics

export async function fetchStatistics(tab: TTabsStatistics) {
  return axios
    .get<ISuccessRes<ITableConstract>>(API_STATISTIC.API_STATISTICS_TABS(tab), {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function fetchStatisticksBreakLine(url: string) {
  return axios
    .get<ISuccessRes<ITableConstract>>(apiHost + url, {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}
