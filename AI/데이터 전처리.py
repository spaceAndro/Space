import pandas as pd
import numpy as np  # numpy 임포트

# 엑셀 파일에서 데이터 읽기
file_path = '샘플 데이터.xlsx'
df = pd.read_excel(file_path)

# '식품중분류명' 열이 리스트나 배열 형태인 경우 이를 문자열로 변환
if '재료' in df.columns:
    df['재료'] = df['재료'].apply(lambda x: ', '.join(x) if isinstance(x, (list, np.ndarray)) else str(x))

# '식품중분류명' 열을 원-핫 인코딩
types_encoded = pd.get_dummies(df['재료'])

# 결과 출력
print(types_encoded.head())
