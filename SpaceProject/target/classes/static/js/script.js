document.addEventListener("DOMContentLoaded", function () {
  const calendarBody = document.querySelector("#calendar tbody");
  const selectedDateInfo = document.getElementById("selectedDate");
  const selectedBreakfast = document.getElementById("selectedBreakfast");
  const selectedLunch = document.getElementById("selectedLunch");
  const selectedDinner = document.getElementById("selectedDinner");
  
  const currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  function generateCalendar(year, month) {
    calendarBody.innerHTML = "";
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    
    let date = 1;

    for (let i = 0; i < 6; i++) {
      let row = document.createElement("tr");

      for (let j = 0; j < 7; j++) {
        let cell = document.createElement("td");
        if (i === 0 && j < firstDay) {
          cell.textContent = "";
        } else if (date > lastDate) {
          break;
        } else {
          // 오늘 날짜 강조 (주황색)
          if (date === currentDate.getDate() && year === currentDate.getFullYear() && month === currentDate.getMonth()) {
            cell.classList.add("highlight");
          }

          // 날짜 및 각 메뉴에 맞는 클래스 추가
          cell.innerHTML = `
            <div class="date">${date}</div>
            <div class="meal breakfast">아침 메뉴</div>
            <div class="meal lunch">점심 메뉴</div>
            <div class="meal dinner">저녁 메뉴</div>
          `;
          
          // 날짜 클릭 시 상단에 날짜와 메뉴 정보 표시
          const clickedDate = date; // 이 변수를 별도로 저장
          cell.addEventListener("click", function() {
            selectedDateInfo.textContent = `${year}년 ${month + 1}월 ${clickedDate}일`; // 선택된 날짜 표시
            selectedBreakfast.textContent = "아침: 아침 메뉴";
            selectedLunch.textContent = "점심: 점심 메뉴";
            selectedDinner.textContent = "저녁: 저녁 메뉴";
          });

          date++; // date를 나중에 증가시킴
        }
        row.appendChild(cell);
      }
      calendarBody.appendChild(row);
    }
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

  // 년도 이동 버튼 이벤트
  document.getElementById("prevYear").addEventListener("click", function () {
    currentYear--;
    generateCalendar(currentYear, currentMonth);
  });

  document.getElementById("nextYear").addEventListener("click", function () {
    currentYear++;
    generateCalendar(currentYear, currentMonth);
  });

  // 초기 캘린더 생성
  generateCalendar(currentYear, currentMonth);
});
