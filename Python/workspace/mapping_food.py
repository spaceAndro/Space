# Define the list of food items from food_names
food_names = [
    "김치찌개", "된장찌개", "순두부찌개", "콩나물국", "떡국", "감자탕",
    "북엇국", "삼계탕", "설렁탕", "시래기국", "오징어국", "해물탕",
    "육개장", "배추국", "김치국", "곰탕", "떡만두국", "황태해장국", "해물 수제비",
    "황태국", "부대찌개", "우거지국", "비지찌개", "감자찌개",
    "갈비탕", "매운탕", "동태찌개", "미역국", "순대국", "홍합탕", "두부전골",
    "계란국", "무국", "낙지국", "애호박찌개", "마라탕",
    "참치국", "사골국", "버섯국", "고추장찌개", "수제비",
    "청국장", "해물순두부찌개", "만두국", "순두부국",
    "시래기된장국", "우렁강된장", "낙지탕탕이", "어묵탕", "미소 된장국",
    "차돌박이 된장찌개", "매운 갈비찜 찌개", "황태찌개", "오삼불고기 찌개",
    "파김치장어전골", "곱창전골", "우렁 된장찌개", "숙성지 김치찌개", "해물된장찌개",
    "마라샹궈", "비스크 수프", "클램 차우더", "크림수프", "블랙빈 수프",
    "랍스터 비스크", "토마토 바질 스프", "타마고야키",
    "양송이 수프", "아스파라거스 수프", "토마토 수프", "감자그라탕",
    "브로콜리 체다 수프", "감자크림수프", "시금치 수프", "호박 수프",
    "프렌치 어니언 수프", "호박죽", "계란말이", "랍스터 크림 스프",
    "비트 수프", "팥죽", "전복죽", "계란찜",
    "필라프", "니쿠자가", "시메사바", "카츠돈", "짜장밥", "연어 김밥",
    "삼선짬뽕밥", "전주비빔밥", "리조또", "잡채밥", "돈부리",
    "규동", "오니기리", "굴밥", "가마솥밥", "불고기덮밥",
    "소고기덮밥", "참치마요덮밥", "참치볶음밥", "깻잎 김밥",
    "꼬막비빔밥", "규카츠 덮밥", "장어덮밥", "카마메시", "이카메시", "야채 김밥",
    "깐쇼새우덮밥", "유니짜장", "오차즈케", "하이라이스", "참치 김밥",
    "가이센동", "샤케동", "오야코동", "쭈꾸미볶음", "소고기 김밥",
    "버섯 리소토", "로코모코", "참치 비빔밥", "새우볶음밥", "트러플 리소토", "계란 김밥",
    "토마토 리소토", "감바스 리조또", "새우 크림 리조또", "멸치 김밥", "새우 김밥",
    "유부 초밥", "불고기 덮밥", "제육덮밥", "김치볶음밥", "돈가스 김밥", "보리밥", "날치알 김밥", "카레라이스",
    "카레", "치킨 필라프", "타이 그린 카레", "버섯 볶음밥", "마파두부밥", "베이컨 김밥",
    "파인애플 볶음밥", "닭갈비 덮밥", "새우 카레라이스", "철판 볶음밥", "고추참치 김밥", "유부 김밥",
    "날치알 주먹밥", "회덮밥", "부타동", "가츠동", "새우가츠동", "가라아게가츠동", "월남쌈",
    "중화비빔면", "까르보나라 파스타", "바질페스토 파스타", "짬짜면", "회냉면", "무채 비빔국수",
    "트러플 파스타", "양송이 크림파스타", "우동", "라멘", "칼국수", "잡채", "비빔냉면", "아부라소바",
    "라면", "파스타", "짜장면", "짬뽕", "불닭볶음면", "물냉면", "연어 파스타", "카라이라멘",
    "미트볼 파스타", "초계비빔국수", "돈코츠라멘",
    "고추짬뽕", "야끼소바", "소바", "비빔국수", "쌀국수", "라볶이", "초계국수", "바지락 칼국수",
    "떡볶이", "김치볶음면", "마파면", "물막국수", "교카이라멘",
    "해물볶음우동", "메밀국수 샐러드", "미소시루", "우나기", "새우 스캄피 파스타", "명란 크림파스타",
    "토마토 갈릭 파스타", "탄탄멘", "차슈 라멘", "훈툰", "블랙 올리브 파스타", "투움바 파스타", "바질소바",
    "갈릭 새우 파스타", "크림 시금치 파스타", "바질페스토 라비올리", "해물라면", "마라짬뽕", "알리오 올리오",
    "쫄면", "바질 파스타", "트러플 마카로니", "크림치즈 파스타", "치킨 크림파스타", "잔치국수",
    "닭칼국수", "맥 앤 치즈", "시저 파스타 샐러드", "살몬 크림 파스타", "콩국수", "까르보나라 불닭볶음면",
    "푸실리 파스타", "나가사키 짬뽕", "매콤로제파스타", "상하이볶음면",
    "퀘사디아", "부리또", "포크 롤", "아란치니", "에그 베네딕트",
    "베이컨 에그 베네딕트", "크로와상 샌드위치", "햄 치즈 파니니",
    "피자", "햄버거", "샐러드 피자", "감자 피자", "브리또", "샌드위치", "라자냐", "시금치 피자",
    "찐빵", "타코", "멘보샤", "소룡포", "가츠샌드", "애호박 라자냐",
    "치킨 팟파이", "클럽 샌드위치", "치즈버거",
    "참치 샌드위치", "프렌치 토스트", "디아블로 피자", "포테이토베이컨 피자",
    "와플 샌드위치", "페스토 샌드위치", "크림치즈 베이글", "마르게리타 피자",
    "버팔로 치킨 샌드위치", "갈릭 토스트", "마늘빵", "베이글 샌드위치", "시나몬 롤", "치킨 시저랩",
    "페퍼로니 피자", "햄 치즈 토스트", "샐러드롤", "바질 페스토 샌드위치",
    "바나나 브레드", "연어 샌드위치",
    "그릴드 치즈 샌드위치"
]

