import json
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import MultiLabelBinarizer

# 함수: 사용자 입력 받기
def get_user_input():
    allergies = input("알러지를 입력하세요 (여러개의 알러지 입력 가능, 쉼표로 구분): ").split(',')
    weather = input("날씨를 입력하세요 (맑음, 비, 흐림 중 선택): ")
    temperature = input("온도를 입력하세요 (더움, 추움 중 선택): ")
    situation = input("상황을 입력하세요 (아침, 점심, 저녁, 야식, 간식 중 선택): ")
    food_feedback = input("평가하고 싶은 음식 이름을 입력하세요: ")
    ingredients_feedback = input(f"{food_feedback}의 재료를 쉼표로 구분하여 입력하세요: ").split(',')
    category_feedback = input(f"{food_feedback}의 카테고리를 입력하세요: ")
    type_feedback = input(f"{food_feedback}의 타입을 입력하세요: ")
    feedback_score = int(input(f"{food_feedback}에 대한 피드백 점수를 입력하세요 (1-5): "))
    
    data = {
        "allergies": allergies,
        "weather": weather,
        "temperature": temperature,
        "situation": situation,
        "food_feedback": food_feedback,
        "ingredients_feedback": ingredients_feedback,
        "category_feedback": category_feedback,
        "type_feedback": type_feedback,
        "feedback_score": feedback_score
    }
    
    with open("user_feedback.json", "a") as f:
        json.dump(data, f)
        f.write("\n")

# 함수: 데이터 로드
def load_data():
    data = []
    with open("user_feedback.json", "r") as f:
        for line in f:
            data.append(json.loads(line))
    return data

# 함수: 데이터 전처리
def prepare_data(data):
    df = pd.DataFrame(data)
    
    mlb = MultiLabelBinarizer()
    ingredients_encoded = mlb.fit_transform(df['ingredients_feedback'])

    categories_encoded = pd.get_dummies(df['category_feedback'])
    types_encoded = pd.get_dummies(df['type_feedback'])

    X = pd.concat([pd.DataFrame(ingredients_encoded, columns=mlb.classes_), categories_encoded, types_encoded], axis=1)
    y = df['feedback_score']
    
    return X, y, mlb, categories_encoded, types_encoded

# 함수: 음식 추천
def recommend_food(model, mlb, categories_encoded, types_encoded, allergies, weather, temperature, situation):
    data = load_data()
    df = pd.DataFrame(data)
    
    unique_allergies = set(allergies)
    filtered_df = df[~df['ingredients_feedback'].apply(set).apply(unique_allergies.intersection).astype(bool)]
    
    recommended_foods = []

    for index, row in filtered_df.iterrows():
        ingredients_vector = pd.DataFrame([mlb.transform([row['ingredients_feedback']])[0]], columns=mlb.classes_).astype(int)
        category_vector = pd.DataFrame([pd.get_dummies([row['category_feedback']]).reindex(columns=categories_encoded.columns, fill_value=0).iloc[0]])
        type_vector = pd.DataFrame([pd.get_dummies([row['type_feedback']]).reindex(columns=types_encoded.columns, fill_value=0).iloc[0]])

        food_vector = pd.concat([ingredients_vector, category_vector, type_vector], axis=1)

        prediction = model.predict(food_vector)
        if prediction >= 4:
            recommended_foods.append((row['food_feedback'], prediction[0]))
    
    recommended_foods.sort(key=lambda x: x[1], reverse=True)
    
    return [food for food, _ in recommended_foods]

# 메인 코드
if __name__ == "__main__":
    # 사용자 입력 받기
    get_user_input()
    
    # 데이터 준비
    data = load_data()
    
    if len(data) < 2:
        print("충분한 데이터가 없습니다. 추가 피드백을 받아주세요.")
        exit()
    
    X, y, mlb, categories_encoded, types_encoded = prepare_data(data)

    # 데이터 분할
    try:
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    except ValueError as e:
        print(e)
        print("테스트 세트 크기가 너무 큽니다. 데이터를 더 수집해주세요.")
        exit()

    # 모델 학습
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # 음식 추천
    allergies = input("알러지를 입력하세요 (여러개의 알러지 입력 가능, 쉼표로 구분): ").split(',')
    weather = input("날씨를 입력하세요 (맑음, 비, 흐림 중 선택): ")
    temperature = input("온도를 입력하세요 (더움, 추움 중 선택): ")
    situation = input("상황을 입력하세요 (아침, 점심, 저녁, 야식, 간식 중 선택): ")

    recommended_foods = recommend_food(model, mlb, categories_encoded, types_encoded, allergies, weather, temperature, situation)

    for food in recommended_foods:
        print(f"추천된 음식: {food}")
        response = input(f"{food}을(를) 원하십니까? (예/아니오): ")
        if response.lower() == '예':
            print(f"선택된 음식: {food}")
            break
    else:
        print("추천된 음식이 없습니다.")
