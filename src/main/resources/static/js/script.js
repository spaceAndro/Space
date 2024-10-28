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
  
  const userId = document.querySelector(".calendar-container").dataset.userId; // userId 가져오기
  console.log("User ID:", userId); // 확인용 로그

  let selectedCell = null; // 선택된 셀을 추적하기 위한 변수
  const currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  function updateDisplay() {
    yearDisplay.textContent = currentYear;
    monthDisplay.textContent = `${currentMonth + 1}월`;
  }

  function highlightSelectedCell(cell) {
    if (selectedCell) {
      selectedCell.classList.remove("selected"); // 이전 선택을 제거
    }
    cell.classList.add("selected"); // 현재 선택에 하이라이트 추가
    selectedCell = cell; // 선택된 셀 업데이트
  }

  function generateCalendar(year, month) {
    calendarBody.innerHTML = ""; // 기존 캘린더 내용을 초기화
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    
    let date = 1;
	
	let kcal = 0;
	let carbohydrate = 0;
	let protein = 0;
	let fat = 0;

    fetch(`/api/calendars/month?userId=${userId}&year=${year}&month=${month + 1}`)
      .then(response => response.json())
      .then(calendarData => {
		console.log("캘린더 데이터:", calendarData);
		calendarData.forEach(item => {
		    console.log(`Data item: ${item.saveDate}`);
		});
		
		const fetchPromises = calendarData.flatMap(calendar => {
            const mealPromises = [];

            if (calendar.breakfast) {
                mealPromises.push(
                    fetch(`/api/meal/food?fName=${calendar.breakfast}`)
                        .then(response => response.json())
                        .then(foodData => {
                            kcal += foodData.kcal || 0;
                            carbohydrate += foodData.carbohydrate || 0;
                            protein += foodData.protein || 0;
                            fat += foodData.fat || 0;
                        })
                        .catch(error => console.error('Fetch error for breakfast:', error))
                );
            }

            if (calendar.lunch) {
                mealPromises.push(
                    fetch(`/api/meal/food?fName=${calendar.lunch}`)
                        .then(response => response.json())
                        .then(foodData => {
                            kcal += foodData.kcal || 0;
                            carbohydrate += foodData.carbohydrate || 0;
                            protein += foodData.protein || 0;
                            fat += foodData.fat || 0;
                        })
                        .catch(error => console.error('Fetch error for lunch:', error))
                );
            }

            if (calendar.dinner) {
                mealPromises.push(
                    fetch(`/api/meal/food?fName=${calendar.dinner}`)
                        .then(response => response.json())
                        .then(foodData => {
                            kcal += foodData.kcal || 0;
                            carbohydrate += foodData.carbohydrate || 0;
                            protein += foodData.protein || 0;
                            fat += foodData.fat || 0;
                        })
                        .catch(error => console.error('Fetch error for dinner:', error))
                );
            }

            return mealPromises;
        });

        Promise.all(fetchPromises)
            .then(() => {
                // 모든 fetch 요청이 완료된 후에 총합을 업데이트
                sumKcal.textContent = `${month + 1}월 총 칼로리 : ${kcal}`;
                sumCarbohydrate.textContent = `탄수화물 : ${carbohydrate}`;
                sumProtein.textContent = `단백질 : ${protein}`;
                sumFat.textContent = `지방 : ${fat} (100g 기준)`;
            })
            .catch(error => console.error('Fetch error:', error));

        // 캘린더 화면을 렌더링하는 부분
		
        for (let i = 0; i < 6; i++) {
		  let row = document.createElement("tr");
          for (let j = 0; j < 7; j++) {
            let cell = document.createElement("td");

            if (i === 0 && j < firstDay) {
              cell.textContent = "";
            } else if (date > lastDate) {
              break;
            } else {
              const calendar = calendarData.find(calendar => calendar.saveDate === `${year}-${(month + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`);
			  console.log("찾은 데이터:", calendar);
			  
			  /*
			  if (calendar && calendar.breakfast) {  // calendar와 breakfast가 존재하는지 확인
				fetch(`/api/meal/food?fName=${calendar.breakfast}`)
				  .then(response => response.json())
				  .then(foodData => {
				    console.log("음식 데이터 : ", foodData);
				    kcal += foodData.kcal || 0;
				    carbohydrate += foodData.carbohydrate || 0;
				    protein += foodData.protein || 0;
				    fat += foodData.fat || 0;
				  })
				  .catch(error => console.error('Fetch error:', error));
				} else {
				  console.warn("breakfast 데이터가 없어서 fetch를 생략합니다.");
				}
				/*
			  fetch(`/api/meal/food?fName=${calendar.lunch}`)
			  	.then(response => response.json())
				.then(foodData => {
					console.log("음식 데이터 : ", foodData);
					kcal += foodData.kcal;
					carbohydrate += foodData.carbohydrate;
					protein += foodData.protein;
					fat += foodData.fat;
				})
				.catch(error => console.error('Fetch error:', error));
			  fetch(`/api/meal/food?fName=${calendar.dinner}`)
			  	.then(response => response.json())
				.then(foodData => {
					console.log("음식 데이터 : ", foodData);
					kcal += foodData.kcal;
					carbohydrate += foodData.carbohydrate;
					protein += foodData.protein;
					fat += foodData.fat;
				})
				.catch(error => console.error('Fetch error:', error));
				*/
				
			  sumKcal.textContent = `${month + 1}월 총 칼로리 : ${kcal}`;
			  sumCarbohydrate.textContent = `탄수화물 : ${carbohydrate}`;
			  sumProtein.textContent = `단백질 : ${protein}`;
			  sumFat.textContent = `지방 : ${fat}    (100g 기준)`;
			  
              cell.innerHTML = `
                <div class="date">${date}</div>
                <div class="calendar breakfast">${calendar ? calendar.breakfast : '아침 메뉴 없음'}</div>
                <div class="calendar lunch">${calendar ? calendar.lunch : '점심 메뉴 없음'}</div>
                <div class="calendar dinner">${calendar ? calendar.dinner : '저녁 메뉴 없음'}</div>
              `;

              // 클릭된 셀을 선택하고 하이라이트 적용
              cell.addEventListener("click", function() {
                selectedDateInfo.textContent = `${year}년 ${month + 1}월 ${date}일`;
                selectedBreakfast.textContent = `아침: ${calendar ? calendar.breakfast : '아침 메뉴 없음'}`;
                selectedLunch.textContent = `점심: ${calendar ? calendar.lunch : '점심 메뉴 없음'}`;
                selectedDinner.textContent = `저녁: ${calendar ? calendar.dinner : '저녁 메뉴 없음'}`;

                // 선택된 셀에 하이라이트 추가
                highlightSelectedCell(cell);
              });

              // 오늘 날짜에 하이라이트를 적용하고 선택 상태로 설정
              if (date === currentDate.getDate() && year === currentDate.getFullYear() && month === currentDate.getMonth()) {
                selectedDateInfo.textContent = `${year}년 ${month + 1}월 ${date}일`;
                selectedBreakfast.textContent = `아침: ${calendar ? calendar.breakfast : '아침 메뉴 없음'}`;
                selectedLunch.textContent = `점심: ${calendar ? calendar.lunch : '점심 메뉴 없음'}`;
                selectedDinner.textContent = `저녁: ${calendar ? calendar.dinner : '저녁 메뉴 없음'}`;

                highlightSelectedCell(cell); // 오늘 날짜 하이라이트
              }

              date++;
            }
            row.appendChild(cell);
          }
          calendarBody.appendChild(row);
        }
      })
      .catch(error => console.error('Fetch error:', error));

    updateDisplay(); // 달력 상단에 연도 및 월 표시 업데이트
  }

  // 월 이동 버튼 이벤트
  document.getElementById("prevMonth").addEventListener("click", function () {
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear--;
    } else {
      currentMonth--;
    }
    generateCalendar(currentYear, currentMonth);
  });

  document.getElementById("nextMonth").addEventListener("click", function () {
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear++;
    } else {
      currentMonth++;
    }
    generateCalendar(currentYear, currentMonth);
  });

  // 초기 캘린더 생성
  generateCalendar(currentYear, currentMonth);
});