# Define the foodImageMap dictionary
foodImageMap = {
    "bagel.png": ['크림치즈 베이글', '베이글 샌드위치'],
    "bibimbap.png": ['꼬막비빔밥', '참치 비빔밥', '전주비빔밥'],
    "bossam.png": ['보쌈'],
    "bread.png": ['마늘빵', '갈릭 토스트', '햄 치즈 토스트', '바나나 브레드', '피자 토스트'],
    "chicken.png": ['닭갈비', '후라이드 치킨', '바베큐 치킨', '레몬 치킨'],
    "corn.png": ['치즈 옥수수'],
    "curry.png": ['카레', '타이 그린 카레', '새우 카레라이스'],
    "fish.png": ['시메사바', '생선구이', '고등어구이', '갈치구이', '삼치구이', '연어구이'],
    "friedpotatoes.png": ['감자튀김', '칠리 치즈 감자튀김', '트러플 감자튀김'],
    "gamjajorim.png": ['니쿠자가', '베이컨 감자 샐러드', '구운 감자 샐러드'],
    "hamburger.png": ['햄버거', '치즈버거', '미니 햄버거'],
    "kimbap.png": ['베이컨 김밥', '멸치 김밥', '야채 김밥', '깻잎 김밥', '소고기 김밥', '연어 김밥', '참치 김밥', '고추참치 김밥', '돈가스 김밥', '유부 김밥'],
    "kimchi.png": ['김치', '백김치', '물김치'],
    "meat.png": ['스테이크', '삼겹살', '갈비찜', '소불고기', '불고기'],
    "sushi.png": ['초밥'],
    "noodles.png": ['국수', '칼국수', '잔치국수', '쫄면', '비빔국수'],
    "nuggets.png": ['치킨 너겟'],
    "pizza.png": ['피자', '마르게리타 피자', '페퍼로니 피자', '포테이토베이컨 피자', '디아블로 피자', '샐러드 피자'],
    "soup.png": ['마라탕', '김치찌개', '김치국', '숙성지 김치찌개', '김치찌개', '된장찌개', '순두부찌개', '콩나물국', '떡국', '감자탕', '북엇국', '삼계탕', '설렁탕', '시래기국', '오징어국', '해물탕', '육개장', '배추국', '김치국', '곰탕', '떡만두국', '황태해장국', '해물 수제비', '황태국', '부대찌개', '우거지국', '비지찌개', '감자찌개', '갈비탕', '매운탕', '동태찌개', '미역국', '순대국', '홍합탕', '두부전골', '계란국', '무국', '낙지국', '애호박찌개', '참치국', '사골국', '버섯국', '고추장찌개', '수제비', '청국장', '해물순두부찌개', '만두국', '순두부국', '시래기된장국', '우렁강된장', '낙지탕탕이', '어묵탕', '미소 된장국', '차돌박이 된장찌개', '매운 갈비찜 찌개', '황태찌개', '오삼불고기 찌개', '파김치장어전골', '곱창전골', '우렁 된장찌개', '숙성지 김치찌개', '해물된장찌개'],
    "soup2.png": ['전복죽', '팥죽', '비트 수프', '랍스터 크림 스프', '토마토 바질 스프', '랍스터 비스크', '호박죽', '시금치 수프', '감자크림수프', '브로콜리 체다 수프', '비스크 수프', '크림수프', '블랙빈 수프', '양송이 수프', '토마토 수프', '호박 수프', '아스파라거스 수프', '프렌치 어니언 수프', '클램 차우더'],
    "pasta.png": ['크림치즈 파스타', '알리오 올리오', '토마토 파스타', '트러플 파스타'],
    "onigiri.png": ['주먹밥', '날치알 주먹밥', '오니기리', '유부 초밥'],
    "ribs.png": ['갈비찜', '돼지갈비', '돼지갈비 스튜', '소갈비', '바베큐 폭립'],
    "rice.png": ['밥', '보리밥', '짜장밥'],
    "ricebowl.png": ['굴밥', '규동', '돈부리', '필라프', '덮밥', '삼선짬뽕밥', '소고기 덮밥', '김치볶음밥', '불고기 덮밥', '제육덮밥', '잡채밥'],
    "risotto.png": ['리조또', '버섯 리소토', '새우 크림 리조또', '트러플 리조또'],
    "salad.png": ['샐러드', '시저 샐러드', '포테이토 샐러드', '연어 샐러드'],
    "sashimi.png": ['광어 사시미', '연어 사시미', '참치 사시미'],
    "soondae.png": ['순대', '순대국밥'],
    "takoyaki.png": ['타코야키'],
    "tteokbokki.png": ['떡볶이'],
    "eggrolls": ['타마고야키', '계란말이'],
    "gyeranjjim": ['계란찜'],
    "tonkatsu": ['카츠돈']
}

# Flatten foodImageMap values to get a list of all foods already mapped to images
mapped_foods = {item for sublist in foodImageMap.values() for item in sublist}

# Find the foods in food_names that are not in the mapped_foods
missing_foods = [food for food in food_names if food not in mapped_foods]

# Write missing foods to a file named "missing_foodimages.txt"
file_path = 'data/missing_foodimages.txt'
with open(file_path, 'w', encoding='utf-8') as file:
    file.write("\n".join(missing_foods))
    print("missing_foodimages.txt가 생성되었습니다.")

file_path