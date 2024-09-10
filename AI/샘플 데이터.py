import pandas as pd

# 샘플 데이터 파일 읽기
file_path = '샘플 데이터.xlsx'
df = pd.read_excel(file_path)

# 데이터 확인
print(df.head())
