import styled from 'styled-components';
import {ReactComponent as SearchSvg} from '../assets/search.svg'
import { ChangeEvent, Dispatch, SetStateAction, KeyboardEvent, useCallback, useState, useEffect } from 'react';

interface SearchBarProps {
  setListOpen: Dispatch<SetStateAction<boolean>>;
  setNumber: Dispatch<SetStateAction<number>>;
  searchGetApi: (query: string) => Promise<void>;
}


const SearchBar = ({setListOpen, setNumber, searchGetApi}: SearchBarProps) => {
  const [times, setTimes] = useState(0);

  const getApiDate = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    clearTimeout(times);
    const nums = setTimeout(async() => {
      setNumber(-1);
      await searchGetApi(e.target.value);
    }, 300);
    setTimes(nums);
  }

  useEffect(() => {
    return () => { clearTimeout(times) }
  }, [])

  const searchListKeyEvent = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'KeyA'  || e.nativeEvent.isComposing) return;
    if (!(e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "Enter")) return;
    const ul = document.getElementById('searchUl');
    if (e.key === "ArrowRight") {
      const lastNum = (ul?.childNodes.length as number) - 1;
      setNumber((prev) => {
        if (prev + 1 >= lastNum) return prev
        return prev + 1
      });
    }
    else if (e.key === "ArrowLeft"){
      setNumber((prev) => {
        if (prev- 1 < 0) return prev
        return prev - 1
      });
    }
    else if (e.key === "Enter"){
    }
  }, [setNumber]);

  return (
    <SearchInputGroup>
      <SearchInput tabIndex={0} onKeyDown={searchListKeyEvent} type="search" id="searchbar" placeholder=' ' onChange={getApiDate} onFocus={()=> setListOpen(prev => !prev)} onBlur={()=> setListOpen(prev => !prev)} />
      <SearchLabel htmlFor="searchbar">
        <SearchSvg stroke='#ACB4BB' width={32} height={32}/> 검색어가 없음
      </SearchLabel>
      <SearchBtn type='button' aria-label='Search'>
        <SearchSvg stroke='#FFFFFF' width={32} height={32}/>
      </SearchBtn>
    </SearchInputGroup>
  );
}

const SearchInputGroup = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #ffffff;
  border: 0;
  border-radius: 2rem;
`

const SearchInput = styled.input`
  padding: 1rem 1.5rem 1rem .4rem;
  border: 0;
  outline: none;
  font-size: 1.2rem;
  width: calc(100% - 4rem);
  &:not(:focus) + label, &:placeholder-shown + label {
    opacity: 1;
  };
  &:focus + label, &:not(:placeholder-shown) + label {
    opacity: 0;
  };
`

const SearchLabel = styled.label`
  position: absolute;
  top: .6rem;
  left: 1.9rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #ACB4BB;
  -webkit-user-select: none; 
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

const SearchBtn = styled.button`
  cursor: pointer;
  background-color: #007BE9;
  position: absolute;
  top: .2rem;
  right: .3rem;
  border: 0;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
`

export default SearchBar;


