import { useRef, useState, MouseEvent } from 'react';
import styled from 'styled-components';
import SearchBar from "../components/SearchBar";
import SearchList from '../components/SearchList';
import {ReactComponent as LeftBannerSvg } from '../assets/leftbanner.svg'
import {ReactComponent as RightBannerSvg } from '../assets/rightbanner.svg'
import { useSearchGet } from '../api/SearchInterface';
import { SearchProps } from "../hooks/useClientGet";


const SearchBanner = () => {
  const [listOpen, setListOpen] = useState(false);
  const [listData, setListData] = useState<SearchProps | null>(null);
  const [number, setNumber] = useState(-1);
  const searchListRef = useRef<HTMLUListElement | null>(null);
  const getSearchData = useSearchGet();

  const SearchGetApi = async (query: string) => {
    if (getSearchData) {
      const res = await getSearchData(query);
      if (res.types === 'SUCCES') setListData({types: 'SUCCES', data: res.data})
      else setListData({types: res.types, data: res.data});
    }
  }
  const SearchClickChoose = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    console.log("test :", e.target);
  }

  return (
  <SearchBannerCenter>
    <LeftBannerSvg aria-label='left-banner-image' />
    <Searchcomponent>
      <SearchBar setListOpen={setListOpen} SearchGetApi={SearchGetApi} setNumber={setNumber} />
      <SearchList listOpen={listOpen} targetNum={number} listData={listData} searchListRef={searchListRef} SearchClickChoose={SearchClickChoose} />
    </Searchcomponent>
    <RightBannerSvg aria-label='right-banner-image' />
  </SearchBannerCenter>
  )
}

const SearchBannerCenter = styled.div`
  width: 100%;
  height: 100vh;
  margin: auto 0;
  display: grid;
  grid-template-columns: 1fr 30.625rem 1fr;
  justify-content: center;
  align-items: center;
  background-color: #385BD6BB;
`

const Searchcomponent = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 30.625rem;
  margin: 0 auto;

`

export default SearchBanner;