import axios from "axios";
import { API_AUTO_COMPLETE } from "Constants/APIConstants";
import { ITag } from "Types";
import HttpHeadersAuthorization from "Helpers/HttpHeaders";

type ResObj = {
  [key: string]: string;
};

interface IAdverticer {
  id: number;
  company: string;
}

export const fetchAutocompleteAdverticer = async (
  value: string
): Promise<ITag[]> => {
  try {
    const response = await axios.get<IAdverticer[]>(
      API_AUTO_COMPLETE.API_GET_ADVERTICER,
      {
        headers: { ...HttpHeadersAuthorization() },
        params: { v: value, lang: "en" },
      }
    );
    return response.data.map(({ id, company }) => {
      return { value: id.toString(), label: company };
    });
  } catch (e) {
    console.log(e);
    // errorUtils(e, null, { deleteLocalStor: false }))
    return [];
  }
};

interface ICategories {
  id: number;
  title: string;
}

export const fetchAutocompleteCategories = async (
  value: string
): Promise<ITag[]> => {
  try {
    const response = await axios.get<ICategories[]>(
      API_AUTO_COMPLETE.API_GET_CATEGORIES,
      {
        headers: { ...HttpHeadersAuthorization() },
        params: { v: value, lang: "en" },
      }
    );

    return response.data.map(({ id, title }) => {
      return { value: id.toString(), label: title };
    });
  } catch (e) {
    console.log(e);
    // errorUtils(e, null, { deleteLocalStor: false });
    return [];
  }
};

interface IResTags {
  id: number;
  title: string;
}

export const fetchAutocompleteTags = async (value: string): Promise<ITag[]> => {
  try {
    const response = await axios.get<IResTags[]>(
      API_AUTO_COMPLETE.API_GET_TAGS,
      {
        headers: HttpHeadersAuthorization(),
        params: { v: value, lang: "en" },
      }
    );

    return response.data.map(({ id, title }) => {
      return { value: id.toString(), label: title };
    });
  } catch (e) {
    // errorUtils(e, null, { deleteLocalStor: false })
    return [];
  }
};

export const fetchAutocompleteVendor = async (
  value: string
): Promise<ITag[]> => {
  try {
    const response = await axios.get(API_AUTO_COMPLETE.API_GET_VENDORS, {
      headers: HttpHeadersAuthorization(),
      params: { v: value, lang: "en" },
    });

    if (!response.data) {
      return [];
    }

    const data = Object.keys(response.data).map((item) => {
      return { value: item, label: response.data[item] };
    });

    return data;
  } catch (e) {
    console.log(e);
    // errorUtils(e, null, { deleteLocalStor: false })
    return [];
  }
};

export const fetchAutocompleteOS = async (value: string): Promise<ITag[]> => {
  try {
    const response = await axios.get(API_AUTO_COMPLETE.API_GET_OS, {
      headers: HttpHeadersAuthorization(),
      params: { v: value, lang: "en" },
    });

    if (!response.data) {
      return [];
    }

    const data = Object.keys(response.data).map((item) => {
      return { value: item, label: response.data[item] };
    });

    return data;
  } catch (e) {
    // errorUtils(e, null, { deleteLocalStor: false })
    console.log(e);
    return [];
  }
};

interface IResAffiliates {
  id: number;
  email: string;
}

export const fetchAutocompleteAffiliates = async (
  value: string
): Promise<ITag[]> => {
  try {
    const response = await axios.get<IResAffiliates[]>(
      API_AUTO_COMPLETE.API_GET_AFFILIATES,
      {
        headers: HttpHeadersAuthorization(),
        params: { v: value, lang: "en" },
      }
    );

    if (!response.data) {
      return [];
    }

    const data = response.data.map((item) => {
      return { value: item.id.toString(), label: `${item.id} ${item.email}` };
    });

    return data;
  } catch (e) {
    // errorUtils(e, null, { deleteLocalStor: false })
    console.log(e);
    return [];
  }
};

interface IResOffers {
  id: number;
  title: string;
}

export const fetchAutocompleteOffers = async (
  value: string
): Promise<ITag[]> => {
  try {
    const response = await axios.get<IResOffers[]>(
      API_AUTO_COMPLETE.API_AC_OFFERS,
      {
        headers: HttpHeadersAuthorization(),
        params: { v: value, lang: "en" },
      }
    );

    if (!response.data) {
      return [];
    }

    const data = response.data.map((item) => {
      return { value: item.id.toString(), label: item.title };
    });

    return data;
  } catch (e) {
    console.log(e);
    //   errorUtils(e, null, { deleteLocalStor: false })
    return [];
  }
};

export const fetchAutocompleteCountry = async (
  value: string
): Promise<ITag[]> => {
  try {
    const res = await axios.get<ResObj>(API_AUTO_COMPLETE.API_AC_COUNTRY, {
      headers: HttpHeadersAuthorization(),
      params: { v: value, lang: "en" },
    });

    if (!res.data) {
      return [];
    }

    return Object.entries<string>(res.data).map((country) => ({
      label: country[1],
      value: country[0],
    }));
  } catch (e) {
    console.log(e);
    return [];

    // errorUtils(e, null, { deleteLocalStor: false })
  }
};
