from flask import Flask, request, render_template, jsonify
import numpy as np
import tensorflow as tf
from sklearn.preprocessing import LabelEncoder
import pandas as pd
import random
import requests

app = Flask(__name__)

# 모델 로드
model = tf.keras.models.load_model('saved_model/model.h5')

# 음식 데이터 로드 및 중복 제거
data = pd.read_csv('data/데이터(구).csv')
data = data.drop_duplicates(subset=['food_name'], keep='first')  # 'food_name'을 기준으로 중복 제거

# Label Encoders 로드
label_encoder_weather = LabelEncoder()
label_encoder_weather.fit(data['weather_condition'].unique())

label_encoder_season = LabelEncoder()
label_encoder_season.fit(data['season'].unique())

label_encoder_cuisine = LabelEncoder()
label_encoder_cuisine.fit(np.append(data['cuisine_type'].unique(), '없음'))

label_encoder_category = LabelEncoder()
label_encoder_category.fit(np.append(data['food_category'].unique(), '없음'))

label_encoder_food = LabelEncoder()
label_encoder_food.fit(data['food_name'])

# 알레르기 매핑
allergy_map = {
    "우유": 1,
    "달걀": 2,
    "땅콩": 3,
    "견과류": 4,
    "해산물": 5,
    "갑각류": 6,
    "밀": 7,
    "대두류": 8
}


# 알레르기 정보를 비트 마스크로 인코딩하는 함수
def encode_allergies(allergy_list):
    if not allergy_list or (len(allergy_list) == 1 and allergy_list[0] == "0"):  # 알레르기 정보가 없거나 '0'인 경우
        return 0  # 알레르기 없음으로 간주
    bit_mask = 0
    for allergy in allergy_list:
        if allergy in allergy_map:
            bit_mask |= (1 << allergy_map[allergy])
    return bit_mask


# 사용자의 이전 추천 목록을 저장하기 위한 리스트
user_recommendation_history = []


@app.route('/predict', methods=['POST'])
def predict():
    # STS로부터 사용자 입력 받기
    user_data = request.get_json()

    weather_condition = user_data.get('weather_condition')
    season = user_data.get('season')
    allergies = user_data.get('allergies')  # 여러 알레르기 선택 가능
    preferred_ingredient = user_data.get('preferred_ingredient')  # 선호하는 재료
    cuisine_type = user_data.get('cuisine_type')
    food_category = user_data.get('food_category')

    # 입력이 없을 경우 랜덤으로 선택
    if not cuisine_type or cuisine_type == '없음':
        cuisine_type = random.choice(label_encoder_cuisine.classes_)
    if not food_category or food_category == '없음':
        food_category = random.choice(label_encoder_category.classes_)

    # 입력 데이터를 인코딩
    weather_condition_encoded = label_encoder_weather.transform([weather_condition])[0] if weather_condition else 0
    season_encoded = label_encoder_season.transform([season])[0] if season else 0
    user_allergy_encoded = encode_allergies(allergies)  # 사용자의 알레르기 정보 인코딩
    cuisine_encoded = label_encoder_cuisine.transform([cuisine_type])[0]
    category_encoded = label_encoder_category.transform([food_category])[0]

    # 입력 데이터를 NumPy 배열로 변환
    input_data = [
        np.array([weather_condition_encoded]).astype(np.int32),
        np.array([season_encoded]).astype(np.int32),
        np.array([user_allergy_encoded]).astype(np.int32),
        np.array([cuisine_encoded]).astype(np.int32),
        np.array([category_encoded]).astype(np.int32)
    ]

    # 모델을 사용해 예측
    prediction = model.predict(input_data)
    sorted_indices = np.argsort(prediction[0])[::-1]  # 전체 음식 리스트에서 높은 순서로 정렬
    top_foods = label_encoder_food.inverse_transform(sorted_indices)

    # 상위 음식 중 알레르기 조건과 카테고리 및 재료 조건을 적용하여 음식 찾기
    candidate_foods = []
    fallback_foods = []

    for food in top_foods:
        food_info = data[data['food_name'] == food].iloc[0]
        food_allergy_encoded = encode_allergies(food_info['allergy_info'].split(','))  # 음식의 알레르기 정보 인코딩

        # 알레르기가 있는 음식은 확실히 제외
        if user_allergy_encoded & food_allergy_encoded == 0:  # 사용자의 알레르기와 음식의 알레르기가 겹치지 않으면
            # 음식 카테고리와 분류가 일치하고 선호하는 재료가 있는지 확인
            if (food_info['cuisine_type'] == cuisine_type) and (food_info['food_category'] == food_category):
                if preferred_ingredient in [food_info['main_ingredient_1'], food_info['main_ingredient_2']]:
                    if food not in user_recommendation_history:
                        candidate_foods.append(food)
                else:
                    # 음식 카테고리와 분류만 일치하는 음식 (선호하는 재료가 없는 경우)
                    fallback_foods.append(food)

    # 후보 음식이 충분하지 않으면 카테고리와 분류만 일치하는 음식 추가
    while len(candidate_foods) < 5 and fallback_foods:
        candidate_foods.append(fallback_foods.pop(0))

    # 후보 음식이 충분하지 않으면 가장 가까운 음식 (예: 분류는 다르지만 재료가 일치하는 음식) 추가
    if len(candidate_foods) < 5:
        for food in top_foods:
            if food not in candidate_foods:
                food_info = data[data['food_name'] == food].iloc[0]
                if preferred_ingredient in [food_info['main_ingredient_1'], food_info['main_ingredient_2']]:
                    candidate_foods.append(food)
                if len(candidate_foods) >= 5:
                    break

    # 후보 음식 중에서 가중치에 따라 랜덤하게 선택하여 추천
    if candidate_foods:
        recommended_food = random.choices(
            candidate_foods,
            weights=[0.8 if i == 0 else 0.2 / (len(candidate_foods) - 1) for i in range(len(candidate_foods))],
            k=1
        )[0]
    else:
        # 여전히 일치하는 음식이 없으면 상위 음식 중에서 하나 선택
        recommended_food = random.choice(top_foods[:10])

    # 사용자 추천 이력에 추가
    user_recommendation_history.append(recommended_food)
    if len(user_recommendation_history) > 10:  # 이력은 10개까지만 유지
        user_recommendation_history.pop(0)

    # STS 서버로 추천 음식 전송
    sts_url = user_data.get('sts_url')
    if sts_url:
        try:
            requests.post(sts_url, json={'recommended_food': recommended_food})
        except requests.exceptions.RequestException as e:
            print(f"Error sending data to STS server: {e}")

    return jsonify({'recommended_food': recommended_food})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)