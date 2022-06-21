import axios from "axios";

import { IDocumnetsAdvert } from "Components/Advertisers/AddEditAdvertisers/AdvertisersDocuments/types";

import {
  IAdvertNotes,
  IEditAdvertNotes,
} from "Components/Advertisers/AddEditAdvertisers/AdvertisersNotes/types";
import { IAdvertItem } from "Components/Advertisers/types";
import { IAdvert } from "Redux/AdvertRedux/types";
import { ISuccessRes } from "Types/Response";


import { API_ADVERT } from "Constants/APIConstants";

import { ErrorUtil } from "Helpers/CustomFunc";
import HttpHeadersAuthorization from "Helpers/HttpHeaders";

interface IAdvertList {
  adverts: IAdvertItem[];
  page: number;
  totalCount: number;
}

export async function fetchAdvertsList() {
  return axios
    .get<ISuccessRes<IAdvertList>>(API_ADVERT.API_ADVERTISERS, {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function fetchAdvertInfo(id: string | number) {
  return axios
    .get<ISuccessRes<IAdvert>>(API_ADVERT.API_ADVERT_ID(id), {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

interface IResAdvertNew {
  advertId: number;
}

export async function saveAdvertPrimaryInfo(
  id: string | number,
  data: IAdvert
) {
  const dataSend = {
    company: data.company,
    manager_id: data.manager_id,
    allowed_ip: data.allowed_ip,
    allowed_sub_account: data.allowed_sub_account,
    disallowed_sub_account: data.disallowed_sub_account,
    forbid_change_postback_status: data.forbid_change_postback_status,
  };

  if (id === "new") {
    return axios.post<ISuccessRes<IResAdvertNew>>(
      API_ADVERT.API_ADVERT_NEW,
      { advert: dataSend },
      {
        headers: HttpHeadersAuthorization(),
      }
    );
  } else {
    return axios.post<ISuccessRes>(
      API_ADVERT.API_ADVERT_EDIT(id),
      {
        tab: "primary",
        advert: dataSend,
      },
      {
        headers: HttpHeadersAuthorization(),
      }
    );
  }
}

export async function saveAdvertRequisites(data: IAdvert) {
  return axios.post<ISuccessRes>(
    API_ADVERT.API_ADVERT_EDIT(data.id),
    {
      tab: "requisite",
      advert: {
        bank_info: data.bank_info,
        vat_code: data.vat_code,
        registration_number: data.registration_number,
        address1: data.address1,
        address2: data.address2,
        city: data.city,
        country: data.country,
        zip_code: data.zip_code,
        currency: data.currency,
        payment_method: data.payment_method,
      },
    },
    {
      headers: HttpHeadersAuthorization(),
    }
  );
}

export async function saveAdvertPostbacks(data: IAdvert) {
  return axios.post<ISuccessRes>(
    API_ADVERT.API_ADVERT_EDIT(data.id),
    {
      tab: "postback",
      advert: {
        secure_postback_code: data.secure_postback_code,
        // s2s: data.s2s,
      },
    },
    {
      headers: HttpHeadersAuthorization(),
    }
  );
}

interface IResNotes {
  notes: IAdvertNotes[];
  page: number;
  totalCount: number;
}

export async function fetchAdvertNotes(advertId: string | number) {
  return axios
    .get<ISuccessRes<IResNotes>>(API_ADVERT.API_ADVERT_NOTES(advertId), {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function saveAdvertNotes({
  id,
  text,
  advertId,
}: IEditAdvertNotes) {
  if (id === "new") {
    return axios.post<ISuccessRes>(
      API_ADVERT.API_ADVERT_NOTES_NEW(advertId),
      {
        advert_notes: {
          text,
        },
      },
      {
        headers: HttpHeadersAuthorization(),
      }
    );
  } else {
    return axios.post<ISuccessRes>(
      API_ADVERT.API_ADVERT_NOTES_EDIT(advertId, id),
      {
        advert_notes: {
          text,
        },
      },
      {
        headers: HttpHeadersAuthorization(),
      }
    );
  }
}

export async function deleteAdvertNotes(
  advertId: string | number,
  notesId: string
) {
  return axios
    .delete(API_ADVERT.API_ADVERT_NOTES_DELETE(advertId, notesId), {
      headers: HttpHeadersAuthorization(),
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}

export async function fetchAdvertDocuments(
  advertId: string | number,
  filter?: object
) {
  return axios
    .get<ISuccessRes<IDocumnetsAdvert>>(API_ADVERT.API_ADVERT_DOCUMENTS(advertId), {
      headers: HttpHeadersAuthorization(),
      params: { size: 20, ...filter },
    })
    .catch((e) => {
      ErrorUtil(e);
      throw e;
    });
}
