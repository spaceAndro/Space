import pandas as pd

# 샘플 데이터 파일 경로
file_path = '샘플 데이터.xlsx'

# 엑셀 파일에서 데이터 읽기
df = pd.read_excel(file_path)

# 데이터프레임의 열 이름 출력
print("열 이름 확인:", df.columns)
