document.addEventListener("DOMContentLoaded", function () {
  const calendarBody = document.querySelector("#calendar tbody");
  const selectedDateInfo = document.getElementById("selectedDate");
  const selectedBreakfast = document.getElementById("selectedBreakfast");
  const selectedLunch = document.getElementById("selectedLunch");
  const selectedDinner = document.getElementById("selectedDinner");
  const yearDisplay = document.getElementById("yearDisplay");
  const monthDisplay = document.getElementById("monthDisplay");

  const currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  let todayDate = currentDate.getDate();

  // 월과 년도 표시를 업데이트하는 함수
  function updateYearMonthDisplay() {
    const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    yearDisplay.textContent = `${currentYear}년`;
    monthDisplay.textContent = `${monthNames[currentMonth]}`;
  }

  // 오늘 날짜 정보 자동 표시
  function displayTodayInfo() {
    selectedDateInfo.textContent = `${currentYear}년 ${currentMonth + 1}월 ${todayDate}일`;
    selectedBreakfast.textContent = "아침: 오늘의 아침 메뉴";
    selectedLunch.textContent = "점심: 오늘의 점심 메뉴";
    selectedDinner.textContent = "저녁: 오늘의 저녁 메뉴";
  }

  function generateCalendar(year, month) {
    calendarBody.innerHTML = "";
    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7; // 일요일을 시작으로 조정
    const lastDate = new Date(year, month + 1, 0).getDate();
    
    let date = 1;
    let images = [
      "image1.png", "image2.png", "image3.png", "image4.png", // 이미지 경로 추가
      "image5.png", "image6.png", "image7.png"
    ];

    for (let i = 0; i < 6; i++) {
      let row = document.createElement("tr");

      for (let j = 0; j < 7; j++) {
        let cell = document.createElement("td");
        if (i === 0 && j < firstDay) {
          cell.textContent = "";
        } else if (date > lastDate) {
          break;
        } else {
          cell.innerHTML = `
            <div class="date">${date}</div>
            <img src="${images[date % images.length]}" alt="Meal">
          `;

          // 오늘 날짜 셀 강조 (주황색)
          if (date === todayDate && year === currentYear && month === currentMonth) {
            cell.classList.add("today");
          }

          // 날짜 클릭 시 상단에 메뉴 정보 표시
          const clickedDate = date;
          cell.addEventListener("click", function() {
            selectedDateInfo.textContent = `${year}년 ${month + 1}월 ${clickedDate}일`;
            selectedBreakfast.textContent = "아침: 아침 메뉴";
            selectedLunch.textContent = "점심: 점심 메뉴";
            selectedDinner.textContent = "저녁: 저녁 메뉴";
          });

          date++;
        }
        row.appendChild(cell);
      }
      calendarBody.appendChild(row);
    }
  }

  // 년도 이동 버튼
  document.getElementById("prevYear").addEventListener("click", function () {
    currentYear--;
    generateCalendar(currentYear, currentMonth);
    updateYearMonthDisplay();
  });

  document.getElementById("nextYear").addEventListener("click", function () {
    currentYear++;
    generateCalendar(currentYear, currentMonth);
    updateYearMonthDisplay();
  });

  // 월 이동 버튼
  document.getElementById("prevMonth").addEventListener("click", function () {
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear--;
    } else {
      currentMonth--;
    }
    generateCalendar(currentYear, currentMonth);
    updateYearMonthDisplay();
  });

  document.getElementById("nextMonth").addEventListener("click", function () {
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear++;
    } else {
      currentMonth++;
    }
    generateCalendar(currentYear, currentMonth);
    updateYearMonthDisplay();
  });

  // 초기 메인 캘린더 생성
  generateCalendar(currentYear, currentMonth);
  updateYearMonthDisplay();
  displayTodayInfo(); // 접속 시 오늘 날짜 정보 표시
});
