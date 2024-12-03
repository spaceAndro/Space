### <h1>음식추천 AI 개발</h1>
<div align="center">

<!-- logo -->
![image](https://github.com/user-attachments/assets/3f6b27a3-8231-4318-8b24-9b88950d4b96)

### 사용언어

 <img src="https://img.shields.io/badge/spring-%236DB33F.svg?&style=for-the-badge&logo=spring&logoColor=white" >
  <img src="https://img.shields.io/badge/javascript-%23F7DF1E.svg?&style=for-the-badge&logo=javascript&logoColor=black" />
<br>
  <img src="https://img.shields.io/badge/java-%23007396.svg?&style=for-the-badge&logo=java&logoColor=white" />
  <img src="https://img.shields.io/badge/python-%233776AB.svg?&style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/html5-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white" />
<br>
  <img src="https://img.shields.io/badge/mysql-%234479A1.svg?&style=for-the-badge&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/css3-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white" />
<br/> <img src="https://img.shields.io/badge/프로젝트 기간-2024.06.02~2024.11.07-green?style=flat&logo=&logoColor=white" />

</div> 

## 📝 소개
- 프로젝트 팀원
- DB ERD
- 홈페이지 구조도
- 사용한 API 
- 페이지 구성
- AI 개발
- 기술적 이슈와 해결 과정


## 👨‍🎓 팀원
👨‍🎓 팀장 : 송원석 🖥️ <br>
🙎‍♂️ 팀원 : 박상원 🖥️ <br>
🙎‍♂️ 팀원 : 김지민 🖥️ <br>
🙎‍♂️ 팀원 : 문승신 🖥️ <br>

## DB ERD
![spaceERD](https://github.com/user-attachments/assets/0a3d5949-a3ed-48f1-9644-fad511fa2f14)
### User<br>
-회원의 기본 정보를 저장합니다.<br>
-first_login으로 최초 로그인 여부를 판단합니다.<br><br>

### User_allergy<br>
-회원의 알러지 정보를 저장하는 테이블입니다.<br>
-알러지 종류는 우유, 계란, 땅콩, 견과류, 해산물, 갑각류, 밀, 대두류로 총 8가지로 구성되어있습니다.<br><br>
### Calendar<br>
-회원이 먹은 음식의 정보를 저장하는 테이블입니다.<br><br>
### Food<br>
-기초적인 음식 정보가 들어있는 테이블입니다.<br>
-칼로리와 3대 영양소인 탄수화물, 단백질, 지방에 대한 값이 들어있습니다.<br><br>
</div> 

## 📝 소개
- 프로젝트 팀원
- DB ERD
- 홈페이지 구조도
- 사용한 API 
- 페이지 구성
- AI 개발
- 기술적 이슈와 해결 과정


## 👨‍🎓 팀원
👨‍🎓 팀장 : 송원석 🖥️ <br>
🙎‍♂️ 팀원 : 박상원 🖥️ <br>
🙎‍♂️ 팀원 : 김지민 🖥️ <br>
🙎‍♂️ 팀원 : 문승신 🖥️ <br>

## DB ERD
![spaceERD](https://github.com/user-attachments/assets/0a3d5949-a3ed-48f1-9644-fad511fa2f14)
### User<br>
-회원의 기본 정보를 저장합니다.<br>
-first_login으로 최초 로그인 여부를 판단합니다.<br><br>

### User_allergy<br>
-회원의 알러지 정보를 저장하는 테이블입니다.<br>
-알러지 종류는 우유, 계란, 땅콩, 견과류, 해산물, 갑각류, 밀, 대두류로 총 8가지로 구성되어 있습니다.<br>

### Calendar<br>
-회원이 먹은 음식의 정보를 저장하는 테이블입니다.<br><br>

### Food<br>
-기초적인 음식 정보가 들어있는 테이블입니다.<br>
-칼로리와 3대 영양소인 탄수화물, 단백질, 지방에 대한 값이 들어있습니다.<br><br>

## 홈페이지 구조도
![image](https://github.com/user-attachments/assets/fc4c1e76-1e99-48e4-9a30-2a143686ac14)

## 사용한 API
![image](https://github.com/user-attachments/assets/32c8f3ad-a8a6-4d1f-b76f-42dda67442d2)<br>
-Openweather API 홈페이지 : https://openweathermap.org/<br>
![image](https://github.com/user-attachments/assets/84ae64a3-edbb-49ba-a903-9c367331272a)<br>
-카카오 맵 API 홈페이지 : https://developers.kakao.com/<br>

## 페이지 구성
### 메인페이지<br>
-현재 지역 날씨를 볼수 있고 주변 음식점을 지도로 확인할 수 있습니다.<br>
-추천된 음식이 넘어오면 지도에서 해당 음식을 파는 음식점을 보여주고 만약 추천된 음식이 없으면 주변의 모든 식당을 보여줍니다.<br><br>
▼이미지
![image](https://github.com/user-attachments/assets/fa750d44-a135-44d7-8fa8-4b1a0bad3f74)<br>
### 로그인 모달
-모달로 로그인창을 띄웁니다.<br><br>
▼이미지
![image](https://github.com/user-attachments/assets/0ac26d3e-5537-41a3-912b-f654bcc8f2f1)<br>
### 회원가입 모달
-모달로 회원가입창을 띄웁니다.<br>
-이메일이 이미 가입되어있는지 확인합니다.<br><br>
▼이미지
![image](https://github.com/user-attachments/assets/720cb68e-89bc-4955-ba7a-1c871dcfba48)<br>
### 설문지 모달
-알러지 여부를 확인하는 설문지입니다. 최초 로그인시 화면에 모달로 띄우며 나중에 정보쪽에서 변경할 수 있습니다.<br><br>
▼이미지
![image](https://github.com/user-attachments/assets/e2ca0eb2-b8b8-43f6-bb46-5d22c073e7e3)<br>
### 음식추천 페이지
-음식 추천페이지에서 선호재료, 음식타입등을 입력받고 자동으로 현재 날씨와 알레르기 정보를 가져오고 모든 정보를 json형식으로 변환해 AI가 작동하고있는 flask 서버로 넘겨줍니다.<br>
-AI가 추천한 음식을 json형식으로 가져오고 다시 string 형식으로 변환하여 추천된음식을 띄워줍니다.<br>
-추천된 음식을 저장하면 메인화면으로 넘겨줍니다.<br><br>
▼이미지
![image](https://github.com/user-attachments/assets/23f7ec70-6871-4566-8b3a-1692e4bcd977)<br>
### 달력 페이지
-음식추천에서 저장된 시간에 맞춰서 오늘 날짜의 아침,점심,저녁에 저장되고 하루마다 총 칼로리를 계산하고 또 한달마다 총 칼로리를 계산해서 보여줍니다. 해당 달력을 보면서 이용자는 오늘 하루 먹은 칼로리와 한달 칼로리를 확인할 수 있고 수정 삭제하면서 자신만의 음식달력을 만들어갈 수 있습니다.<br><br>
▼이미지
![image](https://github.com/user-attachments/assets/e8acb8c6-ec37-42b9-b264-ab643624e2d6)<br>



## AI 개발
### 1. 초기 설정 및 데이터 로드
pandas, tensorflow,sklearn 라이브러리 사용<br>
알레르기 정보를 비트마스크로 인코딩하기 위해 allergy_map을 설정 (알레르기 정보를 정수형 값으로 변환하여 모델에서 처리)<br>

알레르기 정보를 문자열에서 비트마스크로 변환, 알레르기 정보가 없는 경우 0으로 처리하여 데이터 손실을 방지<br>

### 2. 데이터 전처리
CSV 파일에서 데이터를 불러와 전처리를 수행<br>
라벨 인코딩: weather_condition, season, cuisine_type, food_category 등 문자열 데이터를 정수형 값으로 변환<br>
결측치 처리: 결측 데이터는 없음이라는 기본값으로 대체하여 모델이 모든 데이터를 처리가능<br>
알레르기 데이터 인코딩: 위에서 정의한 encode_allergies 함수를 사용해 allergy_info 데이터를 인코딩<br>
### 3. 데이터셋 분리
모델 학습을 위해 데이터를 입력(X)과 출력(y)으로 나누고, 학습 데이터와 테스트 데이터로 분리<br>
데이터의 80%는 학습에, 20%는 테스트에 사용<br>
### 4. 모델 구조
모델 종류 : 딥러닝<br>

날씨: weather_input<br>
계절: season_input<br>
알레르기 정보: allergy_input<br>
요리 타입: cuisine_input<br>
음식 카테고리: category_input<br>

각 입력은 Embedding Layer를 통해 고차원 벡터로 변환<br>
Concatenate 레이어로 모든 입력을 병합<br>
Fully Connected Layer를 통해 예측값을 생성<br>
Dropout과 Batch Normalization을 사용해 과적합 방지, 학습 속도 안정화<br>
출력 : softmax 활성화 함수를 사용해 음식 이름의 확률을 계산<br>
### 5. 모델 컴파일 및 학습
![image](https://github.com/user-attachments/assets/71bde272-bd64-4395-8971-9f56743bf344)<br>
모델은 총 50번의 에포크 동안 학습

### 6. 모델 저장
학습이 완료된 후 model.h5로 저장

## 기술적 이슈와 해결 과정




