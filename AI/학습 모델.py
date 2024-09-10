import pandas as pd
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

# 1. 데이터 불러오기
file_path = '샘플 데이터.xlsx'  # 파일 경로
df = pd.read_excel(file_path)

# 2. '재료' 열을 이진화
if '식품중분류명' in df.columns:
    mlb = MultiLabelBinarizer()
    df['식품중분류명'] = list(mlb.fit_transform(df['식품중분류명']))
else:
    raise ValueError("'식품중분류명' 열이 데이터에 존재하지 않습니다.")

# 3. 학습에 사용할 피처와 타겟 설정
if all(col in df.columns for col in ['식품대분류명', '식품중분류명', '에너지(kcal)']):
    # '재료_이진화'는 리스트이므로 각 재료 열을 분리하여 추가
    ingredients_df = pd.DataFrame(mlb.fit_transform(df['식품중분류명']), columns=mlb.classes_)
    
    # '카테고리'와 '타입'을 이진화
    categories_encoded = pd.get_dummies(df['식품대분류명'])
    types_encoded = pd.get_dummies(df['식품중분류명'])

    # 입력 데이터(X) 생성
    X = pd.concat([ingredients_df, categories_encoded, types_encoded], axis=1)
    y = df['식품대분류명']  # 타겟 변수
else:
    raise ValueError("필수 컬럼('식품대분류명', '식품중분류명', '에너지(kcal)')이 존재하지 않습니다.")

# 4. 학습 및 테스트 데이터 분리
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 5. Random Forest 모델 학습
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 6. 테스트 정확도 출력
print("Test Accuracy:", model.score(X_test, y_test))
