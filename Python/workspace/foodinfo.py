import random
import pandas as pd

meal_food_names = [
    ("김치찌개", ["고기", "채소"]),
    ("된장찌개", ["쌀", "채소"]),
    ("순두부찌개", ["두부", "채소"]),
    ("콩나물국", ["채소"]),
    ("떡국", ["밀", "채소"]),
    ("김치볶음밥", ["쌀", "채소"]),
    ("순대", ["고기"]),
    ("제육볶음", ["고기", "채소"]),
    ("오징어볶음", ["해산물", "채소"]),
    ("아귀찜", ["해산물", "채소"]),
    ("삼계탕", ["고기", "채소"]),
    ("김치전", ["밀", "채소"]),
    ("채소전", ["밀", "채소"]),
    ("파전", ["밀", "채소"]),
    ("해물파전", ["밀", "해산물"]),
    ("중화비빔면", ["밀", "채소"]),
    ("해물탕", ["해산물", "채소"]),
    ("오징어국", ["해산물", "채소"]),
    ("설렁탕", ["고기", "채소"]),
    ("육개장", ["고기", "채소"]),
    ("우거지국", ["채소"]),
    ("김치국", ["채소"]),
    ("북엇국", ["해산물", "채소"]),
    ("시래기국", ["채소"]),
    ("배추국", ["채소"]),
    ("황태국", ["해산물", "채소"]),
    ("피쉬 앤 칩스", ["해산물", "채소"]),
    ("닭갈비", ["고기", "채소"]),
    ("감자탕", ["고기", "채소"]),
    ("육회", ["고기"]),
    ("족발", ["고기"]),
    ("오삼불고기", ["해산물", "고기", "채소"]),
    ("꼬막비빔밥", ["해산물", "쌀", "채소"]),
    ("황태해장국", ["해산물", "채소"]),
    ("김치볶음면", ["밀", "채소"]),
    ("곰탕", ["고기", "채소"]),
    ("비지찌개", ["두부", "채소"]),
    ("청국장", ["콩", "채소"]),
    ("매운갈비찜", ["고기", "채소"]),
    ("보리밥", ["쌀"]),
    ("떡만두국", ["밀", "고기", "채소"]),
    ("오징어순대", ["해산물", "고기", "채소"]),
    ("삼합", ["고기", "해산물", "채소"]),
    ("부대찌개", ["고기", "밀", "채소"]),
    ("해물라면", ["해산물", "밀", "채소"]),
    ("쭈꾸미볶음", ["해산물", "채소"]),
    ("꽁치구이", ["해산물"]),
    ("멘보샤", ["밀", "해산물"]),
    ("양꼬치", ["고기"]),
    ("고추기름 닭고기", ["고기"]),
    ("마라탕", ["고기", "채소"]),
    ("마라샹궈", ["고기", "채소"]),
    ("소룡포", ["밀", "고기"]),
    ("북경오리", ["고기", "채소"]),
    ("짜장밥", ["쌀", "채소", "고기"]),
    ("유니짜장", ["밀", "채소", "고기"]),
    ("마파면", ["밀", "고기", "채소"]),
    ("훈툰", ["밀", "고기"]),
    ("깐쇼새우", ["해산물", "채소"]),
    ("깐쇼새우덮밥", ["해산물", "쌀", "채소"]),
    ("사천식 돼지고기 볶음", ["고기", "채소"]),
    ("라조기", ["고기", "채소"]),
    ("꿔바로우", ["고기"]),
    ("꿔바로우 샐러드", ["고기", "채소"]),
    ("삼선짬뽕밥", ["해산물", "쌀", "채소"]),
    ("건두부볶음", ["두부", "채소"]),
    ("마라양념탕수육", ["고기", "채소"]),
    ("탕수육", ["고기"]),
    ("깐풍기", ["고기", "채소"]),
    ("해물볶음우동", ["해산물", "밀", "채소"]),
    ("초밥", ["쌀", "해산물"]),
    ("우동", ["밀", "채소"]),
    ("덴푸라", ["해산물", "채소"]),
    ("규동", ["쌀", "고기"]),
    ("오니기리", ["쌀", "채소"]),
    ("카츠돈", ["쌀", "고기"]),
    ("라멘", ["밀", "채소"]),
    ("미소시루", ["고기", "채소"]),
    ("타코야키", ["밀", "해산물", "채소"]),
    ("오코노미야키", ["밀", "해산물", "채소"]),
    ("소바", ["밀", "채소"]),
    ("규카츠 덮밥", ["고기", "쌀", "채소"]),
    ("하이라이스", ["쌀", "채소"]),
    ("오차즈케", ["쌀", "해산물"]),
    ("규카츠", ["고기", "채소"]),
    ("장어덮밥", ["해산물", "쌀"]),
    ("니쿠자가", ["고기", "채소"]),
    ("가이센동", ["해산물", "쌀"]),
    ("타마고야키", ["달걀", "유제품"]),
    ("오야코동", ["고기", "쌀", "달걀"]),
    ("시메사바", ["해산물"]),
    ("카마메시", ["쌀", "해산물", "채소"]),
    ("이카메시", ["쌀", "해산물"]),
    ("나가사키 짬뽕", ["해산물", "밀", "채소"]),
    ("우나기", ["해산물"]),
    ("샤케동", ["해산물", "쌀"]),
    ("에비텐동", ["해산물", "쌀"]),
    ("가츠샌드", ["밀", "고기"]),
    ("메밀국수 샐러드", ["밀", "채소"]),
    ("스테이크", ["고기", "채소"]),
    ("햄버거", ["밀", "채소"]),
    ("피자", ["밀", "채소"]),
    ("파스타", ["밀", "채소"]),
    ("치킨 알프레도", ["고기", "유제품"]),
    ("크림수프", ["유제품", "채소"]),
    ("부리또", ["밀", "채소", "고기"]),
    ("타코", ["밀", "채소"]),
    ("퀘사디아", ["밀", "고기", "채소"]),
    ("블랙빈 수프", ["콩", "채소"]),
    ("시저 샐러드", ["채소", "유제품"]),
    ("미트로프", ["고기", "채소"]),
    ("라따뚜이", ["채소"]),
    ("비프 브루기뇽", ["고기", "채소"]),
    ("치킨 팟파이", ["밀", "고기", "채소"]),
    ("치즈버거", ["밀", "고기", "채소"]),
    ("클럽 샌드위치", ["밀", "고기", "채소"]),
    ("샌드위치", ["밀", "고기", "채소"]),
    ("아란치니", ["쌀", "유제품"]),
    ("시저 치킨랩", ["밀", "고기", "채소"]),
    ("감바스 알 아히요", ["해산물", "채소"]),
    ("크로켓", ["밀", "채소", "고기"]),
    ("필라프", ["쌀", "채소"]),
    ("프렌치 어니언 수프", ["채소", "유제품"]),
    ("에그 베네딕트", ["밀", "달걀", "유제품"]),
    ("바질 파스타", ["밀", "채소"]),
    ("살몬 아보카도 샐러드", ["해산물", "채소"]),
    ("랍스터 비스크", ["해산물", "채소"]),
    ("포크 롤", ["고기", "밀"]),
    ("까르보나라 파스타", ["밀", "유제품"]),
    ("바질페스토 파스타", ["밀", "채소"]),
    ("연어 타르타르", ["해산물", "채소"]),
    ("푸아그라", ["고기", "유제품"]),
    ("버팔로윙", ["고기"]),
    ("랍스터 롤", ["해산물", "밀"]),
    ("베지터블 라자냐", ["채소", "유제품"]),
    ("치즈 감자튀김", ["감자", "유제품"]),
    ("참치 샌드위치", ["해산물", "밀"]),
    ("브런치 세트", ["밀", "유제품"]),
    ("크로와상 샌드위치", ["밀", "유제품"]),
    ("치킨 시저랩", ["고기", "채소"]),
    ("버섯 리소토", ["쌀", "유제품"]),
    ("닭가슴살 샐러드", ["고기", "채소"]),
    ("쉬림프 타코", ["해산물", "밀"]),
    ("프렌치 토스트", ["밀", "유제품"]),
    ("클램 차우더", ["해산물", "유제품"]),
    ("닭다리 구이", ["고기", "채소"]),
    ("감자 샐러드", ["감자", "채소"]),
    ("양고기 스테이크", ["고기"]),
    ("오리 로스트", ["고기", "채소"]),
    ("한우구이", ["고기"]),
    ("훈제 연어 샐러드", ["해산물", "채소"]),
    ("포테이토 샐러드", ["감자", "유제품", "채소"]),
    ("홍합찜", ["해산물"]),
    ("트러플 파스타", ["밀", "유제품"]),
    ("양고기 찹스", ["고기"]),
    ("새우 카레라이스", ["고기", "해산물", "쌀"]),
    ("카레라이스", ["고기", "쌀"]),
    ("베이컨 에그 베네딕트", ["고기", "달걀"]),
    ("양송이 크림파스타", ["버섯", "밀"]),
    ("닭가슴살 스테이크", ["고기", "채소"]),
    ("파인애플 볶음밥", ["쌀", "과일"]),
    ("햄 치즈 파니니", ["밀", "유제품"]),
    ("비스크 수프", ["해산물", "유제품"]),
    ("비트 샐러드", ["채소"]),
    ("닭갈비 덮밥", ["쌀", "고기"]),
    ("치킨 필라프", ["쌀", "고기"]),
    ("스테이크 타르타르", ["고기"]),
    ("레몬 허니 샐러드", ["채소"]),
    ("프레즐", ["밀"]),
    ("가자미조림", ["밀"]),
    ("로코모코", ["쌀", "고기"]),
    ("새우 토스트", ["해산물", "밀"]),
    ("바베큐 폭립", ["고기"]),
    ("새우 스캄피 파스타", ["해산물", "밀"]),
    ("감자 피자", ["감자", "밀"]),
    ("할라피뇨 팝퍼", ["채소", "유제품"]),
    ("시나몬 롤", ["밀", "유제품"]),
    ("페스토 샌드위치", ["밀", "유제품"]),
    ("바베큐 치킨 피자", ["밀", "고기"]),
    ("참치 니스와 샐러드", ["해산물", "채소"]),
    ("크림치즈 베이글", ["밀", "유제품"]),
    ("토마토 바질 스프", ["채소"]),
    ("아보카도 토스트", ["밀", "채소"]),
    ("맥 앤 치즈", ["밀", "유제품"]),
    ("애호박 라자냐", ["채소", "유제품"]),
    ("라자냐", ["유제품"]),
    ("사과 소스 포크", ["고기", "과일"]),
    ("토마토 갈릭 파스타", ["밀", "채소"]),
    ("소이 글레이즈드 연어", ["해산물", "대두"]),
    ("구운 감자 샐러드", ["감자", "채소"]),
    ("와플 샌드위치", ["밀", "유제품"]),
    ("토마토 치즈 타르트", ["밀", "유제품"]),
    ("돼지갈비 스튜", ["고기"]),
    ("렌틸콩 샐러드", ["콩", "채소"]),
    ("체다 치즈 튀김", ["감자", "유제품"]),
    ("레몬 치킨", ["고기", "과일"]),
    ("햄 치즈 토스트", ["밀", "유제품"]),
    ("스윗 칠리 새우", ["해산물", "채소"]),
    ("크림치즈 파스타", ["밀", "유제품"]),
    ("사우전 아일랜드 샐러드", ["채소", "유제품"]),
    ("불고기 타코", ["고기", "밀"]),
    ("브루스케타", ["밀", "채소"]),
    ("시금치 수프", ["채소", "유제품"]),
    ("바질 페스토 샌드위치", ["밀", "채소"]),
    ("허니 버터 칩", ["감자", "유제품"]),
    ("트러플 감자튀김", ["감자", "트러플"]),
    ("치킨 파마산", ["고기", "유제품"]),
    ("그릴드 연어", ["해산물"]),
    ("치즈 퀘사디아", ["밀", "유제품"]),
    ("크로크무슈", ["밀", "유제품"]),
    ("수박 샐러드", ["과일", "채소"]),
    ("라임 치킨", ["고기", "과일"]),
    ("오렌지 치킨", ["고기", "과일"]),
    ("시저 파스타 샐러드", ["밀", "채소"]),
    ("닭가슴살 튀김", ["고기"]),
    ("베이컨 감자 샐러드", ["채소", "감자", "유제품"]),
    ("바나나 브레드", ["밀", "유제품"]),
    ("치킨 크림파스타", ["고기", "유제품"]),
    ("오이 샐러드", ["채소"]),
    ("체다 치즈 칩", ["유제품"]),
    ("칠리 치즈 감자튀김", ["감자", "유제품"]),
    ("소시지 그라탱", ["고기", "유제품"]),
    ("미트볼 파스타", ["고기", "밀"]),
    ("크림 바질 피자", ["밀", "채소"]),
    ("페퍼로니 피자", ["밀", "고기"]),
    ("호박 수프", ["채소", "유제품"]),
    ("비프 타르타르", ["고기"]),
    ("그릴드 치즈 샌드위치", ["밀", "유제품"]),
    ("계란찜", ["달걀"]),
    ("오리엔탈 드레싱 샐러드", ["채소"]),
    ("버팔로 치킨 샐러드", ["고기", "채소"]),
    ("치킨 너겟", ["고기"]),
    ("감자전", ["감자", "채소"]),
    ("고구마튀김", ["고구마"]),
    ("감바스 리조또", ["해산물", "쌀"]),
    ("살사 치킨 타코", ["고기", "밀"]),
    ("갈릭 토스트", ["밀", "유제품"]),
    ("레몬 버터 새우", ["해산물", "유제품"]),
    ("베이글 샌드위치", ["밀", "유제품"]),
    ("냉채족발", ["고기", "채소"]),
    ("사천식 양꼬치", ["고기"]),
    ("까르보나라 불닭볶음면", ["밀", "고기"]),
    ("연어 파스타", ["해산물", "밀"]),
    ("비트 수프", ["채소"]),
    ("트러플 리소토", ["쌀", "유제품"]),
    ("치즈 옥수수", ["옥수수", "유제품"]),
    ("후라이드 치킨", ["고기"]),
    ("감자크림수프", ["감자", "유제품"]),
    ("토마토 수프", ["채소", "유제품"]),
    ("양송이 수프", ["버섯", "유제품"]),
    ("아스파라거스 수프", ["채소", "유제품"]),
    ("살몬 크림 파스타", ["해산물", "유제품"]),
    ("바질페스토 피자", ["밀", "채소"]),
    ("새우 크림 리조또", ["해산물", "쌀"]),
    ("리조또", ["고기", "쌀"]),
    ("연어 샌드위치", ["해산물", "밀"]),
    ("버섯 볶음밥", ["쌀", "채소"]),
    ("토마토 리소토", ["쌀", "채소"]),
    ("블랙 올리브 파스타", ["밀", "채소"]),
    ("타이 그린 카레", ["고기", "채소"]),
    ("치킨 카레", ["고기", "채소"]),
    ("미니 햄버거", ["밀", "고기"]),
    ("비건 버거", ["밀", "채소"]),
    ("토마토 브루스케타", ["밀", "채소"]),
    ("로메인 샐러드", ["채소"]),
    ("크림 시금치 파스타", ["채소", "밀"]),
    ("트러플 마카로니", ["밀", "유제품"]),
    ("트로피컬 샐러드", ["과일", "채소"]),
    ("토마토 달걀 볶음", ["달걀", "채소"]),
    ("미소 된장국", ["된장", "채소"]),
    ("랍스터 크림 스프", ["해산물", "유제품"]),
    ("파파야 샐러드", ["과일", "채소"]),
    ("갈릭 새우 파스타", ["해산물", "밀"]),
    ("마늘빵", ["밀", "유제품"]),
    ("양파 링", ["채소", "유제품"]),
    ("코코넛 치킨", ["고기", "코코넛"]),
    ("타이 새우 볶음", ["해산물", "채소"]),
    ("바질페스토 라비올리", ["밀", "유제품"]),
    ("토마토 모차렐라 피자", ["밀", "유제품"]),
    ("브로콜리 샐러드", ["채소"]),
    ("참치 카나페", ["해산물", "밀"]),
    ("삼겹살", ["고기"]),
    ("잡채", ["당면", "채소"]),
    ("계란말이", ["달걀", "채소"]),
    ("낙지볶음", ["해산물", "채소"]),
    ("닭볶음탕", ["닭고기", "채소"]),
    ("순두부국", ["두부", "채소"]),
    ("애호박전", ["밀", "채소"]),
    ("호박전", ["밀", "채소"]),
    ("돼지갈비", ["고기"]),
    ("소갈비찜", ["고기", "채소"]),
    ("닭강정", ["고기", "밀"]),
    ("불고기 덮밥", ["고기", "쌀"]),
    ("비빔국수", ["밀", "채소"]),
    ("계란국", ["달걀", "채소"]),
    ("호박죽", ["호박", "쌀"]),
    ("콩국수", ["콩", "밀"]),
    ("미역국", ["해조류", "채소"]),
    ("두부조림", ["두부", "채소"]),
    ("카레", ["쌀", "고기", "채소"]),
    ("새우구이", ["해산물"]),
    ("고등어조림", ["해산물", "채소"]),
    ("장어구이", ["해산물"]),
    ("소불고기", ["고기", "채소"]),
    ("낙지전골", ["해산물", "채소"]),
    ("전복죽", ["해산물", "쌀"]),
    ("갈치조림", ["해산물", "채소"]),
    ("닭칼국수", ["밀", "닭고기"]),
    ("부추전", ["채소"]),
    ("떡갈비", ["고기", "쌀"]),
    ("잡채밥", ["쌀", "채소"]),
    ("무국", ["채소"]),
    ("만두국", ["밀", "고기", "채소"]),
    ("칼국수", ["밀", "채소"]),
    ("새우완자", ["해산물", "채소"]),
    ("해물찜", ["해산물", "채소"]),
    ("매운탕", ["해산물", "채소"]),
    ("동태찌개", ["해산물", "채소"]),
    ("매운돼지갈비", ["고기", "채소"]),
    ("치즈계란말이", ["치즈", "달걀"]),
    ("제육덮밥", ["고기", "쌀"]),
    ("홍합탕", ["해산물", "채소"]),
    ("고구마전", ["고구마"]),
    ("한치물회", ["해산물", "채소"]),
    ("샐러드롤", ["밀", "채소"]),
    ("유부 초밥", ["쌀", "유부"]),
    ("닭봉구이", ["고기"]),
    ("갈치구이", ["해산물"]),
    ("삼치구이", ["해산물"]),
    ("임연수구이", ["해산물"]),
    ("쫄면", ["밀", "채소"]),
    ("마파두부", ["두부", "고기"]),
    ("짜장면", ["밀",'고기']),
    ("짬짜면", ["밀", '고기','해산물']),
    ("꽁치조림", ["해산물", "채소"]),
    ("갈비탕", ["고기", "채소"]),
    ("순대국", ["고기", "채소"]),
    ("돼지고기묵은지찜", ["고기", "채소"]),
    ("찜닭", ["닭고기", "채소"]),
    ("굴전", ["해산물", "채소"]),
    ("갈비구이", ["고기", "채소"]),
    ("팥죽", ["팥", "쌀"]),
    ("야채튀김", ["채소", "밀"]),
    ("피자 토스트", ["밀", "치즈"]),
    ("짬뽕", ["밀",'해산물']),
    ("시래기된장국", ["고기", "채소"]),
    ("고추장찌개", ["고기", "채소"]),
    ("조기구이", ["해산물"]),
    ("게장", ["해산물", "간장"]),
    ("고추짬뽕", ["밀",'해산물']),
    ("돼지고기볶음", ["고기", "채소"]),
    ("산적", ["고기", "채소"]),
    ("우렁강된장", ["해산물", "채소", "두부"]),
    ("어묵탕", ["해산물", "채소"]),
    ("어묵볶음", ["해산물", "채소"]),
    ("해물순두부찌개", ["해산물", "두부", "채소"]),
    ("고등어구이", ["해산물"]),
    ("굴밥", ["해산물", "쌀"]),
    ("낙지탕탕이", ["해산물"]),
    ("라면", ["밀", "고기"]),
    ("백숙", ["고기", "채소"]),
    ("가자미구이", ["해산물"]),
    ("도미구이", ["해산물"]),
    ("붕장어구이", ["해산물"]),
    ("전어구이", ["해산물"]),
    ("명태구이", ["해산물"]),
    ("방어구이", ["해산물"]),
    ("차돌박이 된장찌개", ["고기", "채소"]),
    ("감자찌개", ["고기", "채소"]),
    ("애호박찌개", ["고기", "채소"]),
    ("매운 갈비찜 찌개", ["고기", "채소"]),
    ("갈비찜", ["고기"]),
    ("황태찌개", ["해산물", "채소"]),
    ("오삼불고기 찌개", ["해산물", "고기", "채소"]),
    ("초계국수", ["밀", "채소"]),
    ("초계비빔국수", ["밀", "채소"]),
    ("잔치국수", ["밀", "채소"]),
    ("군만두", ["밀", "고기"]),
    ("튀김만두", ["밀", "고기"]),
    ("두부전골", ["두부", "채소"]),
    ("물냉면", ["밀", "채소"]),
    ("비빔냉면", ["밀", "채소"]),
    ("철판 볶음밥", ["쌀", "채소"]),
    ("수제비", ["밀", "채소"]),
    ("해물 수제비", ["밀", "채소", "해산물"]),
    ("마라짬뽕", ["밀", "고기","채소"]),
    ("마파두부밥", ["쌀", "두부", "고기"]),
    ("투움바 파스타", ["밀", "채소", "해산물"]),
    ("미트볼 파스타", ["밀", "채소", "고기"]),
    ("푸실리 파스타", ["밀", "채소", "고기"]),
    ("불닭", ["고기"]),
    ("불닭볶음면", ["밀"]),
    ("파김치장어전골", ["채소", "해산물"]),
    ("명란 크림파스타", ["고기", "유제품"]),
    ("샐러드 피자", ["밀", "채소", "유제품"]),
    ("바지락 칼국수", ["밀", "채소","해산물"]),
    ("백합탕", ["채소","해산물"]),
    ("곱창볶음", ["채소", "고기"]),
    ("순대국밥", ["채소", "고기"]),
    ("소곱창", ["채소", "고기"]),
    ("소대창", ["채소", "고기"]),
    ("소막창", ["채소", "고기"]),
    ("곱창전골", ["채소", "고기"]),
    ("물막국수", ["밀", "채소"]),
    ("마르게리타 피자", ["고기", "밀", "채소"]),
    ("디아블로 피자", ["고기", "밀", "채소"]),
    ("포테이토베이컨 피자", ["고기", "밀", "감자"]),
    ("시금치 피자", ["밀", "채소"]),
    ("알리오 올리오", ["해산물", "채소"]),
    ("로제쉬림프", ["해산물", "채소"]),
    ("야채 김밥", ["쌀", "채소"]),
    ("참치 김밥", ["쌀", "해산물"]),
    ("소고기 김밥", ["쌀", "해산물"]),
    ("계란 김밥", ["쌀", "달걀"]),
    ("멸치 김밥", ["쌀", "해산물"]),
    ("새우 김밥", ["쌀", "해산물"]),
    ("돈가스 김밥", ["쌀", "고기"]),
    ("날치알 김밥", ["쌀", "해산물"]),
    ("베이컨 김밥", ["쌀", "고기"]),
    ("깻잎 김밥", ["쌀", "채소"]),
    ("고추참치 김밥", ["쌀", "해산물"]),
    ("연어 김밥", ["쌀", "해산물"]),
    ("유부 김밥", ["쌀", "밀"]),
    ("꽃목살", ["고기"]),
    ("낙지국", ["해산물"]),
    ("참치국", ["해산물"]),
    ("회냉면", ["밀", "해산물"]),
    ("양갈비", ["고기"]),
    ("항정살", ["고기"]),
    ("소갈비살", ["고기"]),
    ("우렁 된장찌개", ["고기", "해산물", "채소"]),
    ("숙성지 김치찌개", ["두부", "채소"]),
    ("무채 비빔국수", ["밀", "채소"]),
    ("날치알 주먹밥", ["쌀", "해산물"]),
    ("연어 사시미", ["해산물", "채소"]),
    ("광어 사시미", ["해산물", "채소"]),
    ("참치 사시미", ["해산물", "채소"]),
    ("회덮밥", ["해산물", "쌀"]),
    ("해물된장찌개", ["해산물", "두부", "채소"]),
    ("파삼겹", ["채소", "고기"]),
    ("초벌 막창", ["고기"]),
    ("아부라소바", ["밀", "고기", "채소", "달걀"]),
    ("돈코츠라멘", ["밀", "고기", "채소", "달걀"]),
    ("카라이라멘", ["밀", "고기", "채소", "달걀"]),
    ("교카이라멘", ["밀", "고기", "채소", "달걀", "해산물"]),
    ("바질소바", ["밀", "채소"]),
    ("부타동", ["쌀", "채소", "고기"]),
    ("조개찜", ["해산물", "채소", "고기"]),
    ("장어정식", ["해산물", "채소", "고기"]),
    ("모듬카츠", ["채소", "고기"]),
    ("로스카츠", ["채소", "고기"]),
    ("히레카츠", ["채소", "고기"]),
    ("치즈카츠", ["채소", "고기", "치즈"]),
    ("고구마치즈카츠", ["채소", "고기", "유제품"]),
    ("매콤로제파스타", ["밀", "채소", "고기"]),
    ("돈카츠 회오리 오므라이스", ["달걀", "채소", "고기"]),
    ("가츠동", ["쌀", "채소", "고기"]),
    ("새우가츠동", ["쌀", "채소", "고기", "해산물"]),
    ("가라아게가츠동", ["쌀", "채소", "고기"]),
    ("갈매기살", ["고기"]),
    ("월남쌈", ["쌀", "고기", "채소"]),
    ("크림통새우", ["해산물","채소"]),
    ("상하이볶음면", ["밀", "채소"]),
    ("연어구이", ["해산물"]),
    ("참치 비빔밥", ["해산물", "쌀", "채소"]),
    ("전주비빔밥", ["쌀", "채소","고기"]),
    ("가마솥밥", ["쌀"]),
    ("튀김우동", ["밀", "채소"]),
    ("유산슬", ["버섯", "채소", "해산물", "고기"]),
    ("야끼소바", ["밀", "채소", "해산물", "고기"]),
    ("쌀국수", ["쌀", "채소", "고기"]),
    ("라볶이", ["밀", "고기"]),
    ("떡볶이", ["밀"]),
    ("버팔로 치킨 샌드위치", ["밀", "고기", "채소"]),
    ("찐빵", ["밀", "팥"]),
    ("소고기덮밥", ["쌀", "고기"]),
    ("불고기덮밥", ["쌀", "고기"]),
    ("사골국", ["채소", "고기"]),
    ("버섯국", ["채소", "버섯"]),
    ("참치마요덮밥", ["쌀", "해산물"]),
    ("참치볶음밥", ["쌀", "해산물"]),
    ("새우볶음밥", ["쌀", "해산물"]),
    ("불고기", ["고기"]),
    ("돈부리", ["쌀", "고기", "채소"]),
    ("새우튀김", ["밀", "해산물"]),
    ("탄탄멘", ["밀", "고기", "채소"]),
    ("차슈 라멘", ["밀", "고기", "채소"]),
    ("보쌈", ["고기", "채소"]),
    ("유린기", ["고기", "채소"]),
    ("안동찜닭", ["고기", "채소"]),
    ("토마호크 스테이크", ["고기"]),
    ("감자튀김", ["감자", "밀"]),
    ("동파육", ["고기", "채소"]),
    ("오향장육", ["고기", "채소"]),
    ("바베큐 치킨", ["고기"]),
    ("닭튀김", ["밀", "고기"]),
    ("단호박튀김", ["밀", "채소"]),
    ("오징어 튀김", ["밀", "해산물"]),
    ("치즈스틱", ["밀", "유제품"]),
    ("가라아게", ["밀", "고기"]),
    ("고로케", ["밀", "감자"]),
    ("브로콜리 체다 수프", ["채소", "유제품"]),
    ("깻잎전", ["채소", "밀"]),
    ("감자그라탕", ["채소", "밀","유제품"]),
    ("연어 스테이크", ["채소", "밀", "유제품"])
]

