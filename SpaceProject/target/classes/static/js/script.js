document.addEventListener("DOMContentLoaded", function () {
  const calendarBody = document.querySelector("#calendar tbody");
  const selectedDateInfo = document.getElementById("selectedDate");
  const selectedBreakfast = document.getElementById("selectedBreakfast");
  const selectedLunch = document.getElementById("selectedLunch");
  const selectedDinner = document.getElementById("selectedDinner");

  const yearDisplay = document.getElementById("yearDisplay");
  const monthDisplay = document.getElementById("monthDisplay");

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

    fetch(`/api/meals/month?year=${year}&month=${month + 1}`)
      .then(response => response.json())
      .then(mealData => {
        for (let i = 0; i < 6; i++) {
          let row = document.createElement("tr");

          for (let j = 0; j < 7; j++) {
            let cell = document.createElement("td");

            if (i === 0 && j < firstDay) {
              cell.textContent = "";
            } else if (date > lastDate) {
              break;
            } else {
              const meal = mealData.find(meal => meal.mealDate === `${year}-${(month + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`);

              cell.innerHTML = `
                <div class="date">${date}</div>
                <div class="meal breakfast">${meal ? meal.breakfast : '아침 메뉴 없음'}</div>
                <div class="meal lunch">${meal ? meal.lunch : '점심 메뉴 없음'}</div>
                <div class="meal dinner">${meal ? meal.dinner : '저녁 메뉴 없음'}</div>
              `;

              // 클릭된 셀을 선택하고 하이라이트 적용
              cell.addEventListener("click", function() {
                selectedDateInfo.textContent = `${year}년 ${month + 1}월 ${date}일`;
                selectedBreakfast.textContent = `아침: ${meal ? meal.breakfast : '아침 메뉴 없음'}`;
                selectedLunch.textContent = `점심: ${meal ? meal.lunch : '점심 메뉴 없음'}`;
                selectedDinner.textContent = `저녁: ${meal ? meal.dinner : '저녁 메뉴 없음'}`;

                // 선택된 셀에 하이라이트 추가
                highlightSelectedCell(cell);
              });

              // 오늘 날짜에 하이라이트를 적용하고 선택 상태로 설정
              if (date === currentDate.getDate() && year === currentDate.getFullYear() && month === currentDate.getMonth()) {
                selectedDateInfo.textContent = `${year}년 ${month + 1}월 ${date}일`;
                selectedBreakfast.textContent = `아침: ${meal ? meal.breakfast : '아침 메뉴 없음'}`;
                selectedLunch.textContent = `점심: ${meal ? meal.lunch : '점심 메뉴 없음'}`;
                selectedDinner.textContent = `저녁: ${meal ? meal.dinner : '저녁 메뉴 없음'}`;

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
