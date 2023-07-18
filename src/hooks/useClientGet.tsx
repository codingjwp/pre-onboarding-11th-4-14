import { AxiosInstance } from "axios";
import { useEffect } from "react";


export const useClientGet = (httpClient: AxiosInstance)  => {

  useEffect(() => {
    if (!httpClient) return; 
  }, [httpClient])

  const getSearchList = async (query: string): Promise<SearchProps> => {
    try {

      if (query === '')
        return { types: "ERROR", data: 'No query data' };
      const fetchUrl = `sick?q=${query}`;
      const check = await getCachData(fetchUrl);
      if (check !== null ) return check as SearchProps;
      console.info("calling api");

      const res =  await httpClient.get(fetchUrl);
      await setCachData(fetchUrl, res.data);

      return res.data.length === 0
        ? { types: "ERROR", data: 'No search data' }
        : { types: "SUCCES", data: res.data }
    }catch(error: any) {
      if (error.response) 
        return { types: "ERROR", data: error.message }
      else if (error.request)
        return { types: "NO_RESPONSE", data: error.message }
      else 
        return { types: "REQUEST_FAILED", data: error.message }
    }
  }
  return { getSearchList };
}

async function getCachData(query: string) {
  const checkNul = localStorage.getItem(query);
  if (!checkNul) return null ;
  const cachData: CachDataProps = JSON.parse(checkNul);
  const timeCheck = Date.now();
  if (cachData.expireTime < timeCheck) {
    localStorage.removeItem(query);
    return null;
  }
  return cachData.data.length === 0
    ? { types: "ERROR", data: 'No search data' }
    : {types: "SUCCES", data: cachData.data};
}

function removeCachData() {
  let size = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i) as string;
    size += (key.length + (localStorage.getItem(key) as string).length) * 2
  }
  const kbSize = (size / 1024);
  if (kbSize  > 4000) {
    let count = localStorage.length - 1;
    const half = count / 2
    while (count) {
      if (count < half) return ;
      localStorage.removeItem(localStorage.key(count) as string);
      --count;
    }
  }
  return ;
}

async function setCachData(query: string, data : ApiData) {
  removeCachData();
  const timeCheck = Date.now() + 60 * 60 * 1000;
  const stringData = JSON.stringify({expireTime : timeCheck,data: data });
  localStorage.setItem(query, stringData);
}


type ApiData = { sickCd: string, sickNm: string }[];

interface CachDataProps {
  expireTime: number;
  data: ApiData;
}

interface SearchSucess {
  types: "SUCCES";
  data: ApiData;
}

interface SearchError {
  types: "ERROR" | "NO_RESPONSE" | "REQUEST_FAILED";
  data: string;
}

export type SearchProps = SearchSucess | SearchError;