food_categories = {
    "국류": [
        "김치찌개", "된장찌개", "순두부찌개", "콩나물국", "떡국", "감자탕",
        "북엇국", "삼계탕", "설렁탕", "시래기국", "오징어국", "해물탕",
        "육개장", "배추국", "김치국", "곰탕", "떡만두국", "황태해장국", "해물 수제비",
        "황태국", "부대찌개", "우거지국", "비지찌개", "감자찌개",
        "갈비탕", "매운탕", "동태찌개", "미역국", "순대국", "두부전골",
        "계란국", "무국", "낙지국", "애호박찌개", "마라탕",
        "참치국", "사골국", "버섯국", "고추장찌개", "수제비",
        "홍합탕", "청국장", "해물순두부찌개", "만두국", "순두부국",
        "시래기된장국", "우렁강된장", "낙지탕탕이", "어묵탕", "미소 된장국",
        "차돌박이 된장찌개", "매운 갈비찜 찌개", "황태찌개", "오삼불고기 찌개",
        "파김치장어전골", "곱창전골", "우렁 된장찌개", "숙성지 김치찌개", "해물된장찌개",
        "마라샹궈", "비스크 수프", "클램 차우더", "크림수프", "블랙빈 수프",
        "랍스터 비스크", "토마토 바질 스프", "타마고야키",
        "양송이 수프", "아스파라거스 수프", "토마토 수프", "감자그라탕",
        "브로콜리 체다 수프", "감자크림수프", "시금치 수프", "호박 수프",
        "프렌치 어니언 수프", "호박죽", "계란말이", "랍스터 크림 스프",
        "비트 수프", "팥죽", "전복죽", "계란찜"
    ],
    "밥류": [
        "필라프", "니쿠자가", "시메사바", "카츠돈", "짜장밥", "연어 김밥",
        "삼선짬뽕밥", "전주비빔밥", "리조또", "잡채밥", "돈부리",
        "규동", "오니기리", "굴밥", "가마솥밥", "불고기덮밥",
        "소고기덮밥", "참치마요덮밥", "참치볶음밥", "깻잎 김밥",
        "꼬막비빔밥", "규카츠 덮밥", "장어덮밥", "카마메시", "이카메시", "야채 김밥",
        "깐쇼새우덮밥", "유니짜장", "오차즈케", "하이라이스", "참치 김밥",
        "가이센동", "샤케동", "오야코동", "보리밥", "쭈꾸미볶음", "소고기 김밥",
        "버섯 리소토", "로코모코", "참치 비빔밥", "새우볶음밥", "트러플 리소토", "계란 김밥",
        "토마토 리소토", "감바스 리조또", "새우 크림 리조또", "멸치 김밥", "새우 김밥",
        "유부 초밥", "불고기 덮밥", "제육덮밥", "김치볶음밥", "돈가스 김밥", "날치알 김밥", "카레라이스",
        "카레", "치킨 필라프", "타이 그린 카레", "버섯 볶음밥", "마파두부밥", "베이컨 김밥",
        "파인애플 볶음밥", "닭갈비 덮밥", "새우 카레라이스", "철판 볶음밥", "고추참치 김밥", "유부 김밥",
        "날치알 주먹밥", "회덮밥", "부타동", "가츠동", "새우가츠동", "가라아게가츠동", "월남쌈"
    ],
    "면류": [
        "중화비빔면", "까르보나라 파스타", "바질페스토 파스타", "짬짜면", "회냉면", "무채 비빔국수",
        "트러플 파스타", "양송이 크림파스타", "우동", "라멘", "칼국수", "잡채", "비빔냉면", "아부라소바",
        "라면", "파스타", "짜장면", "짬뽕", "불닭볶음면", "물냉면", "연어 파스타", "카라이라멘",
        "미트볼 파스타", "초계비빔국수", "돈코츠라멘",
        "고추짬뽕", "야끼소바", "소바", "비빔국수", "쌀국수", "라볶이", "초계국수", "바지락 칼국수",
        "푸실리 파스타", "떡볶이", "김치볶음면", "마파면", "물막국수", "교카이라멘",
        "해물볶음우동", "메밀국수 샐러드", "미소시루", "우나기", "새우 스캄피 파스타", "명란 크림파스타",
        "토마토 갈릭 파스타", "탄탄멘", "차슈 라멘", "훈툰", "블랙 올리브 파스타", "투움바 파스타", "바질소바",
        "갈릭 새우 파스타", "크림 시금치 파스타", "바질페스토 라비올리", "해물라면", "마라짬뽕", "알리오 올리오",
        "쫄면", "바질 파스타", "트러플 마카로니", "크림치즈 파스타", "치킨 크림파스타", "잔치국수",
        "닭칼국수", "맥 앤 치즈", "시저 파스타 샐러드", "살몬 크림 파스타", "콩국수", "까르보나라 불닭볶음면",
        "나가사키 짬뽕", "매콤로제파스타", "상하이볶음면"
    ],
    "빵류": [
        "퀘사디아", "부리또", "포크 롤", "아란치니", "에그 베네딕트",
        "베이컨 에그 베네딕트", "크로와상 샌드위치", "햄 치즈 파니니",
        "피자", "햄버거", "샐러드 피자", "감자 피자",
        "샌드위치", "라자냐", "시금치 피자",
        "찐빵", "타코", "멘보샤", "소룡포", "가츠샌드", "애호박 라자냐",
        "치킨 팟파이", "클럽 샌드위치", "치즈버거",
        "참치 샌드위치", "프렌치 토스트", "디아블로 피자", "포테이토베이컨 피자",
        "와플 샌드위치", "페스토 샌드위치", "크림치즈 베이글", "마르게리타 피자",
        "버팔로 치킨 샌드위치", "갈릭 토스트",
        "마늘빵", "베이글 샌드위치", "시나몬 롤", "치킨 시저랩",
        "페퍼로니 피자", "햄 치즈 토스트", "샐러드롤", "바질 페스토 샌드위치",
        "바나나 브레드", "연어 샌드위치",
        "그릴드 치즈 샌드위치", "바베큐 치킨 피자", "치즈 퀘사디아", "브루스케타",
        "참치 카나페", "피자 토스트", "미니 햄버거",
        "토마토 모차렐라 피자", "크로크무슈", "랍스터 롤", "크림 바질 피자",
        "바질페스토 피자", "토마토 브루스케타", "시저 치킨랩", "프레즐", "토마토 치즈 타르트",
        "쉬림프 타코", "베지터블 라자냐", "아보카도 토스트", "비건 버거", "브런치 세트",
        "살사 치킨 타코"
    ],
    "채소류": [
        "마파두부", "건두부볶음", "두부조림",
        "라따뚜이", "레몬 허니 샐러드",
        "버팔로 치킨 샐러드", "사우전 아일랜드 샐러드", "훈제 연어 샐러드",
        "브로콜리 샐러드", "토마토 달걀 볶음", "치즈 옥수수", "시저 샐러드", "살몬 아보카도 샐러드",
        "트로피컬 샐러드", "오리엔탈 드레싱 샐러드", "로메인 샐러드", "감자 샐러드",
        "파파야 샐러드", "새우 토스트", "수박 샐러드", "비트 샐러드",
        "오이 샐러드", "렌틸콩 샐러드", "포테이토 샐러드", "참치 니스와 샐러드",
        "체다 치즈 튀김", "체다 치즈 칩", "허니 버터 칩", "닭가슴살 샐러드",
        "베이컨 감자 샐러드", "구운 감자 샐러드"
    ],
    "육류": [
        "꿔바로우", "마라양념탕수육", "푸아그라", "양고기 스테이크", "오리 로스트",
        "한우구이", "양고기 찹스", "닭가슴살 스테이크", "닭다리 구이", "버팔로윙",
        "제육볶음", "닭갈비", "스테이크", "불고기", "삼겹살", "갈비찜", "보쌈",
        "탕수육", "유린기", "군만두", "규카츠", "꽃목살",
        "깐풍기", "동파육", "가라아게", "양갈비",
        "오향장육", "미트로프", "돼지갈비",
        "닭볶음탕", "불닭", "안동찜닭", "치킨 알프레도", "족발", "양꼬치", "닭강정",
        "비프 브루기뇽", "고추기름 닭고기", "북경오리", "사천식 돼지고기 볶음", "소막창",
        "라조기", "매운갈비찜", "삼합", "소대창",
        "바베큐 폭립", "레몬 치킨", "사과 소스 포크", "불고기 타코", "토마호크 스테이크",
        "바베큐 치킨", "치킨 파마산", "비프 타르타르",
        "닭가슴살 튀김", "갈비구이", "오렌지 치킨", "돼지고기묵은지찜", "연어 타르타르",
        "코코넛 치킨", "치킨 너겟", "닭봉구이", "산적", "타이 새우 볶음",
        "소이 글레이즈드 연어", "치킨 카레", "매운돼지갈비", "냉채족발", "순대국밥",
        "후라이드 치킨", "치즈계란말이", "순대", "오삼불고기", "곱창볶음", "소곱창",
        "육회", "소갈비찜", "라임 치킨", "떡갈비", "찜닭", "소불고기", "백숙", "사천식 양꼬치",
        "돼지갈비 스튜", "소시지 그라탱", "스테이크 타르타르", "돼지고기볶음", "항정살",
        "소갈비살", "파삼겹", "초벌 막창", "모듬카츠", "로스카츠", "히레카츠", "치즈카츠",
        "고구마치즈카츠", "돈카츠 회오리 오므라이스", "갈매기살"
    ],
    "튀김류": [
        "새우튀김", "덴푸라", "튀김만두", "고구마튀김", "닭튀김",
        "단호박튀김", "크로켓", "에비텐동", "피쉬 앤 칩스", "치즈 감자튀김",
        "할라피뇨 팝퍼", "스윗 칠리 새우", "오징어 튀김", "꿔바로우 샐러드",
        "감자튀김", "치즈스틱", "깐쇼새우", "양파 링",
        "고로케", "튀김우동", "타코야키", "칠리 치즈 감자튀김", "야채튀김", "트러플 감자튀김",
        "김치전", "해물파전", "채소전", "고구마전", "깻잎전", "감자전",
        "호박전", "파전", "부추전", "애호박전", "굴전", "오코노미야키"
    ],
    "해산물류": [
        "한치물회",  "갈치구이", "낙지볶음", "새우구이", "고등어구이", "새우완자", "해물찜",
        "오징어볶음", "갈치조림", "낙지전골", "게장", "꽁치조림", "장어구이",
        "레몬 버터 새우", "홍합찜", "조기구이", "꽁치구이", "감바스 알 아히요", "광어 사시미",
        "어묵볶음", "고등어조림", "아귀찜", "그릴드 연어", "오징어순대",
        "삼치구이", "임연수구이", "가자미구이", "도미구이", "붕장어구이", "전어구이", "조개찜",
        "명태구이", "방어구이", "연어구이", "백합탕", "로제쉬림프", "연어 사시미", "참치 사시미",
        "장어정식", "크림통새우", "유산슬", "연어 스테이크", "가자미조림", "초밥"
    ],
}

