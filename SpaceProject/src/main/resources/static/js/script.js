document.addEventListener("DOMContentLoaded", function () {
  const calendarBody = document.querySelector("#calendar tbody");
  const selectedDateInfo = document.getElementById("selectedDate");
  const selectedBreakfast = document.getElementById("selectedBreakfast");
  const selectedLunch = document.getElementById("selectedLunch");
  const selectedDinner = document.getElementById("selectedDinner");
  
  const currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  // 서버에서 받아온 데이터
  const calendarData = /*[[${calendarList}]]*/ [];
  
  // 받아온 데이터 로그에 출력
  console.log("받아온 데이터:", calendarData);
  
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
          cell.innerHTML = `<div class="date">${date}</div>`;
          
		  const clickedDate = date;
          // 날짜 클릭 시 상단에 날짜와 메뉴 정보 표시
		  cell.addEventListener("click", function() {
              // 클릭된 날짜와 calendarData 내 항목의 날짜를 비교하여 필터링
              const selectedCalendarItem = calendarData.filter(item => {
                const itemDate = new Date(item.saveDate);
                return itemDate.getDate() === clickedDate &&
                       itemDate.getMonth() === month &&
                       itemDate.getFullYear() === year;
              });
			  consol.log("가져온 거 : 	", selectedCalendarItem);
			  selectedDateInfo.textContent = `${year}년 ${month + 1}월 ${clickedDate}일`;

              if (selectedCalendarItems.length > 0) {
                let breakfastList = [];
                let lunchList = [];
                let dinnerList = [];

                // 각 항목을 시간대에 따라 구분
                selectedCalendarItems.forEach(item => {
                  const itemHour = new Date(item.saveDate).getHours();
                  if (itemHour < 12) {
                    breakfastList.push(item.food.fName);
                  } else if (itemHour < 18) {
                    lunchList.push(item.food.fName);
                  } else {
                    dinnerList.push(item.food.fName);
                  }
                });

                selectedBreakfast.textContent = `아침: ${breakfastList.join(', ') || '메뉴 없음'}`;
                selectedLunch.textContent = `점심: ${lunchList.join(', ') || '메뉴 없음'}`;
                selectedDinner.textContent = `저녁: ${dinnerList.join(', ') || '메뉴 없음'}`;
              } else {
                selectedBreakfast.textContent = "아침: 메뉴 없음";
                selectedLunch.textContent = "점심: 메뉴 없음";
                selectedDinner.textContent = "저녁: 메뉴 없음";
              }
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
