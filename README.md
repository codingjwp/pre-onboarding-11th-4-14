# 원티드 프리온 보딩 11차 4주차 14팀
<div align="right">7월 16일(일) 12:00 ~ 7월 19일(수) 24:00</div>

## 목표 
1. 검색창 구현
2. 검색어 추천 기능 구현
3. 캐싱 기능 구현

## 구현

- 해당 검색영역 클론하기   [한국임상정보](https://clinicaltrialskorea.com/)
- 검색어가 없을 시 “검색어 없음” 표출
- 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현
<br>
- API 호출별로 로컬 캐싱 구현
    - 캐싱 기능을 제공하는 라이브러리 사용 금지(React-Query 등)
    - 캐싱을 어떻게 기술했는지에 대한 내용 README에 기술
    - expire time을 구현할 경우 가산점
<br>
- 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
    - README에 전략에 대한 설명 기술
<br>
- API를 호출할 때 마다 `console.info("calling api")` 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정
<br>
- 키보드만으로 추천 검색어들로 이동 가능하도록 구현
    - 사용법 README에 기술

## 개발 조건 및 환경
- 언어 : TypeScript
- 사용가능한 기술:
    - 전역 상태 관리 툴(필수 사용 X, 필요 시 사용)
    - 스타일 관련 라이브러리(styled-components, emotion, UI kit, tailwind, antd 등)
    - HTTP Client(axios 등)
    - 라우팅 관련 라이브러리(react-router-dom)