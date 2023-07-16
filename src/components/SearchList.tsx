import styled from 'styled-components';
import {ReactComponent as SearchSvg} from '../assets/search.svg'

const SearchList = () => {
  return (
    <SearchListDetail>
      <ul>
        <SearchListItem><SearchSvg stroke='#ACB4BB' width={32} height={32} /> 담증</SearchListItem>
        <SearchListItem><SearchSvg stroke='#ACB4BB' width={32} height={32} /> 담증</SearchListItem>
        <SearchListItem><SearchSvg stroke='#ACB4BB' width={32} height={32} /> 담증</SearchListItem>
        <SearchListItem><SearchSvg stroke='#ACB4BB' width={32} height={32} /> 담증</SearchListItem>
        <SearchListItem><SearchSvg stroke='#ACB4BB' width={32} height={32} /> 담증</SearchListItem>
        <SearchListItem><SearchSvg stroke='#ACB4BB' width={32} height={32} /> 담증</SearchListItem>
        <SearchListItem><SearchSvg stroke='#ACB4BB' width={32} height={32} /> 담증</SearchListItem>
        <SearchListItem><SearchSvg stroke='#ACB4BB' width={32} height={32} /> 담증</SearchListItem>
        <SearchListItem><SearchSvg stroke='#ACB4BB' width={32} height={32} /> 담증</SearchListItem>
        <SearchListItem><SearchSvg stroke='#ACB4BB' width={32} height={32} /> 담증</SearchListItem>
      </ul>
    </SearchListDetail>
  )
}

const SearchListDetail = styled.div`
  position: absolute;
  overflow-y: scroll;
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

const SearchListItem = styled.li`
  display: flex;
  justify-content: start;
  align-items: center;
  background-color: #ffffff;
  padding: 0 2rem;
  font-size: 1.2rem;
  text-decoration: none;
  list-style: none;
  margin-bottom: .7rem;
  &:hover {
    background-color: #80808044;
  }
`

export default SearchList;