document.addEventListener("DOMContentLoaded", function () {
  const calendarBody = document.querySelector("#calendar tbody");
  const selectedDateInfo = document.getElementById("selectedDate");
  const selectedBreakfast = document.getElementById("selectedBreakfast");
  const selectedLunch = document.getElementById("selectedLunch");
  const selectedDinner = document.getElementById("selectedDinner");
  const yearDisplay = document.getElementById("yearDisplay");
  const monthDisplay = document.getElementById("monthDisplay");

  const today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();
  let todayDate = today.getDate();

  const holidays = {
    "01-01": "신정",
    "03-01": "삼일절",
    "05-05": "어린이날",
    "06-06": "현충일",
    "08-15": "광복절",
    "10-01": "국군의 날",
    "10-03": "개천절",
    "10-09": "한글날",
    "12-25": "성탄절",
  };

  const lunarHolidays = {
    설날: ["2024-02-10", "2025-01-29"],
    추석: ["2024-09-17", "2025-10-06"],
    부처님오신날: ["2024-05-15", "2025-05-04"]
  };

  function updateYearMonthDisplay() {
    const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    yearDisplay.textContent = `${currentYear}년`;
    monthDisplay.textContent = `${monthNames[currentMonth]}`;
  }

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

  function getHighestCalorieMealImage(meals) {
    let highestCalorieMeal = meals.reduce((prev, current) => (prev.calories > current.calories) ? prev : current);
    return highestCalorieMeal.imagePath;
  }

  function updateCalendarWithMeals(calendarData) {
    calendarData.forEach(dayData => {
      let dayElement = document.getElementById(dayData.date);
      let meals = dayData.meals;
      let imagePath = getHighestCalorieMealImage(meals);

      let imgElement = document.createElement('img');
      imgElement.src = `./images/foodicon/${imagePath}`;
      imgElement.alt = meals.find(meal => meal.imagePath === imagePath).mealName;
      imgElement.classList.add('meal-image');

      dayElement.appendChild(imgElement);
    });
  }

  function generateCalendar(year, month) {
    calendarBody.innerHTML = "";
    
    // firstDay 수정: 일요일을 기준으로 계산하여 날짜가 정확한 요일에 맞게 표시되도록 조정
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    let date = 1;

    for (let i = 0; i < 6; i++) {
      let row = document.createElement("tr");

      for (let j = 0; j < 7; j++) {
        let cell = document.createElement("td");

        if (j === 0) cell.classList.add("sunday");
        if (j === 6) cell.classList.add("saturday");

        if (i === 0 && j < firstDay) {
          cell.textContent = "";
        } else if (date > lastDate) {
          break;
        } else {
          let formattedDate = `${("0" + (month + 1)).slice(-2)}-${("0" + date).slice(-2)}`;

          if (holidays[formattedDate]) {
            cell.classList.add("holiday");
            cell.title = holidays[formattedDate];
          }

          let lunarHoliday = isLunarHoliday(year, month, date);
          if (lunarHoliday) {
            cell.classList.add("holiday");
            cell.title = lunarHoliday;
          }

          cell.innerHTML = `<div class="date">${date}</div>`;

          if (date === todayDate && year === today.getFullYear() && month === today.getMonth()) {
            cell.classList.add("today");
          }

          cell.setAttribute("id", `${year}-${("0" + (month + 1)).slice(-2)}-${("0" + date).slice(-2)}`);
          
          const clickedDate = date;
          cell.addEventListener("click", function () {
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

  fetch('/mealsData')
    .then(response => response.json())
    .then(calendarData => updateCalendarWithMeals(calendarData))
    .catch(error => console.error('Error fetching meal data:', error));

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

  generateCalendar(currentYear, currentMonth);
  updateYearMonthDisplay();
  displayTodayInfo();
});