cuisine_types = {
    "한식": ['가자미조림', '불고기덮밥', '깻잎전', '오징어 튀김', '단호박튀김', '닭튀김', '동파육', '새우볶음밥', '참치볶음밥', '참치마요덮밥', '버섯국', '사골국', '참치국', '낙지국', '찐빵', '라볶이', '참치 비빔밥', '파전', '호박전', '갈매기살', '장어정식', '초벌 막창', '파삼겹', '해물된장찌개', '날치알 주먹밥', '무채 비빔국수', '숙성지 김치찌개', '우렁 된장찌개', '소갈비살', '항정살', '양갈비', '회냉면', '꽃목살', '유부 김밥', '고추참치 김밥', '깻잎 김밥', '날치알 김밥', '돈가스 김밥', '새우 김밥', '라면', '멸치 김밥', '계란 김밥', '소고기 김밥', '참치 김밥', '야채 김밥', '물막국수', '곱창전골', '소막창', '소대창', '소곱창', '순대국밥', '곱창볶음', '백합탕', '바지락 칼국수', '해물 수제비', '파김치장어전골', '해물 수제.비', '수제비', '철판 볶음밥', '비빔냉면', '두부전골', '잔치국수', '초계국수', '초계비빔국수', '오삼불고기 찌개', '황태찌개', '매운 갈비찜 찌개', '붕장어구이', '애호박찌개', '감자찌개', '차돌박이 된장찌개', '연어구이', '방어구이', '명태구이', '전어구이', '도미구이', '가자미구이', '임연수구이', '삼치구이', '갈치구이', '낙지탕탕이', '순대국', '불닭볶음면', '까르보나라 불닭볶음면', '후라이드 치킨', '동태찌개', '제육덮밥', '어묵볶음', '어묵탕', '고구마튀김', '새우완자', '유부 초밥', '돼지고기묵은지찜', '순두부국', '닭강정', '매운돼지갈비', '콩국수', '낙지볶음', '우렁강된장', '갈치조림', '돼지고기볶음', '시래기된장국', '소불고기', '치즈계란말이', '해물순두부찌개', '팥죽', '만두국', '수박 샐러드', '불고기 덮밥', '전복죽', '감자전', '무국', '갈비구이', '고등어구이', '찜닭', '호박죽', '게장', '부추전', '해물찜', '한치물회', '매운탕', '버섯볶음', '쫄면', '닭칼국수', '미역국', '야채튀김', '꽁치조림', '홍합탕', '두부조림', '오이 샐러드', '미소 된장국', '조기구이', '닭봉구이', '장어구이', '계란찜', '비빔국수', '버섯 볶음밥', '낙지전골', '백숙', '고구마전', '산적', '떡갈비', '고등어조림', '시금치 수프', '굴전', '소갈비찜', '갈비탕', '애호박전', '돼지갈비', '계란국', '고추장찌개', '냉채족발', '계란말이', '김치찌개', '된장찌개', '제육볶음', '닭갈비', '감자탕', '김치볶음밥', '김치전', '떡국', '북엇국', '삼계탕', '설렁탕', '순대', '순두부찌개', '시래기국', '아귀찜', '오징어국', '오징어볶음', '육개장', '콩나물국', '해물탕', '해물파전', '가마솥밥', '갈비찜', '꼬막비빔밥', '굴밥', '물냉면', '닭볶음탕', '보쌈', '볶음밥', '불고기', '불닭', '전주비빔밥', '삼겹살', '소고기덮밥', '안동찜닭', '잡채밥', '잡채', '채소전', '족발', '김치볶음면', '떡볶이', '칼국수', '배추국', '보리밥', '김치국', '비지찌개', '오징어순대', '꽁치구이', '황태국', '육회', '오삼불고기', '해물라면', '부대찌개', '청국장', '황태해장국', '매운갈비찜', '삼합', '쭈꾸미볶음', '우거지국', '떡만두국', '곰탕', '한우구이', '닭갈비 덮밥'],
    "중식": ['오향장육', '깐풍기', '유린기', '탄탄멘', '쌀국수', '상하이볶음면', '월남쌈', '마파두부', '마파두부밥', '마라짬뽕', '짬짜면', '토마토 달걀 볶음', '오렌지 치킨', '사천식 양꼬치','짜장밥', '삼선짬뽕밥', '멘보샤', '양꼬치', '고추기름 닭고기', '마라탕', '마라샹궈', '소룡포', '북경오리', '유니짜장', '마파면', '훈툰', '깐쇼새우덮밥', '사천식 돼지고기 볶음', '라조기', '꿔바로우 샐러드', '건두부볶음', '마라양념탕수육', '해물볶음우동', '고추짬뽕', '군만두', '튀김만두', '깐쇼새우', '꿔바로우', '짬뽕', '짜장면', '탕수육', '중화비빔면', '사천식 닭 날개', '마라 샤브샤브'],
    "일식": ['가라아게', '차슈 라멘', '새우튀김', '돈부리', '야끼소바', '튀김우동', '가라아게가츠동', '새우가츠동', '가츠동', '고구마치즈카츠', '치즈카츠', '히레카츠', '로스카츠', '모듬카츠', '부타동', '바질소바', '교카이라멘', '카라이라멘', '돈코츠라멘', '아부라소바', '참치 사시미', '광어 사시미', '연어 사시미', '훈제 연어 샐러드', '연어 타르타르', '우동', '라멘', '초밥', '덴푸라', '규동', '오니기리', '카츠돈', '미소시루', '타코야키', '오코노미야키', '소바', '규카츠 덮밥', '하이라이스', '오차즈케', '규카츠', '장어덮밥', '니쿠자가', '가이센동', '타마고야키', '오야코동', '시메사바', '카마메시', '이카메시', '나가사키 짬뽕', '우나기', '샤케동', '에비텐동', '가츠샌드', '메밀국수 샐러드', '미소된장국'],
    "양식": ['연어 스테이크', '카레라이스', '감자그라탕', '브로콜리 체다 수프', '아스파라거스 수프', '양송이 수프', '토마토 수프', '고로케', '치즈스틱', '라자냐', '감자튀김', '토마호크 스테이크', '리조또', '샌드위치', '버팔로 치킨 샌드위치', '크림통새우', '매콤로제파스타', '조개찜', '회덮밥', '포테이토베이컨 피자', '로제쉬림프', '알리오 올리오', '시금치 피자', '디아블로 피자', '마르게리타 피자', '샐러드 피자', '푸실리 파스타', '미트볼 파스타', '트러플 마카로니', '크림 바질 피자', '맥 앤 치즈', '와플 샌드위치', '투움바 파스타', '토마토 갈릭 파스타', '미니 햄버거', '치킨 너겟', '베이글 샌드위치', '햄 치즈 토스트', '바나나 브레드', '감자크림수프', '갈릭 토스트', '페스토 샌드위치', '바베큐 치킨', '토마토 리소토', '바베큐 치킨 피자', '라임 치킨', '체다 치즈 튀김', '토마토 모차렐라 피자', '브루스케타', '마늘빵', '크로크무슈', '레몬 치킨', '시나몬 롤', '로코모코', '체다 치즈 칩', '연어 파스타', '프레즐', '렌틸콩 샐러드', '양파 링', '아보카도 토스트', '소시지 그라탱', '참치 니스와 샐러드', '돼지갈비 스튜', '연어 샌드위치', '크림치즈 파스타', '버팔로 치킨 샐러드', '새우 스캄피 파스타', '토마토 치즈 타르트', '감자 피자', '치즈 옥수수', '사우전 아일랜드 샐러드', '레몬 버터 새우', '그릴드 치즈 샌드위치', '레몬 허니 샐러드', '소이 글레이즈드 연어', '오리엔탈 드레싱 샐러드', '로메인 샐러드', '바질 페스토 샌드위치', '미트볼 파스타', '치킨 파마산', '스테이크 타르타르', '구운 감자 샐러드', '그릴드 연어', '바질페스토 피자', '할라피뇨 팝퍼', '비트 수프', '허니 버터 칩', '치킨 크림파스타', '랍스터 크림 스프', '비프 타르타르', '칠리 치즈 감자튀김', '갈릭 새우 파스타', '블랙 올리브 파스타', '살몬 크림 파스타', '크림치즈 베이글', '토마토 바질 스프', '새우 크림 리조또', '바질페스토 라비올리', '감바스 리조또', '토마토 브루스케타', '바베큐 폭립', '페퍼로니 피자', '비건 버거', '코코넛 치킨', '트러플 감자튀김', '사과 소스 포크', '트러플 리소토', '피자 토스트', '까르보나라 파스타', '바질페스토 파스타', '트러플 파스타', '비스크 수프', '푸아그라', '베이컨 에그 베네딕트', '스테이크', '피자', '샐러드', '크림수프', '라따뚜이', '비프 브루기뇽', '치킨 팟파이', '치즈버거', '클럽 샌드위치', '시저 치킨랩', '감바스 알 아히요', '크로켓', '필라프', '프렌치 어니언 수프', '바질 파스타', '살몬 아보카도 샐러드', '랍스터 비스크', '포크 롤', '미트로프', '햄버거', '피쉬 앤 칩스', '치킨 알프레도', '시저 샐러드', '블랙빈 수프', '파스타', '감자 샐러드', '포테이토 샐러드', '브런치 세트', '양송이 크림파스타', '클램 차우더', '닭다리 구이', '양고기 찹스', '닭가슴살 샐러드', '오리 로스트', '크로와상 샌드위치', '새우 카레라이스', '닭가슴살 스테이크', '비트 샐러드', '양고기 스테이크', '치즈 감자튀김', '버섯 리소토', '베지터블 라자냐', '참치 샌드위치', '버팔로윙', '홍합찜', '랍스터 롤', '치킨 시저랩', '프렌치 토스트', '새우 크림 스튜'],
    "퓨전": ['유산슬', '돈카츠 회오리 오므라이스', '연어 김밥', '베이컨 김밥', '명란 크림파스타', '애호박 라자냐', '타이 새우 볶음', '치즈 퀘사디아', '트로피컬 샐러드', '치킨 카레', '살사 치킨 타코', '참치 카나페', '샐러드롤', '새우 토스트', '파파야 샐러드', '닭가슴살 튀김', '새우구이', '타이 그린 카레', '스윗 칠리 새우', '불고기 타코', '카레', '베이컨 감자 샐러드', '호박 수프', '브로콜리 샐러드', '크림 시금치 파스타', '시저 파스타 샐러드', '쉬림프 타코', '파인애플 볶음밥', '치킨 필라프', '햄 치즈 파니니', '퀘사디아', '감바스 알 아히요', '부리또', '아란치니', '에그 베네딕트', '타코', '타이식 닭볶음', '하와이안 치킨 샐러드']
}

