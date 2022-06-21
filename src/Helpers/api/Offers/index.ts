import axios from "axios";
import { IOffersTabGeneral } from "Components/Offers/AEOfferTabs/AEOfferGeneralTab/types";
import { ITrackingDomains } from "Components/Settings/SystemSettings/SysSetDomains/types";
import { API_OFFERS } from "Constants/APIConstants";

import { IMeta, ITag } from "Types";
import { IOfferList } from "Types/Offers";
import HttpHeadersAuthorization from "Helpers/HttpHeaders";

import { ISuccessRes } from "Types/Response";
import {
  ILanding,
  ITrackingTab,
} from "Components/Offers/AEOfferTabs/AEOfferTrackingTab/types";
import { IPostbacks } from "Components/Offers/AEOfferTabs/AEOfferPostbacksTab/types";
import { IAffiliatesOffer } from "Components/Offers/AEOfferTabs/AEOfferAffiliatesTab/types";
import {
  ICapOffer,
  ICapsOffer,
} from "Components/Offers/AEOfferTabs/AEOfferCapsTab/types";
import { ITargetingOffer } from "Components/Offers/AEOfferTabs/AEOfferTargetingTab/types";
import { IPayouts } from "Components/Offers/AEOfferTabs/AEOfferPayoutsTab/types";
import { IFilterOffers } from "Components/Offers/OffersMiniComponents/HeaderFilter/types";
import { ErrorUtil } from "Helpers/CustomFunc";
import { IAffiliateOffer, IRequests } from "Redux/OffersRedux/types";

interface ResOffersList {
  offers: IOfferList[];
  meta: IMeta;
}

