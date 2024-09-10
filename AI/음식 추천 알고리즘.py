def recommend_food(user_input):
    # 사용자 입력 전처리
    input_data = pd.DataFrame([user_input])  # 입력 데이터를 DataFrame 형식으로 변환
    input_data_encoded = mlb.transform(input_data['식품중분류명'])  # 이진화
    
    # 예측 수행
    prediction = model.predict(input_data_encoded)
    return prediction