weather_weights = {
    "Clear": ["볶음밥", "김치찌개"],  # 맑은 날에 나오는 음식 리스트
    "Cloudy": ["제육볶음", "삼계탕", "비빔밥"],  # 흐린 날에 나오는 음식 리스트
    "Rain": ["파전", "감자탕", "해물파전", "김치전"],  # 비오는 날에 더 자주 나오는 음식들
    "Snow": ["떡국", "설렁탕", "감자탕"]  # 눈 오는 날에 나오는 음식들
}

# 알레르기 번호 설정
allergy_map = {
    "없음": 0,
    "우유": 1,
    "달걀": 2,
    "땅콩": 3,
    "견과류": 4,
    "해산물": 5,
    "갑각류": 6,
    "밀": 7,
    "대두류": 8
}

# 각 음식의 알레르기 정보를 설정
def get_allergy_info(ingredients):
    allergies = set()
    if "밀" in ingredients:
        allergies.add(allergy_map["밀"])
    if "해산물" in ingredients:
        allergies.add(allergy_map["해산물"])
    if "갑각류" in ingredients:
        allergies.add(allergy_map["갑각류"])
    if "대두" in ingredients or "두부" in ingredients:
        allergies.add(allergy_map["대두류"])
    if "달걀" in ingredients:
        allergies.add(allergy_map["달걀"])
    if "유제품" in ingredients:
        allergies.add(allergy_map["우유"])

    return sorted(allergies) if allergies else [allergy_map["없음"]]