export async function fetchOffersList(
  offerDraft: boolean = false,
  filter?: IFilterOffers
) {
  return axios
    .get<ResOffersList>(
      offerDraft ? API_OFFERS.API_OFFERS_DRAFT : API_OFFERS.API_OFFERS,
      {
        headers: HttpHeadersAuthorization(),
        params: {
          "offer_filter[tilte]": filter?.title,
          "offer_filter[advert_id]": filter?.advert_id?.value,
          "offer_filter[category]": filter?.category.map(
            (category) => category.value
          ),
          "offer_filter[status]": filter?.status,
          "offer_filter[privacy_level]": filter?.privacy_level,
          "offer_filter[country]": filter?.country,
          "offer_filter[traffic_sources]": filter?.traffic_sources,
          "offer_filter[tags]": filter?.tags,
          size: filter?.size,
          page: filter?.page,
        },
      }
    )
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function fetchOfferCard(offerDraft: boolean = false, id: string) {
  return axios
    .get(API_OFFERS.API_OFFERS_CARD(offerDraft, id), {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

interface IResOffersMainInfo {
  availableLanguage?: string[];
  trackingDomain?: ITrackingDomains[];
  trafficSources?: { [key: number]: string };
  descriptionTemplates?: [];
  kpiTemplates?: [];
  goalTemplates?: {
    id: string;
    title: string;
  }[];
}

export async function fetchOffersMainInfo() {
  return axios
    .get<IResOffersMainInfo>(API_OFFERS.API_GET_MAIN_INFO_OFFER, {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export function saveOfferGeneral(
  data: IOffersTabGeneral,
  draft: boolean,
  newStatus: boolean,
  id?: string
) {
  const dataSend = {
    tab: "general",
    offer: {
      title: data.title,
      description: data.description
        ? Object.entries(data.description).map(([lang, text]) => ({
            lang,
            text,
          }))
        : undefined,
      kpi: data.kpi
        ? Object.entries(data.kpi).map(([lang, text]) => ({
            lang,
            text,
          }))
        : undefined,
      paid_goal: data.paid_goal
        ? Object.entries(data.paid_goal).map(([lang, text]) => ({
            lang,
            text,
          }))
        : undefined,
      advert_id: data.advert_id?.value,
      status: data.status,
      status_notice: data.sendEmail,
      tag: data.tag?.map((tag) => tag.value),
      privacy_level: data.privacy_level,
      is_top: data.is_top,
      release_date: data.release_date,
      stop_date: data.stop_date,
      send_before_stoping: data.send_before_stoping,
      category: data.categories?.map((tag) => tag.value),
      notes: data.notes,
      reconciliation: data.reconciliation,
      payouts: data.payouts,
      traffic_source: data.traffic_source,
    },
  };

  return axios.post(
    newStatus
      ? draft
        ? API_OFFERS.API_ADD_OFFER_DRAFT
        : API_OFFERS.API_ADD_OFFER
      : id
      ? draft
        ? API_OFFERS.API_EDIT_OFFER_DRAFT(id)
        : API_OFFERS.API_EDIT_OFFER(id)
      : "",
    dataSend,
    {
      headers: HttpHeadersAuthorization(),
    }
  );
}

function createLang(data: { lang: string; text: string }[]) {
  const langObject: { [key: string]: string } = {};
  data.forEach((item) => {
    langObject[item.lang] = item.text;
  });
  return langObject;
}

export async function fetchOffersGeneral(draft: boolean, id: string) {
  return axios
    .get<ISuccessRes>(
      draft
        ? API_OFFERS.API_GET_OFFER_DRAFT_INFO(id, "general")
        : API_OFFERS.API_GET_OFFER_INFO(id, "general"),
      {
        headers: HttpHeadersAuthorization(),
      }
    )
    .then((res) => {
      const data = res.data.data;
      const newData: IOffersTabGeneral = {
        title: data.title || "",
        status: data.status,
        sendEmail: true,
        privacy_level: data.privacy_level,
        is_top: data.is_top,
        reconciliation: data.reconciliation,
        release_date: data.release_date && new Date(data.release_date),
        stop_date: data.stop_date && new Date(data.stop_date),
        send_before_stoping: data.send_before_stoping,
        categories: data.category || [],
        notes: data.notes,
        payouts: data.payouts,
        traffic_source: data.traffic_source || [],
        tag: data.tag || [],
        logo: data.logo,
      };

      if (data.kpi && data.kpi.length > 0) {
        newData.kpi = createLang(data.kpi);
      }
      if (data.paid_goal && data.paid_goal.length > 0) {
        newData.paid_goal = createLang(data.paid_goal);
      }
      if (data.description && data.description.length > 0) {
        newData.description = createLang(data.description);
      }

      if (data.advert) {
        newData.advert_id = { label: data.advert.name, value: data.advert.id };
      }

      return newData;
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function uploadOfferLogoGeneral(
  file: File,
  id: string,
  draft: boolean
) {
  const formData = new FormData();
  formData.append("offer[logo]", file);
  return axios
    .post(API_OFFERS.API_UPLOAD_OFFER_LOGO(id, draft), formData, {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function deleteOfferLogoGeneral(id: string, draft: boolean) {
  return axios
    .delete(API_OFFERS.API_DELETE_OFFER_LOGO(id, draft), {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function saveOfferTracking(
  data: ITrackingTab,
  draft: boolean,
  id: string
) {
  const sendData = {
    tab: "tracking",
    offer: data,
  };

  return axios.post(
    draft ? API_OFFERS.API_EDIT_OFFER_DRAFT(id) : API_OFFERS.API_EDIT_OFFER(id),
    sendData,
    {
      headers: HttpHeadersAuthorization(),
    }
  );
}

interface ResLanding {
  previewUrl: string;
  title: string;
  trackingUrl: string;
  type: string;
}

export async function fetchOfferTracking(draft: boolean, id: string) {
  return axios
    .get(
      draft
        ? API_OFFERS.API_GET_OFFER_DRAFT_INFO(id, "tracking")
        : API_OFFERS.API_GET_OFFER_INFO(id, "tracking"),
      {
        headers: HttpHeadersAuthorization(),
      }
    )
    .then((res) => {
      const data = res.data.data;

      const newData: ITrackingTab = {
        tracking_url: data.tracking_url || "",
        preview_url: data.preview_url || "",
        additional_macro: data.additional_macro || "",
        trafficback_url: data.trafficback_url || "",
        tracking_domain_url:
          data?.tracking_domain_url?.value?.toString() ||
          data?.tracking_domain_url?.toString() ||
          "",
        redirect_type: data.redirect_type || "",
        allow_deeplinks: data.allow_deeplinks,
        allow_impressions: data.allow_impressions,
        landing_page: [],
      };

      if (data.landing_page) {
        data.landing_page.forEach((landing: ResLanding) => {
          const newLanding: ILanding = {
            title: landing.title || "",
            tracking_url: landing.trackingUrl || "",
            preview_url: landing.previewUrl || "",
            type: landing.type || "",
          };
          newData.landing_page.push(newLanding);
        });
      }

      return newData;
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function saveOffersPostBack(
  data: IPostbacks,
  draft: boolean,
  id: string
) {
  const sendData = {
    tab: "postback",
    offer: data,
  };

  return axios.post(
    draft ? API_OFFERS.API_EDIT_OFFER_DRAFT(id) : API_OFFERS.API_EDIT_OFFER(id),
    sendData,
    {
      headers: HttpHeadersAuthorization(),
    }
  );
}

export async function fetchOffersPostBacks(draft: boolean, id: string) {
  return axios
    .get(
      draft
        ? API_OFFERS.API_GET_OFFER_DRAFT_INFO(id, "postback")
        : API_OFFERS.API_GET_OFFER_INFO(id, "postback"),
      {
        headers: HttpHeadersAuthorization(),
      }
    )
    .then((res) => {
      const data = res.data.data;
      return data;
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function saveOffersAffiliate(
  data: IAffiliatesOffer,
  draft: boolean,
  id: string
) {
  const sendData = {
    tab: "affiliate",
    offer: {
      enabled_affiliate: data.enabled_affiliate.map((tag) => tag.value),
      disabled_affiliate: data.disabled_affiliate.map((tag) => tag.value),
    },
  };

  return axios.post(
    draft ? API_OFFERS.API_EDIT_OFFER_DRAFT(id) : API_OFFERS.API_EDIT_OFFER(id),
    sendData,
    {
      headers: HttpHeadersAuthorization(),
    }
  );
}

export async function fetchOffersAffiliate(draft: boolean, id: string) {
  return axios
    .get(
      draft
        ? API_OFFERS.API_GET_OFFER_DRAFT_INFO(id, "affiliate")
        : API_OFFERS.API_GET_OFFER_INFO(id, "affiliate"),
      {
        headers: HttpHeadersAuthorization(),
      }
    )
    .then((res) => {
      const data = res.data.data;
      const returnData: IAffiliatesOffer = {
        enabled_affiliate: [],
        disabled_affiliate: [],
      };

      if (data.enabled_affiliate) {
        returnData.enabled_affiliate = data.enabled_affiliate.map(
          (tag: ITag) => ({
            label: tag.label + " " + tag.value,
            value: tag.label.toString(),
          })
        );
      }

      if (data.disabled_affiliate) {
        returnData.disabled_affiliate = data.disabled_affiliate.map(
          (tag: ITag) => ({
            label: tag.label + " " + tag.value,
            value: tag.label.toString(),
          })
        );
      }

      return returnData;
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function saveOffersCaps(
  data: ICapsOffer,
  draft: boolean,
  id: string
) {
  const sendData = {
    tab: "cap",
    offer: {
      cap: data.cap.map((cap) => ({
        ...cap,
        affiliate: cap.affiliate?.map((tag) => tag.value),
      })),
    },
  };

  return axios.post(
    draft ? API_OFFERS.API_EDIT_OFFER_DRAFT(id) : API_OFFERS.API_EDIT_OFFER(id),
    sendData,
    {
      headers: HttpHeadersAuthorization(),
    }
  );
}

interface CapRes {
  affiliate: { value: string; label: string }[];
  affiliate_type: string;
  conversion_status: string[];
  goal: string;
  hide: boolean;
  over_cap: boolean;
  timeframe: string;
  timezone: string;
  type: string;
  value: string;
}

export async function fetchOffersCaps(draft: boolean, id: string) {
  return axios
    .get(
      draft
        ? API_OFFERS.API_GET_OFFER_DRAFT_INFO(id, "cap")
        : API_OFFERS.API_GET_OFFER_INFO(id, "cap"),
      {
        headers: HttpHeadersAuthorization(),
      }
    )
    .then((res) => {
      const capData: ICapOffer[] = [];

      if (res.data.data.cap) {
        res.data.data.cap.forEach((element: CapRes) => {
          const affiliate = element.affiliate.map((tag) => ({
            value: tag.value,
            label: `${tag.value} ${tag.label}`,
          }));

          capData.push({ ...element, affiliate, id: undefined });
        });
      }

      return { cap: capData };
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function saveTargetingOffer(
  data: ITargetingOffer,
  draft: boolean,
  id: string
) {
  const sendData = {
    enable_restriction: data.enable_restriction,
    country: data.country,
    country_exclude: data.country_exclude,
    region: data.region,
    region_exclude: data.region_exclude,
    city: data.city,
    city_exclude: data.city_exclude,
    os: data.os,
    os_exclude: data.os_exclude,
    device: data.device,
    device_exclude: data.device_exclude,
    mobile_carrier: data.mobile_carrier.map((mb) => mb.mobileCarier),
    mobile_carrier_exclude: data.mobile_carrier_exclude,
    connection_type: data.connection_type,
    vendor: data.vendors.map((tag) => tag.value),
    browser: data.browser,
    ip: data.ip,
    click_ttl: data.CSL,
    click_ttl_custom: data.CSLcustom,
    sub: data.sub,
    block_by_empty_sub: data.block_by_empty_sub,
    minimal_click_ttl: data.minimal_click_ttl,
    click_minimal_click_ttl: data.click_minimal_click_ttl,
    personal_targeting: data.personal_targeting.map((psData) => ({
      country: psData.country,
      region: psData.region,
      city: psData.city,
      connection_type: psData.connection_type,
      os: psData.os,
      mobile_carrier: psData.mobile_carrier.map((mb) => mb.mobileCarier),
      device: psData.device,
      vendor: psData.vendors.map((tag) => tag.value),
      browser: psData.browser,
      ip: psData.ip,
      affiliate: psData.affiliate?.map((tag) => tag.value),
      country_exclude: psData.country_exclude,
      region_exclude: psData.region_exclude,
      city_exclude: psData.city_exclude,
      os_exclude: psData.os_exclude,
      device_exclude: psData.device_exclude,
      mobile_carrier_exclude: psData.mobile_carrier_exclude,
      sub: psData.sub,
      block_by_empty_sub: psData.block_by_empty_sub,
      click_ttl: psData.CSL,
      click_ttl_custom: psData.CSLcustom,
      minimal_click_ttl: psData.minimal_click_ttl,
      click_minimal_click_ttl: psData.click_minimal_click_ttl,
    })),
  };

  return axios.post(
    draft ? API_OFFERS.API_EDIT_OFFER_DRAFT(id) : API_OFFERS.API_EDIT_OFFER(id),
    {
      tab: "targeting",
      offer: sendData,
    },
    {
      headers: HttpHeadersAuthorization(),
    }
  );
}

export async function fetchOfferTargeting(draft: boolean, id: string) {
  return axios
    .get(
      draft
        ? API_OFFERS.API_GET_OFFER_DRAFT_INFO(id, "targeting")
        : API_OFFERS.API_GET_OFFER_INFO(id, "targeting"),
      {
        headers: HttpHeadersAuthorization(),
      }
    )
    .then((res) => {
      return res.data.data;
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function savePayoutOffers(
  data: IPayouts,
  draft: boolean,
  id: string
) {
  const payout: {
    affiliates?: ITag[] | string[];
    country: string[];
    country_exclude: boolean;
    city: string[];
    city_exclude: boolean;
    device: string[];
    os: string[];
    sub: { [key: number]: string };
    total: string;
    payouts: string;
    currency: string;
    goal_value: string;
    goal_title: string;
    payment_type: string;
    tracking_url: string;
    type: string;
  }[] = [];

  data.general.forEach((general) => {
    const generalSend = {
      type: "general",
      ...general,
    };
    payout.push(generalSend);
  });

  data.personal.forEach((personal) => {
    const personalSend = {
      ...personal,
      type: "personal",
      affiliates: personal.affiliates?.map((tag) => tag.value),
    };
    payout.push(personalSend);
  });

  return axios.post(
    draft ? API_OFFERS.API_EDIT_OFFER_DRAFT(id) : API_OFFERS.API_EDIT_OFFER(id),
    draft
      ? {
          tab: "payout",
          offer: {
            payout,
          },
        }
      : {
          tab: "payout",
          offer: {
            payout,
          },
        },
    {
      headers: HttpHeadersAuthorization(),
    }
  );
}

export async function fetchPayoutOffersApi(draft: boolean, id: string) {
  return axios
    .get(
      draft
        ? API_OFFERS.API_GET_OFFER_DRAFT_INFO(id, "payout")
        : API_OFFERS.API_GET_OFFER_INFO(id, "payout"),
      {
        headers: HttpHeadersAuthorization(),
      }
    )
    .then((res) => {
      const general: any[] = [];
      const personal: any[] = [];

      if (res.data.data.payout) {
        res.data.data.payout.forEach((element: any) => {
          if (element.type === "general") {
            general.push(element);
          } else {
            const dataPersonal = {
              ...element,
              affiliates: element.affiliates.map(
                (item: { id: string; title: string }): ITag => ({
                  label: item.id + " " + item.title,
                  value: item.id,
                })
              ),
            };
            personal.push(dataPersonal);
          }
        });
      }

      return { general, personal };
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function publickOfferDraftApi(id: string) {
  return axios
    .post(API_OFFERS.API_OFFER_PUBLIC_OFFER_DRAFT(id), undefined, {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function fetchAffiliateEnebled(
  id: string,
  draft: boolean,
  filter?: any
) {
  return axios
    .get<ISuccessRes<IAffiliateOffer>>(
      API_OFFERS.API_OFFER_CARD_AFFILIATE_ENEBLED(id, draft),
      {
        headers: HttpHeadersAuthorization(),
        params: { size: 10, ...filter },
      }
    )
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function fetchAffiliateDisabled(
  id: string,
  draft: boolean,
  filter?: any
) {
  return axios
    .get<ISuccessRes<IAffiliateOffer>>(
      API_OFFERS.API_OFFER_CARD_AFFILIATE_DISABLED(id, draft),
      {
        headers: HttpHeadersAuthorization(),
        params: { size: 10, ...filter },
      }
    )
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function saveAffiliateOffer(
  id: string,
  draft: boolean,
  status: "enabled" | "disabled",
  affiliate_id: number | string
) {
  return axios.post(
    API_OFFERS.API_OFFER_CARD_AFFILIATE_ADD(id, draft),
    {
      offer_add_affiliate: {
        affiliate_id,
        status,
      },
    },
    {
      headers: HttpHeadersAuthorization(),
    }
  );
}

export async function fetchRequestsOfferCard(
  offerId: string | number,
  filter?: object
) {
  return axios
    .get<ISuccessRes<IRequests>>(API_OFFERS.API_OFFER_CARD_REQUESTS(offerId), {
      headers: HttpHeadersAuthorization(),
      params: { size: 20, ...filter },
    })
    .then((res) => res.data.data);
}

export async function offerRequestsChangeStatus(
  offerId: string,
  requestId: string | number,
  status: "reject" | "accept"
) {
  return axios
    .post(
      API_OFFERS.API_OFFER_REQUESTS_STATUS(offerId, requestId, status),
      undefined,
      {
        headers: HttpHeadersAuthorization(),
      }
    )
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}
