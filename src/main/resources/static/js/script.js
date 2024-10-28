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

          calendar.highestCalorieMeal = null;

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

                    if (!calendar.highestCalorieMeal || kcal > calendar.highestCalorieMeal.kcal) {
                      calendar.highestCalorieMeal = { name: calendar[mealType], kcal: kcal };
                    }
                  })
                  .catch(error => console.error(`Fetch error for ${mealType}:`, error))
              );
            }
          });

          return Promise.all(mealPromises).then(() => calendar);
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

                  if (j === 0) cell.classList.add("sunday");
                  else if (j === 6) cell.classList.add("saturday");

                  const holidayKey = `${month + 1}-${date}`;
                  if (holidays[holidayKey]) {
                    cell.classList.add("holiday");
                    cell.setAttribute("title", holidays[holidayKey]);
                  }

                  cell.innerHTML = `<div class="date" data-date="${year}-${(month + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}">${date}</div>`;

                  if (calendar && calendar.highestCalorieMeal) {
                    const highCalorieInfo = document.createElement("div");
                    highCalorieInfo.classList.add("high-calorie-info");
                    highCalorieInfo.textContent = `${calendar.highestCalorieMeal.name} (${calendar.highestCalorieMeal.kcal} kcal)`;
                    cell.appendChild(highCalorieInfo);
                  }

                  cell.addEventListener("click", function() {
                    highlightSelectedCell(cell);
                    
                    // 직접 선택한 날짜를 update
                    selectedDateInfo.textContent = `${year}년 ${month + 1}월 ${date}일`;

                    updateMealInfo(selectedBreakfast, calendar ? calendar.breakfast : '메뉴 없음');
                    updateMealInfo(selectedLunch, calendar ? calendar.lunch : '메뉴 없음');
                    updateMealInfo(selectedDinner, calendar ? calendar.dinner : '메뉴 없음');
                  });

                  if (date === currentDate.getDate() && year === currentYear && month === currentMonth) {
                    highlightSelectedCell(cell);
                    selectedDateInfo.textContent = `${year}년 ${month + 1}월 ${date}일`;

                    updateMealInfo(selectedBreakfast, calendar ? calendar.breakfast : '메뉴 없음');
                    updateMealInfo(selectedLunch, calendar ? calendar.lunch : '메뉴 없음');
                    updateMealInfo(selectedDinner, calendar ? calendar.dinner : '메뉴 없음');
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

  generateCalendar(currentYear, currentMonth);
});
