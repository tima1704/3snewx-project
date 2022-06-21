import axios from "axios";

import {
  IPaymentAffiliate,
  IPaymentEdit,
} from "Components/Partners/AffiliateManagment/PaymentTab/types";

import { IAffiliatePrimaryInfo } from "Components/Partners/AffiliateManagment/PrimaryInfoTab/types";
import { IAffiliate } from "Pages/Cabinet/Partners/AffiliateManagment/AffiliateMangmentTable/types";
import { IAvailablePayment, ITag } from "Types";

import { ISuccessRes } from "Types/Response";

import { API_AFFILIATES } from "Constants/APIConstants";
import { ErrorUtil } from "Helpers/CustomFunc";
import HttpHeadersAuthorization from "Helpers/HttpHeaders";

interface AffialiteListRes {
  affiliate: IAffiliate[];
  page: string;
  totalItem: string;
}

export async function fetchAffiliateListApi(filter?: any) {
  return axios
    .get<AffialiteListRes>(API_AFFILIATES.API_AFFILIATES, {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

interface IMainInfoAffiliateRes {
  trafficSources: {
    [id: string]: string;
  };
  messengers: {
    [lang: string]: {
      id: number;
      title: string;
    }[];
  };
  managers: { id: string; title: string }[];
}

export async function fetchAffiliateMainInfoFormApi() {
  return axios
    .get<ISuccessRes<IMainInfoAffiliateRes>>(
      API_AFFILIATES.API_AFFILIATE_MAIN_INFO,
      {
        headers: HttpHeadersAuthorization(),
      }
    )
    .then((res) => {
      const data = {
        trafficSources: Object.entries(
          res.data.data.trafficSources
        ).map(([value, label]) => ({ label, value })),
        messengers: res.data.data.messengers,
        managers: res.data.data.managers.map(
          (tag): ITag => ({ value: tag.id, label: tag.title })
        ),
      };

      return data;
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

interface IResTag {
  id: string;
  title: string;
}

export async function fetchAffiliateApi(id: string) {
  return axios
    .get(API_AFFILIATES.API_AFFILIATE_ID(id), {
      headers: HttpHeadersAuthorization(),
    })
    .then((res) => {
      const data = res.data;
      return {
        data: {
          email: data.email,
          status: data.status,
          address1: data.address1,
          address2: data.address2,
          city: data.city,
          country: data.country,
          zip_code: data.zipCode,
          note: data.note,
          allowed_sub_account: data.allowedSubAccount,
          disallowed_sub_account: data.disallowedSubAccount,
          traffic_source: data.traffic_source,
          category: data.categories?.map(
            (category: IResTag): ITag => ({
              value: category.id,
              label: category.title,
            })
          ),
          tag: data.tags?.map(
            (tag: IResTag): ITag => ({
              value: tag.id,
              label: tag.title,
            })
          ),
          manager_id: data.manager.id || "",
          referer_desc: data.refererDesc,
          referral_percent: data.referralPercent,
          hide_conversion_percent: data.hideConversionPercent,
        },
        id: data.id,
      };
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function saveAffiliatePrimaryInfo(
  id: string,
  data: IAffiliatePrimaryInfo
) {
  const sendData = {
    email: data.email,
    plain_password: data.plain_password,
    manager_id: data.manager_id,
    status: data.status,
    referral_percent: data.referral_percent,
    address1: data.address1,
    address2: data.address2,
    city: data.city,
    country: data.country,
    zip_code: data.zip_code,
    referer_desc: data.referer_desc,
    note: data.note,
    allowed_sub_account: data.allowed_sub_account,
    disallowed_sub_account: data.disallowed_sub_account,
    hide_conversion_percent: data.hide_conversion_percent,
    traffic_source: data.traffic_source,
    traffic_geo: data.traffic_geo,
    messenger: [],
    category: data.category?.map((category) => category.value),
    tag: data.tag?.map((tag) => tag.value),
  };

  return axios.post(
    id === "new"
      ? API_AFFILIATES.API_AFFILIATE_NEW
      : API_AFFILIATES.API_AFFILIATE_EDIT_ID(id),
    id === "new"
      ? {
          affiliate: sendData,
        }
      : {
          affiliate_edit: sendData,
        },
    {
      headers: HttpHeadersAuthorization(),
    }
  );
}

export async function fetchAvailablePaymentAffiliatesApi() {
  return axios
    .get<ISuccessRes<IAvailablePayment[]>>(
      API_AFFILIATES.API_AFFILIATE_AVAILABLE_PAYMENT,
      {
        headers: HttpHeadersAuthorization(),
      }
    )
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function fetchAffiliatePaymentInfo(id: string) {
  return axios
    .get<ISuccessRes<IPaymentAffiliate[]>>(
      API_AFFILIATES.API_AFFILIATE_PAYMENT_INFO(id),
      {
        headers: HttpHeadersAuthorization(),
      }
    )
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function saveAffiliatePayment(id: string, data: IPaymentEdit) {
  return axios.post(
    API_AFFILIATES.API_AFFILIATE_PAYMENT_METHOD_SAVE(id),
    {
      affiliate_payment: data,
    },
    {
      headers: HttpHeadersAuthorization(),
    }
  );
}

export async function deleteAffiliatePayment(
  idAffiliate: string,
  idPaymentMethod: string
) {
  return axios
    .delete(
      API_AFFILIATES.API_AFFILIATE_DELETE_PAYMENT_METHOD(
        idAffiliate,
        idPaymentMethod
      ),
      {
        headers: HttpHeadersAuthorization(),
      }
    )
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}
