import pandas as pd
import random

# 가상의 데이터셋 생성 (예시)
data = {
    '음식': {
        '피자': ['유제품', '밀', '토마토'],
        '스테이크': ['쇠고기'],
        '초밥': ['해산물', '쌀'],
        '햄버거': ['밀', '쇠고기'],
        '샐러드': ['채소'],
        '파스타': ['밀', '계란'],
        '치킨': ['닭고기'],
        '타코': ['밀', '옥수수'],
        '라면': ['밀', '계란'],
        '샌드위치': ['밀', '계란', '채소'],
        '스시': ['해산물', '쌀'],
        '카레': ['쌀', '닭고기', '채소'],
        '파에야': ['해산물', '쌀', '채소'],
        '딤섬': ['밀', '채소'],
        '타파스': ['밀', '해산물'],
        '떡볶이': ['밀', '어묵', '고추장'],
        '훠궈': ['쇠고기', '야채', '떡'],
        '마라탕': ['쇠고기', '야채', '떡'],
        '짜장면': ['밀', '쇠고기', '야채'],
        '짬뽕': ['밀', '해산물', '야채'],
        '팟타이': ['쌀', '해산물', '야채'],
        '케밥': ['양고기', '채소', '밀가루'],
        '피쉬 앤 칩스': ['해산물', '감자', '밀가루'],
        '케이크': ['밀가루', '계란', '우유'],
        '파이': ['밀가루', '계란', '버터'],
        '아이스크림': ['우유']
    }
}

# 데이터를 DataFrame으로 변환
df = pd.DataFrame([(food, ingredients) for food, ingredients in data['음식'].items()], columns=['음식', '재료'])

# 새로운 음식 추천 함수
def recommend_food(allergies, previous_recommendations):
    # 중복을 제거한 알러지 종류
    unique_allergies = set(allergies)
    
    # 알러지에 해당하는 음식을 제외한 리스트 생성
    available_foods = df[df['재료'].apply(lambda ingredients: not unique_allergies.intersection(ingredients))] \
                        .loc[lambda x: ~x['음식'].isin(previous_recommendations)]['음식'].tolist()
    
    if not available_foods:
        return "추천할 수 있는 음식이 없습니다."
    
    # 랜덤으로 음식 추천
    recommended_food = random.choice(available_foods)
    
    return recommended_food

# 테스트
input_allergies = input("알러지를 입력하세요 (여러개의 알러지 입력 가능, 쉼표로 구분): ").split(',')
num_recommendations = int(input("추천을 몇 번 하시겠습니까?: "))

# 추천된 음식을 저장할 리스트
previous_recommendations = []

# 여러 번 추천을 수행하고 결과를 출력
for i in range(num_recommendations):
    recommendation = recommend_food(input_allergies, previous_recommendations)
    if recommendation == "추천할 수 있는 음식이 없습니다.":
        print(recommendation)
        break
    print(f"추천 {i+1}: {recommendation}")
    previous_recommendations.append(recommendation)
