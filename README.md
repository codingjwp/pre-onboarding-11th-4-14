# 원티드 프리온 보딩 11차 4주차 14팀
<div align="right">작성자: 박재우 (7월 16일(일) 12:00 ~ 7월 19일(수) 24:00)</div>

## 기술 스택
![React](https://img.shields.io/badge/react-18.2.0-20232A?logo=react)
![vite](https://img.shields.io/badge/vite-4.4.0-B73BFE?logo=vite)
![react-router](https://img.shields.io/badge/react--router-6.14.1-CA4245?logo=reactRouter)
![typescript](https://img.shields.io/badge/typescript-5.0.2-007ACC?logo=typescript)
![styled-components](https://img.shields.io/badge/styled--components-6.0.4-28A745?logo=styled-components)
![axios](https://img.shields.io/badge/axios-1.4.0-%23671DDF?logo=axios&logoColor=%23671DDF)

## 실행 방법
server git clone
- 서버 [github 링크](https://github.com/walking-sunset/assignment-api)
```bash
git clone https://github.com/walking-sunset/assignment-api.git
cd assignment-api
npm install
npm start
# http://localhost:4000 로 실행
```
.env 생성(변경) 및 client 생성
```
# src/api/HttpClient.tsx에 'http://localhost:4000/' 추가
# .env 필요시 (없음면 'http://localhost:4000/')로 입력됨
echo "VITE_API_URL='http://localhost:4000/'" > .env
npm install
npm start
```

## 데모 파일
![데모 파일](./demo.gif)
## 목표 
1. 검색창 구현
2. 검색어 추천 기능 구현
3. 캐싱 기능 구현

## 구현 기능

- 해당 검색영역 클론하기   [한국임상정보](https://clinicaltrialskorea.com/)
- 검색어가 없을 시 “검색어 없음” 표출
- 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현

### API 호출별로 로컬 캐싱 구현   
1. 캐싱 이란? 
    - 캐싱은 주어진 리소스의 복사본을 저장하고 있다가 요청 시에 그것을 제공하는 기술입니다.
    - [참고 자료](https://web.dev/http-cache/#examples), [참고 자료2(MDN)](https://developer.mozilla.org/ko/docs/Web/HTTP/Caching)
2. 로컬 캐싱을 구현 하기 위해 사용한 부분
    - localStorage를 이용한 로컬 캐싱 구현.
    - localStorage에 저장
        - key를 **`sick?q={검색바에 입력한 내용}`** value를 **`expireTime`** 과 서버에서 받아온 **`Data`** 로 문자열로 저장
        ```javascript
        // useClientGet.tsx
        async function setCachData(query: string, data : ApiData) {
            removeCachData();
            // 1시간 설정
            const timeCheck = Date.now() + 60 * 60 * 1000;
            const stringData = JSON.stringify({expireTime : timeCheck,data: data });
            localStorage.setItem(query, stringData);
        }
        ```
    - localStorage 용량이 `4000KB` 이상 일 경우 삭제
        ```javascript
        // useClientGet.tsx
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
        ```
    - localStorage 캐싱에 해당 하는 값이 있을 경우 가져오기 및 **`expireTime`** 초과 된 경우 삭제
        ```javascript
        // useClientGet.tsx
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
                ? { types: "SUCCES_NODATA", data: 'No search data' }
                : {types: "SUCCES", data: cachData.data};
        }
        ```
### 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행 
1. 캐싱 구현 및 입력 값이 빈 값때 `return`   
    ```javascript
    if (query === '')
        return { types: "SUCCES_NODATA", data: 'No query data' };

    const fetchUrl = `sick?q=${query}`;
    const check = await getCachData(fetchUrl);

    if (check !== null ) return check as SearchProps;
    ```
2. lodash의 debounce처럼 **`setTimeOut`** 을 이용한 API 호출 횟수 감소
    - 딜레이 `350ms` 설정하여 입력 값이 api호출 부분을 호출하기 전에 입력값이 발생할 경우 이전 `setTimeout`을 `clearTimeout` 하고 다시 타이머를 불러오는 형식
    ```javascript
    //SearchBanner.tsx
    useEffect(() => {
        return () => { clearTimeout(timeIndex) }
    }, []);

    const getApiDate = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        clearTimeout(timeIndex);
        const index = setTimeout(async() => {
            setFocusIndex(-1);
            SearchGetApi(e.target.value);
        }, 350);
        setTimeIndex(index);
    }
    ```

### 키보드만으로 추천 검색어들로 이동 가능하도록 구현   
➡️ : 추천 검색어가 나왔을 때 해당 방향 키를 눌렀을 때 밑으로 이동   
⬅️ : 추천 검색어가 나왔을 때 해당 방향 키를 눌렀을 때 위로 이동  
↩️ : 추천 검색어를 enter로 눌렀을 때 검색바로 검색 값 등록   
🖱️: 추천 검색어를 클릭 하면 검색바로 검색 값 등록   

한글 입력 후 첫 방향 키를 누를 경우 2번씩 실행되는 문제로 인해 추가
```javascript
if (e.key === 'KeyA'  || e.nativeEvent.isComposing) return;
```




