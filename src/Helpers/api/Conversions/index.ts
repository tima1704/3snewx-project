import axios from "axios";
import { IConversions } from "Components/Conversions/types";
import { API_CONVERSIONS } from "Constants/APIConstants";
import { ISuccessRes } from "Types/Response";
import { ErrorUtil } from "Helpers/CustomFunc";
import HttpHeadersAuthorization from "Helpers/HttpHeaders";

interface IDataConversions {
  conversions: IConversions[];
  page: number;
  totalCount: number;
}

export async function fetchConversions() {
  return axios
    .get<ISuccessRes<IDataConversions>>(API_CONVERSIONS.API_CONVERSIONS, {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function aproveDeclineConversion(
  conversionId: string | number,
  method: "approve" | "decline"
) {
  return axios
    .post(API_CONVERSIONS.API_CONVERSION_APROVE_DECLINE(conversionId, method), undefined, {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}
