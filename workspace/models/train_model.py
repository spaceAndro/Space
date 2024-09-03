# Flask API 서버 코드 (FlaskApp.py)
import pandas as pd
from flask import Flask, request, jsonify
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import MultiLabelBinarizer
import joblib

app = Flask(__name__)

# 가상의 데이터 생성 및 모델 학습
data = {
    '음식': ['피자', '스테이크', '초밥', '햄버거', '샐러드', '파스타', '치킨', '타코', '라면', '샌드위치', '스시', '카레', '파에야', '딤섬', '타파스', '떡볶이', '훠궈', '마라탕', '짜장면', '짬뽕'],
    '재료': [
        ['유제품', '밀', '토마토'], ['쇠고기'], ['해산물', '쌀'], ['밀', '쇠고기'],
        ['채소'], ['밀', '계란'], ['닭고기'], ['밀', '옥수수'], ['밀', '계란'],
        ['밀', '계란', '채소'], ['해산물', '쌀'], ['쌀', '닭고기', '채소'], ['해산물', '쌀', '채소'],
        ['밀', '채소'], ['밀', '해산물'], ['밀', '어묵', '고추장'], ['쇠고기', '야채', '떡'],
        ['쇠고기', '야채', '떡'], ['밀', '쇠고기', '야채'], ['밀', '해산물', '야채']
    ],
    '카테고리': [
        '양식', '양식', '일식', '양식', '양식', '양식', '양식', '멕시코식', '한식', '양식',
        '일식', '인도식', '스페인식', '중식', '스페인식', '한식', '중식', '중식', '중식', '중식'
    ],
    '타입': [
        '빵류', '고기류', '생선류', '빵류', '샐러드류', '면류', '고기류', '빵류', '면류', '빵류',
        '생선류', '밥류', '밥류', '스낵류', '스낵류', '분식류', '수프류', '수프류', '면류', '면류'
    ],
    '사용자_피드백': [5, 4, 5, 4, 3, 5, 4, 3, 4, 3, 5, 4, 5, 3, 4, 5, 4, 4, 5, 4]
}

df = pd.DataFrame(data)

# MultiLabelBinarizer를 사용하여 재료를 이진화
mlb = MultiLabelBinarizer()
ingredients_encoded = mlb.fit_transform(df['재료'])

# 카테고리와 타입을 이진화
categories_encoded = pd.get_dummies(df['카테고리'])
types_encoded = pd.get_dummies(df['타입'])

# 피처와 타겟 설정
X = pd.concat([pd.DataFrame(ingredients_encoded, columns=mlb.classes_), categories_encoded, types_encoded], axis=1)
y = df['사용자_피드백']

# 모델 학습
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

# 모델 저장
joblib.dump(model, 'food_recommendation_model.pkl')
joblib.dump(mlb, 'mlb.pkl')

# Flask API로 추천 서비스 제공
@app.route('/recommend', methods=['POST'])
def recommend():
    user_input = request.json
    # 여기서 유저의 입력값을 바탕으로 예측할 데이터를 생성한 후, 모델 예측
    recommended_foods = model.predict(X)  # 이 부분은 실제 입력 데이터를 사용해야 함
    
    return jsonify({"recommendation": recommended_foods.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
