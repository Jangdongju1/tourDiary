# tourDiary(여행다이어리)
### 1. 프로젝트 개요
##### 자신이 진행 하였던 여행의 경로와 사진 등을 공유하는 커뮤니티.
### 2. 학습목표 
##### 원하는 모양으로 데이터를 수집하여  지정된 형식으로 서버로 전송하고 처리하며, 지정된 형식으로 클라이언으로 응답을 전송하는 것에 대한 학습.
### 3. 사용기술
##### - backend : Java, SpringFramwork(MVC), Mysql(mybatis)
##### - frontend : JavaScript, HTML, CSS
##### - API : 1) Kakao 주소 , 2) Kakao Map, 3)좌표계관련 Restful Api 
### 4. 기능설명
#### - 로그인 및 회원가입(생략)
#### - 여행지 선택
![image](https://github.com/Jangdongju1/tourDiary/assets/129809021/40c18188-050e-4d00-83ee-25186754d5cf)
##### * KakaoMap API를 활용하여 DB상에 등록된 여행지 시각화
##### * 여행지명, 지역명 등으로 여행지를 검색(지도 포커스 이동)
#### - 다이어리 작성
![image](https://github.com/Jangdongju1/tourDiary/assets/129809021/bf1c4732-3717-44ba-b7ff-a9adf3c8dc41)
![image](https://github.com/Jangdongju1/tourDiary/assets/129809021/635b64f3-e73a-4eb7-959f-39a6a8ced155)
##### * 사진파일 다중업로드 구현(모달팝업 이용)
##### * 여행지별 간단한 메모 작성 및 전체 글에 대한 해시태그 등록.
##### * 선택한 여행지에 대하여 지도에 순서대로 마커표기, 실선연결, 좌표간 거리 계산.
##### * 자신이 업로드한 사진 중에서 대표사진을 선택.(게시물의 메인사진으로 표기.)
#### - 전체게시물
![image](https://github.com/Jangdongju1/tourDiary/assets/129809021/dcfa7ce6-d93f-4823-a207-6cf962756d04)
##### * 지역별 검색 및 키워드, 해시태그 검색(Ajax활용 비동기)
##### * InterSectionObserver를 활용한 무한 스크롤 방식.
