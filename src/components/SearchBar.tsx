import styled from 'styled-components';
import {ReactComponent as SearchSvg} from '../assets/search.svg'
import { ChangeEvent, Dispatch, SetStateAction, KeyboardEvent } from 'react';

interface SearchBarProps {
  setListOpen: Dispatch<SetStateAction<boolean>>;
  getApiDate: (e: ChangeEvent<HTMLInputElement>) => void;
  searchListKeyEvent: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar = ({setListOpen, getApiDate, searchListKeyEvent}: SearchBarProps) => {

  return (
    <SearchInputGroup>
      <SearchInput
        tabIndex={0} onKeyDown={searchListKeyEvent}
        type="search" id="searchbar" placeholder=' '
        onChange={getApiDate} onFocus={()=> setListOpen(true)} />
      <SearchLabel htmlFor="searchbar">
        <SearchSvg stroke='#ACB4BB' width={32} height={32}/> 찾고 싶은 질환을 입력해주세요.
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

