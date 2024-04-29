import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import OneHotEncoder

# 가상의 데이터셋 생성 (예시)
data = {
    '음식': ['피자', '스테이크', '초밥', '햄버거', '샐러드'],
    '맛': ['좋음', '좋음', '좋음', '보통', '보통'],
    '가격': ['비싸', '비싸', '보통', '저렴', '보통'],
    '건강': ['보통', '보통', '좋음', '보통', '좋음'],
    '추천': ['Y', 'Y', 'Y', 'N', 'N']
}

df = pd.DataFrame(data)

# 입력 데이터와 타깃 데이터 분리
X = df[['맛', '가격', '건강']]
y = df['추천']

# 데이터 인코딩
encoder = OneHotEncoder(sparse_output=False)  # 수정된 부분
X_encoded = encoder.fit_transform(X)

# 학습 데이터와 테스트 데이터 분리
X_train, X_test, y_train, y_test = train_test_split(X_encoded, y, test_size=0.2, random_state=42)

# 모델 훈련
model = RandomForestClassifier()
model.fit(X_train, y_train)

# 새로운 음식 추천
def recommend_food(taste, price, health):
    input_data = pd.DataFrame({'맛': [taste], '가격': [price], '건강': [health]})
    input_encoded = encoder.transform(input_data)  # 입력 데이터를 훈련된 인코더로 변환
    prediction = model.predict(input_encoded)
    if prediction[0] == 'Y':
        return "추천해드릴게요!"
    else:
        return "다른 음식을 추천해볼까요?"

# 테스트
print(recommend_food('좋음', '보통', '보통'))  # 예시 입력값에 따른 결과 출력
