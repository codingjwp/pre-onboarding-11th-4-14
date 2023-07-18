import { MutableRefObject, MouseEvent } from 'react';
import styled from 'styled-components';
import { SearchProps } from "../hooks/useClientGet";
import { ReactComponent as SearchSvg } from '../assets/search.svg';

interface SearchListProps {
  listOpen: boolean;
  listData: SearchProps | null;
  focusIndex: number;
  searchListRef: MutableRefObject<HTMLUListElement | null>;
  SearchClickChoose: (e: MouseEvent<HTMLLIElement>) => void
}

const SearchList = ({listOpen, listData, focusIndex, searchListRef, SearchClickChoose}: SearchListProps) => {

  return (
    <>
    {listOpen ?
      <SearchListDetail tabIndex={-1}>
        <ul id='searchUl' ref={searchListRef}>
          {listData && listData.types === 'SUCCES' 
          && <SearchListTitle>추천 검색어</SearchListTitle>}
          {listData && listData.types === 'SUCCES'
          ? listData.data.map((item, index) => {
            return (<SearchListItem 
              tabIndex={0} 
              $targetNum={focusIndex === index} 
              key={item.sickCd}
              onClick={SearchClickChoose}
              ref={(el) => {
                if (index === focusIndex) el?.scrollIntoView({block: 'nearest'});
              }}>
                <SearchSvg stroke='#ACB4BB' width={32} height={32} />{item.sickNm}
              </SearchListItem>);
          })
          : <SearchListItem key="no-serach-data"><SearchSvg stroke='#ACB4BB' width={32} height={32} /> 검색 결과가 없습니다.</SearchListItem>
          }
        </ul>
      </SearchListDetail> : null}
    </>
  )
}

const SearchListDetail = styled.div`
  position: absolute;
  overflow-y: auto;
  width: 100%;
  max-height: 20rem;
  top: 3rem;
  margin-top: .8rem;
  border: 0;
  border-radius: 1rem;
  z-index: 2;
  background-color: #ffffff;
  & ul {
    padding: 0;
  }
`
const SearchListTitle = styled.li`
  background-color: #ffffff;
  padding: 0 2rem;
  font-size: .7rem;
  font-weight: 550;
  color: #808080;
  text-decoration: none;
  list-style: none;
  margin-bottom: .7rem;
`

const SearchListItem = styled.li<{$targetNum?: boolean}>`
  display: grid;
  grid-template-columns: 2rem 1fr;
  justify-content: start;
  align-items: center;
  background-color: ${props => props.$targetNum ? '#80808044' : '#ffffff'}; 
  padding: 0 2rem;
  font-size: 1.2rem;
  text-decoration: none;
  list-style: none;
  margin-bottom: .7rem;
  -webkit-user-select: none; 
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
  &:hover {
    background-color: #80808044;
  }
`

export default SearchList;