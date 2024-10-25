document.addEventListener("DOMContentLoaded", function () {
  const calendarBody = document.querySelector("#calendar tbody");
  const selectedDateInfo = document.getElementById("selectedDate");
  const selectedBreakfast = document.getElementById("selectedBreakfast");
  const selectedLunch = document.getElementById("selectedLunch");
  const selectedDinner = document.getElementById("selectedDinner");
  const yearDisplay = document.getElementById("yearDisplay");
  const monthDisplay = document.getElementById("monthDisplay");

  const today = new Date(); // 오늘 날짜를 기준으로 저장
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();
  let todayDate = today.getDate();

  // 공휴일 목록 (연, 월, 일 형식)
  const holidays = {
    "01-01": "신정",          // 1월 1일 - 신정
    "03-01": "삼일절",        // 3월 1일 - 삼일절
    "05-05": "어린이날",      // 5월 5일 - 어린이날
    "06-06": "현충일",        // 6월 6일 - 현충일
    "08-15": "광복절",        // 8월 15일 - 광복절
    "10-01": "국군의 날",     // 10월 1일 - 국군의 날
    "10-03": "개천절",        // 10월 3일 - 개천절
    "10-09": "한글날",        // 10월 9일 - 한글날
    "12-25": "성탄절",        // 12월 25일 - 성탄절
  };

  // 음력 공휴일을 처리하는 함수 (설날, 추석, 부처님 오신 날)
  const lunarHolidays = {
    설날: ["2024-02-10", "2025-01-29"], // 설날 (양력 변환 값)
    추석: ["2024-09-17", "2025-10-06"], // 추석 (양력 변환 값)
    부처님오신날: ["2024-05-15", "2025-05-04"] // 부처님 오신 날 (양력 변환 값)
  };

  // 월과 년도 표시를 업데이트하는 함수
  function updateYearMonthDisplay() {
    const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    yearDisplay.textContent = `${currentYear}년`;
    monthDisplay.textContent = `${monthNames[currentMonth]}`;
  }

  // 오늘 날짜 정보 자동 표시
  function displayTodayInfo() {
    selectedDateInfo.textContent = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${todayDate}일`;
    selectedBreakfast.textContent = "아침: 오늘의 아침 메뉴";
    selectedLunch.textContent = "점심: 오늘의 점심 메뉴";
    selectedDinner.textContent = "저녁: 오늘의 저녁 메뉴";
  }

  function isLunarHoliday(year, month, day) {
    const dateString = `${year}-${("0" + (month + 1)).slice(-2)}-${("0" + day).slice(-2)}`;
    for (let holiday in lunarHolidays) {
      if (lunarHolidays[holiday].includes(dateString)) {
        return holiday;
      }
    }
    return null;
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

        // 일요일인 경우 셀에 sunday 클래스를 추가
        if (j === 0) {
          cell.classList.add("sunday");
        }

        // 토요일인 경우 셀에 saturday 클래스를 추가
        if (j === 6) {
          cell.classList.add("saturday");
        }

        if (i === 0 && j < firstDay) {
          cell.textContent = "";
        } else if (date > lastDate) {
          break;
        } else {
          let formattedDate = `${("0" + (month + 1)).slice(-2)}-${("0" + date).slice(-2)}`; // MM-DD 형식으로 포맷
          
          // 양력 공휴일인 경우 날짜를 빨간색으로 강조
          if (holidays[formattedDate]) {
            cell.classList.add("holiday");
            cell.title = holidays[formattedDate]; // 공휴일 이름을 툴팁으로 표시
          }

          // 음력 공휴일인 경우 날짜를 빨간색으로 강조
          let lunarHoliday = isLunarHoliday(year, month, date);
          if (lunarHoliday) {
            cell.classList.add("holiday");
            cell.title = lunarHoliday; // 음력 공휴일 이름을 툴팁으로 표시
          }

          cell.innerHTML = `
            <div class="date">${date}</div>
            <img src="${images[date % images.length]}" alt="Meal">
          `;

          // 오늘 날짜 셀 강조 (남색) - 오늘 날짜가 속한 현재 년도와 월에서만 강조
          if (date === todayDate && year === today.getFullYear() && month === today.getMonth()) {
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
