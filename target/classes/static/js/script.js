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

                  if (calendar && calendar.totalKcalForDate) {
					const calorieInfo = document.createElement("div");
                    calorieInfo.classList.add("calorie-info");
                    calorieInfo.textContent = `총 칼로리: ${calendar.totalKcalForDate} kcal`;
                    cell.appendChild(calorieInfo);
                  }

                  cell.addEventListener("click", function() {
                    highlightSelectedCell(cell);
                    let clickedCell = cell.querySelector(".date").textContent;
                    // 직접 선택한 날짜를 update
                    selectedDateInfo.textContent = `${year}년 ${month + 1}월 ${clickedCell}일`;
                    
                    let saveDate = `${year}-${month + 1}-${clickedCell}`;
<<<<<<< HEAD
=======
                    
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
                    
>>>>>>> kjm
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
