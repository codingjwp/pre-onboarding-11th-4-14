import { AxiosInstance } from "axios";
import { useEffect } from "react";

export const useClientGet = (httpClient: AxiosInstance)  => {
  useEffect(() => {
    if (!httpClient) return; 
  }, [httpClient])

  const getSearchList = async (query: string): Promise<SearchProps> => {
    try {
      if (query === '') return { types: "ERROR", data: 'No query data' }
      console.info("calling api");
      const res =  await httpClient.get(`sick?q=${query}`);
      if (res.data.length === 0) return { types: "ERROR", data: 'No search data' }
      return { types: "SUCCES", data: res.data }
    }catch(error: any) {
      if (error.response) return { types: "ERROR", data: error.message }
      else if (error.request) return { types: "NO_RESPONSE", data: error.message }
      else return { types: "REQUEST_FAILED", data: error.message }
    }
  }
  return { getSearchList };
}

interface SearchSucess {
  types: "SUCCES";
  data: {
    sickCd: string,
    sickNm: string
  }[];
}

interface SearchError {
  types: "ERROR" | "NO_RESPONSE" | "REQUEST_FAILED";
  data: string;
}

export type SearchProps = SearchSucess | SearchError;