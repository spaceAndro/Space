import json

# 함수: 저장된 데이터 확인
def check_saved_data():
    try:
        with open("user_feedback.json", "r") as f:
            data = [json.loads(line) for line in f]
            if not data:
                print("파일에 저장된 데이터가 없습니다.")
            else:
                print("저장된 데이터:")
                for entry in data:
                    print(entry)
    except FileNotFoundError:
        print("user_feedback.json 파일이 없습니다. 새로운 데이터를 추가해 주세요.")

# 메인 코드 실행
check_saved_data()
