import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import MultiLabelBinarizer

# 데이터 로드 및 초기화 (예제용 데이터 프레임 생성)
data = {
    '음식': ['피자', '스테이크', '초밥'],
    '재료': [['유제품', '밀', '토마토'], ['쇠고기'], ['해산물', '쌀']],
    '카테고리': ['양식', '양식', '일식'],
    '타입': ['빵류', '고기류', '생선류'],
    '사용자_피드백': [5, 3, 4]  # 예제 피드백 점수
}

df = pd.DataFrame(data)

# 재료를 이진화
mlb = MultiLabelBinarizer()
ingredients_encoded = mlb.fit_transform(df['재료'])

# 카테고리와 타입을 이진화
categories_encoded = pd.get_dummies(df['카테고리'])
types_encoded = pd.get_dummies(df['타입'])

# 피처와 타겟 설정
X = pd.concat([pd.DataFrame(ingredients_encoded, columns=mlb.classes_), categories_encoded, types_encoded], axis=1)
y = df['사용자_피드백']

# 학습 및 테스트 데이터 분리
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 모델 학습
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 모델 평가 (옵션)
print("Training accuracy:", model.score(X_train, y_train))
print("Test accuracy:", model.score(X_test, y_test))