num_samples = 3000

# 데이터 생성
data = {
    "food_id": [],
    "food_name": [],
    "weather_condition": [],
    "allergy_info": [],
    "main_ingredient_1": [],
    "main_ingredient_2": [],
    "food_category": [],
    "cuisine_type": [],
    "season": []
}

for i in range(1, num_samples + 1):
    food_name, ingredients = random.choice(meal_food_names)
    cuisine_type = next((key for key, values in cuisine_types.items() if food_name in values), "기타")
    food_category = next((key for key, values in food_categories.items() if food_name in values), "기타")
    weather_condition = random.choice(['Clear', 'Cloudy', 'Rain', 'Snow'])
    allergies = get_allergy_info(ingredients)
    allergy_info = ','.join(map(str, allergies))  # 알레르기 정보를 숫자로 변환
    main_ingredient_1 = ingredients[0] if len(ingredients) > 0 else ''
    main_ingredient_2 = ingredients[1] if len(ingredients) > 1 else ''

    season = random.choice(['Spring', 'Summer', 'Fall', 'Winter'])

    if season == 'Summer':
        weather_condition = random.choice(['Clear', 'Cloudy', 'Rain'])
    elif season == 'Winter':
        weather_condition = random.choice(['Clear', 'Cloudy', 'Snow'])
    else:
        weather_condition = random.choice(['Clear', 'Cloudy', 'Rain', 'Snow'])

    # 날씨에 따라 음식 선택 가중치 적용
    if weather_condition in weather_weights:
        weighted_foods = weather_weights[weather_condition]
        if random.random() < 0.5:  # 50% 확률로 날씨와 관련된 음식을 선택
            weighted_food = random.choice(weighted_foods)
            # weighted_food가 실제 음식 데이터에 존재하는지 확인하고 가져오기
            weighted_food_data = next(((name, ingr) for name, ingr in meal_food_names if name == weighted_food), None)
            if weighted_food_data:
                food_name, ingredients = weighted_food_data
                food_category = next((key for key, values in food_categories.items() if food_name in values), "기타")
                cuisine_type = next((key for key, values in cuisine_types.items() if food_name in values), "기타")
                main_ingredient_1 = ingredients[0] if len(ingredients) > 0 else ''
                main_ingredient_2 = ingredients[1] if len(ingredients) > 1 else ''

    data['food_id'].append(i)
    data['food_name'].append(food_name)
    data['weather_condition'].append(weather_condition)
    data['allergy_info'].append(allergy_info)
    data['main_ingredient_1'].append(main_ingredient_1)
    data['main_ingredient_2'].append(main_ingredient_2)
    data['cuisine_type'].append(cuisine_type)
    data['food_category'].append(food_category)
    data['season'].append(season)

df = pd.DataFrame(data)

df_gitad = df[(df['food_category'] == '기타') | (df['food_category'] == '디저트') | (df['cuisine_type'] == '기타')]

# 기타, 디저트로 분류된 음식 출력
print(df_gitad)

# 기타, 디저트로 로 분류되지 않은 음식들 삭제 (즉, 기타, 디저트로 분류된 항목들만 남김)
df_gitad_cleaned = df_gitad.copy()

# 기타로 분류된 음식들만 CSV 파일로 저장
csv_file_path = "data/기타분류_음식.csv"
df_gitad_cleaned.to_csv(csv_file_path, index=False, encoding='utf-8')

# 결과를 확인

print(df.head())

# CSV 파일로 저장
csv_file_path = "data/데이터.csv"

df.to_csv(csv_file_path, index=False, encoding='utf-8')

csv_file_path
