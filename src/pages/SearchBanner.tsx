import styled from 'styled-components';
import SearchBar from "../components/SearchBar";
import SearchList from '../components/SearchList';
import {ReactComponent as LeftBannerSvg } from '../assets/leftbanner.svg'
import {ReactComponent as RightBannerSvg } from '../assets/rightbanner.svg'

const SearchBanner = () => {
  return (
  <SearchBannerCenter>
    <LeftBannerSvg aria-label='left-banner-image' />
    <Searchcomponent>
      <SearchBar />
      <SearchList />
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