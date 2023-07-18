import { 
  useRef, useState, useEffect, useCallback,
  KeyboardEvent, Dispatch,
  SetStateAction, ChangeEvent } from 'react';
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
  const [timeIndex, setTimeIndex] = useState(0);
  const [focusIndex, setFocusIndex] = useState(-1);
  const searchListRef = useRef<HTMLUListElement | null>(null);
  const getSearchData = useSearchGet();

  useEffect(() => {
    return () => { clearTimeout(timeIndex) }
  }, [])

  useEffect(() => {
    const searchListOutside = (e: MouseEvent) => {
      if (searchListRef.current && !searchListRef.current.contains(e.target as Node)) {
        setListOpen(false);
      }
    }
    if (listOpen) document.addEventListener('mousedown', searchListOutside);
    else  document.removeEventListener('mousedown', searchListOutside);
    return () => {
      document.removeEventListener('mousedown', searchListOutside);
    }
  }, [listOpen, searchListRef])

  const SearchGetApi = async (query: string) => {
    if (getSearchData) {
      const res = await getSearchData(query);
      if (res.types === 'SUCCES') setListData({types: 'SUCCES', data: res.data})
      else setListData({types: res.types, data: res.data});
    }
  }

  const getApiDate = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    clearTimeout(timeIndex);
    const index = setTimeout(async() => {
      setFocusIndex(-1);
      SearchGetApi(e.target.value);
    }, 350);
    setTimeIndex(index);
  }


  const searchListKeyEvent = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'KeyA'  || e.nativeEvent.isComposing) return;
    if (!(e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "Enter")) return;

    const ul = document.getElementById('searchUl');

    if (e.key === "ArrowRight") KeyEvnetFunc.ArrowRight(setFocusIndex, ul as HTMLElement);
    else if (e.key === "ArrowLeft") KeyEvnetFunc.ArrowLeft(setFocusIndex);
    else if (e.key === "Enter") KeyEvnetFunc.Enter(e, ul as HTMLElement, setFocusIndex, SearchGetApi);
  }, [setFocusIndex]);

  const SearchClickChoose = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget.parentNode?.parentNode?.parentNode?.firstChild?.firstChild as HTMLInputElement;
    if (target) {
      const text = e.currentTarget.innerText
      target.value = text;
      setFocusIndex(-1);
      SearchGetApi(text);
    }
  };

  return (
  <SearchBannerCenter>
    <LeftBannerSvg aria-label='left-banner-image' />
    <Searchcomponent>
      <SearchBar 
        setListOpen={setListOpen} getApiDate={getApiDate} 
        searchListKeyEvent={searchListKeyEvent} />
      <SearchList 
        listOpen={listOpen} focusIndex={focusIndex}
        listData={listData} searchListRef={searchListRef}
        SearchClickChoose={SearchClickChoose} />
    </Searchcomponent>
    <RightBannerSvg aria-label='right-banner-image' />
  </SearchBannerCenter>
  )
}

const KeyEvnetFunc = {
  "ArrowRight" : SearchMoveDown,
  "ArrowLeft" : SearchMoveUp,
  "Enter" : SearchContect,
}

function SearchMoveDown(setFocusIndex: Dispatch<SetStateAction<number>>, ul: HTMLElement) {
  const lastNum = (ul?.childNodes.length as number) - 1;
  setFocusIndex((prev) => {
    if (prev + 1 >= lastNum) return prev
    return prev + 1
  });
}
function SearchMoveUp(setFocusIndex: Dispatch<SetStateAction<number>>) {
  setFocusIndex((prev) => {
    if (prev- 1 < 0) return prev
    return prev - 1
  });
}
function SearchContect(
  e: KeyboardEvent<HTMLInputElement>,
  ul: HTMLElement, 
  setFocusIndex: Dispatch<SetStateAction<number>>,
  SearchGetApi: (query: string) => Promise<void>) {
    setFocusIndex((prev) => {
    if (prev === -1) return -1;
    const enterText = ul?.childNodes[prev + 1].textContent;
    if (enterText) { 
      (e.target as HTMLInputElement).value = enterText;
      SearchGetApi(enterText);
    }
    return -1;
    })
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