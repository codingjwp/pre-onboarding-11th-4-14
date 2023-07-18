import { ReactNode, createContext, useContext } from "react"; 
import { AxiosInstance } from "axios";
import { useClientGet, SearchProps } from "../hooks/useClientGet";

interface SearchProviderProps {
  httpClient: AxiosInstance;
  children: ReactNode;
}

interface ContextValueProps {
  getSearchList: (query: string) => Promise<SearchProps>
}

const SearchConText = createContext<ContextValueProps | null>(null);

export const useSearchGet = () => {
  const context = useContext(SearchConText);
  if (context) return context.getSearchList;
}

const SearchProvider = ({httpClient, children}: SearchProviderProps) => {
  const { getSearchList } = useClientGet(httpClient);

  return (
    <SearchConText.Provider value ={{getSearchList}}>
      {children}
    </SearchConText.Provider>
  )
}
export default SearchProvider;