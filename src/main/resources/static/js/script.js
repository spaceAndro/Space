document.addEventListener("DOMContentLoaded", function () {
  const calendarBody = document.querySelector("#calendar tbody");
  const selectedDateInfo = document.getElementById("selectedDate");
  const selectedBreakfast = document.getElementById("selectedBreakfast");
  const selectedLunch = document.getElementById("selectedLunch");
  const selectedDinner = document.getElementById("selectedDinner");

  const sumKcal = document.getElementById("sumKcal");
  const sumCarbohydrate = document.getElementById("sumCarbohydrate");
  const sumProtein = document.getElementById("sumProtein");
  const sumFat = document.getElementById("sumFat");

  const yearDisplay = document.getElementById("yearDisplay");
  const monthDisplay = document.getElementById("monthDisplay");

  const userId = document.querySelector(".calendar-container").dataset.userId;
  let selectedCell = null;
  const currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  let nowMonth = currentDate.getMonth();
  let nowYear = currentDate.getFullYear();

  // 모달 관련 변수
  const updateButton = document.getElementById("updateButton");
  const foodModalContent = document.getElementById("foodModalContent");
  const updateModal = document.getElementById("updateModal");
  const closeUpdateModal = document.getElementById("closeUpdateModal");

  const holidays = {
    '1-1': '새해 첫날',
    '3-1': '삼일절',
    '5-5': '어린이날',
    '6-6': '현충일',
    '8-15': '광복절',
    '10-3': '개천절',
    '10-9': '한글날',
    '12-25': '성탄절'
  };

  function updateDisplay() {
    yearDisplay.textContent = currentYear;
    monthDisplay.textContent = `${currentMonth + 1}월`;
  }

  function highlightSelectedCell(cell) {
    if (selectedCell) {
      selectedCell.classList.remove("selected");
    }
    cell.classList.add("selected");
    selectedCell = cell;
  }

  function updateMealInfo(mealElement, mealName) {
    if (!mealName) {
      mealElement.textContent = "메뉴 없음";
      return;
    }

    mealElement.textContent = `${mealName}`;

    fetch(`/api/meal/food?fName=${mealName}`)
      .then(response => response.json())
      .then(foodData => {
        const kcal = foodData.kcal || 0;
        const carbs = foodData.carbohydrate || 0;
        const protein = foodData.protein || 0;
        const fat = foodData.fat || 0;

        mealElement.textContent += ` (칼로리: ${kcal}kcal, 탄수화물: ${carbs}g, 단백질: ${protein}g, 지방: ${fat}g)`;
      })
      .catch(error => console.error('Fetch error:', error));
  }
  
  function getImageForFood(foodName) {
      const imageMapping = {
  		"bagel.png": ['크림치즈 베이글', '베이글 샌드위치'],
  		"bibimbap.png": ['꼬막비빔밥', '참치 비빔밥', '전주비빔밥'],
  		"bossam.png": ['보쌈'],
  		"bread.png": ['마늘빵', '바나나 브레드'],
  		"chicken.png": ['닭튀김', '라임 치킨', '닭봉구이', '코코넛 치킨', '오렌지 치킨', '닭가슴살 튀김', '고추기름 닭고기', '닭강정', '안동찜닭', '불닭', '버팔로윙', '닭다리 구이', '닭갈비', '후라이드 치킨', '바베큐 치킨', '레몬 치킨'],
  		"chicken2.png": ['찜닭', '백숙'],
  		"corn.png": ['치즈 옥수수'],
  		"pretzels.png": ['프레즐'],
  		"curry.png": ['돈카츠 회오리 오므라이스', '치킨 카레', '카레라이스', '하이라이스', '카레', '타이 그린 카레', '새우 카레라이스'],
  		"fish.png": ['연어 스테이크', '장어정식', '소이 글레이즈드 연어', '연어 타르타르', '한치물회', '갈치조림', '꽁치조림', '장어구이', '조기구이', '꽁치구이', '임연수구이', '가자미구이', '도미구이', '붕장어구이', '전어구이', '그릴드 연어', '고등어조림', '가자미조림', '방어구이', '명태구이', '시메사바', '생선구이', '고등어구이', '갈치구이', '삼치구이', '연어구이'],
  		"friedpotatoes.png": ['치즈스틱', '치즈 감자튀김', '허니 버터 칩', '체다 치즈 칩', '체다 치즈 튀김', '감자튀김', '칠리 치즈 감자튀김', '트러플 감자튀김'],
  		"gamjajorim.png": ['니쿠자가', '베이컨 감자 샐러드', '구운 감자 샐러드'],
  		"hamburger.png": ['비건 버거', '햄버거', '치즈버거', '미니 햄버거'],
  		"kimbap.png": ['날치알 김밥', '새우 김밥', '계란 김밥', '베이컨 김밥', '멸치 김밥', '야채 김밥', '깻잎 김밥', '소고기 김밥', '연어 김밥', '참치 김밥', '고추참치 김밥', '돈가스 김밥', '유부 김밥'],
  		"meat.png": ['소갈비살', '냉채족발', '갈매기살', '초벌 막창', '파삼겹', '항정살', '스테이크 타르타르', '육회', '소곱창', '오삼불고기', '비프 브루기뇽', '푸아그라', '비프 타르타르', '토마호크 스테이크', '사과 소스 포크', '소대창', '삼합', '소막창', '북경오리', '족발', '미트로프', '오향장육', '꽃목살', '동파육', '제육볶음', '닭가슴살 스테이크', '양고기 찹스', '한우구이', '오리 로스트', '양고기 스테이크', '스테이크', '삼겹살', '갈비찜', '소불고기', '불고기'],
  		"sushi.png": ['초밥'],
  		"jeon.png": ['김치전', '해물파전', '채소전', '고구마전', '깻잎전', '감자전', '호박전', '파전', '부추전', '애호박전', '굴전'],
  		"noodles.png": ['튀김우동', '바질소바', '야끼소바', '시금치 피자', '상하이볶음면', '나가사키 짬뽕', '탄탄멘', '불닭볶음면', '잡채', '무채 비빔국수', '회냉면', '짬짜면', '차슈 라멘', '마파면', '김치볶음면', '바지락 칼국수', '초계국수', '물냉면', '물막국수', '교카이라멘', '해물볶음우동', '닭칼국수', '해물라면', '마라짬뽕', '콩국수', '까르보나라 불닭볶음면', '유니짜장', '중화비빔면', '우동', '라멘', '비빔냉면', '아부라소바', '라면', '짬뽕', '짜장면', '카라이라멘', '초계비빔국수', '돈코츠라멘', '고추짬뽕', '소바', '쌀국수', '칼국수', '잔치국수', '쫄면', '비빔국수'],
  		"nuggets.png": ['단호박튀김', '크로켓', '에비텐동', '피쉬 앤 칩스', '고구마튀김', '양파 링', '오징어 튀김', '야채튀김', '고로케', '치킨 너겟'],
  		"barbecue.png": ['산적', '양꼬치', '사천식 양꼬치'],
  		"pizza.png": ['바질페스토 피자', '크림 바질 피자', '토마토 모차렐라 피자', '바베큐 치킨 피자', '감자 피자', '피자', '마르게리타 피자', '페퍼로니 피자', '포테이토베이컨 피자', '디아블로 피자', '샐러드 피자'],
  		"soup.png": ['백합탕', '조개찜', '돼지고기묵은지찜', '낙지전골', '닭볶음탕', '훈툰', '감자그라탕', '미소시루', '마라탕', '김치찌개', '김치국', '숙성지 김치찌개', '김치찌개', '된장찌개', '순두부찌개', '콩나물국', '떡국', '감자탕', '북엇국', '삼계탕', '설렁탕', '시래기국', '오징어국', '해물탕', '육개장', '배추국', '김치국', '곰탕', '떡만두국', '황태해장국', '해물 수제비', '황태국', '부대찌개', '우거지국', '비지찌개', '감자찌개', '갈비탕', '매운탕', '동태찌개', '미역국', '순대국', '홍합탕', '두부전골', '계란국', '무국', '낙지국', '애호박찌개', '참치국', '사골국', '버섯국', '고추장찌개', '수제비', '청국장', '해물순두부찌개', '만두국', '순두부국', '시래기된장국', '우렁강된장', '낙지탕탕이', '어묵탕', '미소 된장국', '차돌박이 된장찌개', '매운 갈비찜 찌개', '황태찌개', '오삼불고기 찌개', '파김치장어전골', '곱창전골', '우렁 된장찌개', '숙성지 김치찌개', '해물된장찌개'],
  		"soup2.png": ['소시지 그라탱', '치킨 팟파이', '전복죽', '팥죽', '비트 수프', '랍스터 크림 스프', '토마토 바질 스프', '랍스터 비스크', '호박죽', '시금치 수프', '감자크림수프', '브로콜리 체다 수프', '비스크 수프', '크림수프', '블랙빈 수프', '양송이 수프', '토마토 수프', '호박 수프', '아스파라거스 수프', '프렌치 어니언 수프', '클램 차우더'],
  		"pasta.png": ['치킨 알프레도', '베지터블 라자냐', '라자냐', '애호박 라자냐', '바질페스토 라비올리', '매콤로제파스타', '크림 시금치 파스타', '투움바 파스타', '블랙 올리브 파스타', '토마토 갈릭 파스타', '명란 크림파스타', '새우 스캄피 파스타', '갈릭 새우 파스타', '바질 파스타', '푸실리 파스타', '치킨 크림파스타', '살몬 크림 파스타', '까르보나라 파스타', '바질페스토 파스타', '양송이 크림파스타', '파스타', '연어 파스타', '미트볼 파스타', '크림치즈 파스타', '알리오 올리오', '토마토 파스타', '트러플 파스타'],
  		"onigiri.png": ['아란치니', '주먹밥', '날치알 주먹밥', '오니기리', '유부 초밥'],
  		"ribs.png": ['떡갈비', '소갈비찜', '매운돼지갈비', '매운갈비찜', '갈비구이', '양갈비', '갈비찜', '돼지갈비', '돼지갈비 스튜', '소갈비', '바베큐 폭립'],
  		"rice.png": ['밥', '보리밥', '짜장밥'],
  		"ricebowl.png": ['로코모코', '가이센동', '우나기', '가라아게가츠동', '새우가츠동', '가츠동', '부타동', '치킨 필라프', '감바스 리조또', '트러플 리소토', '토마토 리소토', '오야코동', '오차즈케', '카마메시', '회덮밥', '새우볶음밥', '철판 볶음밥', '닭갈비 덮밥', '파인애플 볶음밥', '마파두부밥', '버섯 볶음밥', '깐쇼새우덮밥', '규카츠 덮밥', '장어덮밥', '참치볶음밥', '참치마요덮밥', '소고기덮밥', '불고기덮밥', '굴밥', '규동', '돈부리', '필라프', '덮밥', '삼선짬뽕밥', '소고기 덮밥', '김치볶음밥', '불고기 덮밥', '제육덮밥', '잡채밥'],
  		"risotto.png": ['리조또', '버섯 리소토', '새우 크림 리조또', '트러플 리조또'],
  		"salad.png": ['꿔바로우 샐러드', '닭가슴살 샐러드', '참치 니스와 샐러드', '렌틸콩 샐러드', '오이 샐러드', '비트 샐러드', '수박 샐러드', '파파야 샐러드', '감자 샐러드', '로메인 샐러드', '오리엔탈 드레싱 샐러드', '트로피컬 샐러드', '살몬 아보카도 샐러드', '브로콜리 샐러드', '훈제 연어 샐러드', '사우전 아일랜드 샐러드', '버팔로 치킨 샐러드', '레몬 허니 샐러드', '메밀국수 샐러드', '시저 파스타 샐러드', '샐러드', '시저 샐러드', '포테이토 샐러드', '연어 샐러드'],
  		"sashimi.png": ['광어 사시미', '연어 사시미', '참치 사시미'],
  		"soondae.png": ['오징어순대', '이카메시', '순대', '순대국밥'],
  		"jalapenopoppers.png": ['할라피뇨 팝퍼'],
  		"gejang.png": ['게장'],
  		"scrambledegg.png": ['토마토 달걀 볶음'],
  		"shrimp.png": ['타이 새우 볶음', '감바스 알 아히요', '깐쇼새우', '로제쉬림프', '크림통새우', '스윗 칠리 새우', '새우구이', '새우완자', '레몬 버터 새우'],
  		"friedshrimp.png": ['덴푸라', '새우튀김'],
  		"takoyaki.png": ['타코야키', '오코노미야키'],
  		"brunch.png": ['브런치 세트'],
  		"fishcake.png": ['어묵볶음'],
  		"steamedfish.png": ['아귀찜', '홍합찜', '해물찜'],
  		"sweetsourpork.png": ['유산슬', '유린기', '깐풍기', '마라양념탕수육', '꿔바로우', '탕수육'],
  		"tteokbokki.png": ['라볶이', '떡볶이'],
  		"eggrolls": ['타마고야키', '계란말이', '치즈계란말이'],
  		"gyeranjjim": ['계란찜'],
  		"tofu.png": ['마파두부', '건두부볶음', '두부조림'],
  		"dumplings.png": ['튀김만두', '군만두'],
  		"tonkatsu.png": ['모듬카츠', '로스카츠', '히레카츠', '치즈카츠', '고구마치즈카츠', '가라아게', '규카츠', '치킨 파마산', '샤케동', '카츠돈'],
  		"macaroni.png": ['트러플 마카로니', '맥 앤 치즈'],
  		"burrito.png": ['랍스터 롤', '시저 치킨랩', '살사 치킨 타코', '불고기 타코', '쉬림프 타코', '치즈 퀘사디아', '햄 치즈 파니니', '치킨 시저랩', '퀘사디아', '부리또', '타코'],
  		"steamedbun.png": ['월남쌈', '찐빵', '소룡포'],
  		"roll.png": ['포크 롤', '시나몬 롤', '샐러드롤'],
  		"stirfry.png": ['돼지고기볶음', '곱창볶음', '낙지볶음', '오징어볶음', '라조기', '사천식 돼지고기 볶음', '라따뚜이', '마라샹궈', '쭈꾸미볶음'],
  		"cauldron.png": ['가마솥밥'],
  		"bruschetta.png": ['토마토 치즈 타르트', '토마토 브루스케타', '브루스케타', '참치 카나페'],
  		"toast.png": ['크로크무슈', '새우 토스트', '아보카도 토스트', '프렌치 토스트', '갈릭 토스트', '햄 치즈 토스트', '피자 토스트'],
  		"eggsbenedict.png": ['에그 베네딕트', '베이컨 에그 베네딕트'],
  		"sandwich.png": ['가츠샌드', '멘보샤', '크로와상 샌드위치', '클럽 샌드위치', '참치 샌드위치', '와플 샌드위치', '페스토 샌드위치', '샌드위치', '버팔로 치킨 샌드위치', '바질 페스토 샌드위치', '그릴드 치즈 샌드위치', '연어 샌드위치']
      };

      for (const [image, foods] of Object.entries(imageMapping)) {
        if (foods.includes(foodName)) {
          return image;
        }
      }
      return null;
    }

  function generateCalendar(year, month) {
    calendarBody.innerHTML = "";
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    let date = 1;
    let totalKcal = 0;
    let totalCarbohydrate = 0;
    let totalProtein = 0;
    let totalFat = 0;

    fetch(`/api/calendars/month?userId=${userId}&year=${year}&month=${month + 1}`)
      .then(response => response.json())
      .then(calendarData => {
        const fetchPromises = calendarData.map(calendar => {
          const mealPromises = [];
			console.log(calendar.saveDate);
          calendar.highestCalorieMeal = null;
		  let totalKcalForDate = 0; // 특정 날짜의 총 칼로리

          ["breakfast", "lunch", "dinner"].forEach(mealType => {
            if (calendar[mealType]) {
              mealPromises.push(
                fetch(`/api/meal/food?fName=${calendar[mealType]}`)
                  .then(response => response.json())
                  .then(foodData => {
                    const kcal = foodData.kcal || 0;
                    totalKcal += kcal;
                    totalCarbohydrate += foodData.carbohydrate || 0;
                    totalProtein += foodData.protein || 0;
                    totalFat += foodData.fat || 0;
					totalKcalForDate += kcal; // 총합에 누적

                    if (!calendar.highestCalorieMeal || kcal > calendar.highestCalorieMeal.kcal) {
                      calendar.highestCalorieMeal = { name: calendar[mealType], kcal: kcal };
                    }
                  })
                  .catch(error => console.error(`Fetch error for ${mealType}:`, error))
              );
            }
          });

          return Promise.all(mealPromises).then(() => 		  {
              calendar.totalKcalForDate = totalKcalForDate; // 해당 날짜의 총 칼로리 설정
              return calendar;
          });
        });

        Promise.all(fetchPromises)
          .then(updatedCalendarData => {
            sumKcal.textContent = `${month + 1}월 총 칼로리 : ${totalKcal} kcal`;
            sumCarbohydrate.textContent = `탄수화물 : ${totalCarbohydrate} g`;
            sumProtein.textContent = `단백질 : ${totalProtein} g`;
            sumFat.textContent = `지방 : ${totalFat} g`;

            for (let i = 0; i < 6; i++) {
              let row = document.createElement("tr");
              for (let j = 0; j < 7; j++) {
                let cell = document.createElement("td");

                if (i === 0 && j < firstDay) {
                  cell.textContent = "";
                } else if (date > lastDate) {
                  break;
                } else {
                  const calendar = updatedCalendarData.find(calendar => calendar.saveDate === `${year}-${(month + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`);
				  console.log(calendar);
                  if (j === 0) cell.classList.add("sunday");
                  else if (j === 6) cell.classList.add("saturday");

                  const holidayKey = `${month + 1}-${date}`;
                  if (holidays[holidayKey]) {
                    cell.classList.add("holiday");
                    cell.setAttribute("title", holidays[holidayKey]);
                  }

                  cell.innerHTML = `<div class="date" data-date="${year}-${(month + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}">${date}</div>`;
				  // 음식 이미지 추가
				                  if (calendar && calendar.highestCalorieMeal) {
				                    const mealImage = document.createElement("img");
				                    mealImage.src = `/images/foodicon/${getImageForFood(calendar.highestCalorieMeal.name)}`;
				                    mealImage.alt = calendar.highestCalorieMeal.name;
				                    mealImage.classList.add("meal-image");
				                    cell.appendChild(mealImage);
				                  }

				                  // 총 열량 정보를 이미지 아래에 추가
				                  if (calendar) {
				                    const kcalInfo = document.createElement("div");
				                    kcalInfo.textContent = `총 열량: ${calendar.totalKcalForDate} kcal`;
				                    kcalInfo.classList.add("total-kcal-info");
				                    cell.appendChild(kcalInfo);
				                  }

                  cell.addEventListener("click", function() {
                    highlightSelectedCell(cell);
                    let clickedCell = cell.querySelector(".date").textContent;
                    // 직접 선택한 날짜를 update
                    selectedDateInfo.textContent = `${year}년 ${month + 1}월 ${clickedCell}일`;
                    
                    let saveDate = `${year}-${month + 1}-${clickedCell}`;
                    
                    // 날짜 형식을 'YYYY-MM-DD'로 변경
					if (saveDate) {
						const dateParts = saveDate.split("-");
						if (dateParts.length === 3) {
							// 월(month)과 일(day)을 두 자리로 맞춤
							dateParts[1] = dateParts[1].padStart(2, "0"); // 월이 한 자리면 두 자리로 변경
							dateParts[2] = dateParts[2].padStart(2, "0"); // 일이 한 자리면 두 자리로 변경
							saveDate = dateParts.join("-");
						}
					}
                    
                    localStorage.setItem("date", saveDate);
                    console.log(saveDate);

                    updateMealInfo(selectedBreakfast, calendar ? calendar.breakfast : '아침 메뉴 없음');
                    updateMealInfo(selectedLunch, calendar ? calendar.lunch : '점심 메뉴 없음');
                    updateMealInfo(selectedDinner, calendar ? calendar.dinner : '저녁 메뉴 없음');
                  });

                  if (date === currentDate.getDate() && year === nowYear && month === nowMonth) {
                    highlightSelectedCell(cell);
                    selectedDateInfo.textContent = `${year}년 ${month + 1}월 ${date}일`;

                    updateMealInfo(selectedBreakfast, calendar ? calendar.breakfast : '아침 메뉴 없음');
                    updateMealInfo(selectedLunch, calendar ? calendar.lunch : '점심 메뉴 없음');
                    updateMealInfo(selectedDinner, calendar ? calendar.dinner : '저녁 메뉴 없음');
                  }

                  date++;
                }
                row.appendChild(cell);
              }
              calendarBody.appendChild(row);
            }
          })
          .catch(error => console.error('Fetch error:', error));
      })
      .catch(error => console.error('Fetch error:', error));

    updateDisplay();
  }

  document.getElementById("prevMonth").addEventListener("click", function () {
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear--;
    } else {
      currentMonth--;
    }
	  selectedCell.classList.remove("selected");
    generateCalendar(currentYear, currentMonth);
  });

  document.getElementById("nextMonth").addEventListener("click", function () {
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear++;
    } else {
      currentMonth++;
    }
	  selectedCell.classList.remove("selected");
    generateCalendar(currentYear, currentMonth);
  });

  // 년도 이동 버튼 이벤트
  document.getElementById("prevYear").addEventListener("click", function () {
    currentYear--;
    selectedCell.classList.remove("selected");
    generateCalendar(currentYear, currentMonth);
  });

  document.getElementById("nextYear").addEventListener("click", function () {
    currentYear++;
    selectedCell.classList.remove("selected");
    generateCalendar(currentYear, currentMonth);
  });
  
  document.getElementById("deleteButton").addEventListener("click", function (event) {
	event.preventDefault();  // 기본 폼 제출 동작 방지
	
	let savedDate = localStorage.getItem("date"); // localStorage에서 삭제할 날짜 가져오기
	
	// 날짜 형식을 'YYYY-MM-DD'로 변경
	if (savedDate) {
		const dateParts = savedDate.split("-");
		if (dateParts.length === 3) {
			// 월(month)과 일(day)을 두 자리로 맞춤
			dateParts[1] = dateParts[1].padStart(2, "0"); // 월이 한 자리면 두 자리로 변경
			dateParts[2] = dateParts[2].padStart(2, "0"); // 일이 한 자리면 두 자리로 변경
			savedDate = dateParts.join("-");
		}
	}
	
	document.getElementById("deleteDate").value = savedDate;
	console.log("삭제할 날짜:", savedDate); // 디버깅용 로그
	// 최종적으로 폼을 제출
	const form = document.getElementById("deleteForm");
    if (form) {
        console.log("폼을 찾았습니다. 제출을 시도합니다.");
        form.submit();
    } else {
        console.error("폼을 찾을 수 없습니다.");
    }
  });
  
  updateButton.addEventListener("click", function (event) {
	event.preventDefault();  // 기본 폼 제출 동작 방지
	
	const xhr = new XMLHttpRequest();
    xhr.open("GET", "/foodUpdate", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            foodModalContent.innerHTML = xhr.responseText;
            updateModal.style.display = "flex";
            document.body.style.overflow = "hidden";
            
            // 모달이 열린 후 update.js의 로직을 호출
            initializeUpdateModal();
        } else if (xhr.readyState === 4) {
            console.error("AJAX 요청 실패: " + xhr.status);
        }
    };
    xhr.send();
  });
  
  // 모달 닫기
  closeUpdateModal.addEventListener("click", function () {
      updateModal.style.display = "none";
      document.body.style.overflow = "auto"; // 모달 닫을 때 스크롤 복구
  });

  // 모달 외부 클릭 시 닫기
  window.addEventListener("click", function (event) {
      if (event.target === updateModal) {
          updateModal.style.display = "none";
          document.body.style.overflow = "auto";
      }
  });
  
  function initializeUpdateModal() {
    const userId = document.querySelector(".calendar-container").dataset.userId;
    const savedDate = localStorage.getItem("date");
    const breakfastInput = document.getElementById("breakfastInput");
    const lunchInput = document.getElementById("lunchInput");
    const dinnerInput = document.getElementById("dinnerInput");
    const savedDateInput = document.getElementById("savedDateInput");

    savedDateInput.value = savedDate;

    fetch(`/api/calendars/date?userId=${userId}&date=${savedDate}`)
        .then(response => response.json())
        .then(calendarData => {
            breakfastInput.value = calendarData.breakfast || "";
            lunchInput.value = calendarData.lunch || "";
            dinnerInput.value = calendarData.dinner || "";
        })
        .catch(error => console.log("에러 발생: ", error));
  }
  
  generateCalendar(currentYear, currentMonth);
});
