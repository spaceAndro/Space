document.addEventListener("DOMContentLoaded", function () {
  const calendarBody = document.querySelector("#calendar tbody");
  const monthYearDisplay = document.querySelector("#monthYear");
  const prevMonthBtn = document.querySelector("#prevMonth");
  const nextMonthBtn = document.querySelector("#nextMonth");
  const prevYearBtn = document.querySelector("#prevYear");
  const nextYearBtn = document.querySelector("#nextYear");

  const selectedDate = document.querySelector("#selectedDate");
  const selectedBreakfast = document.querySelector("#selectedBreakfast");
  const selectedLunch = document.querySelector("#selectedLunch");
  const selectedDinner = document.querySelector("#selectedDinner");

  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  function updateSelectedDateInfo(date, month, year) {
    selectedDate.textContent = `${year}년 ${month}월 ${date}일`;
    selectedBreakfast.textContent = "아침 메뉴";
    selectedLunch.textContent = "점심 메뉴";
    selectedDinner.textContent = "저녁 메뉴";
  }

  function generateCalendar(year, month) {
    calendarBody.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    let date = 1;
    monthYearDisplay.textContent = `${year}년 ${month + 1}월`;

    for (let i = 0; i < 6; i++) {
      let row = document.createElement("tr");

      for (let j = 0; j < 7; j++) {
        let cell = document.createElement("td");

        if (i === 0 && j < firstDay) {
          cell.textContent = "";
        } else if (date > lastDate) {
          cell.textContent = "";
        } else {
          cell.innerHTML = `
            <div class="date">${date}</div>
            <div class="meal">아침: 메뉴1</div>
            <div class="meal">점심: 메뉴2</div>
            <div class="meal">저녁: 메뉴3</div>
          `;

          if (
            date === currentDate.getDate() &&
            year === currentDate.getFullYear() &&
            month === currentDate.getMonth()
          ) {
            cell.classList.add("highlight");
          }

          const clickedDate = date;
          const clickedMonth = month + 1; 
          const clickedYear = year;
          cell.addEventListener("click", () => {
            updateSelectedDateInfo(clickedDate, clickedMonth, clickedYear); 
          });

          date++;
        }
        row.appendChild(cell);
      }
      calendarBody.appendChild(row);
    }
  }

  prevMonthBtn.addEventListener("click", () => {
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear--;
    } else {
      currentMonth--;
    }
    generateCalendar(currentYear, currentMonth);
  });

  nextMonthBtn.addEventListener("click", () => {
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear++;
    } else {
      currentMonth++;
    }
    generateCalendar(currentYear, currentMonth);
  });

  prevYearBtn.addEventListener("click", () => {
    currentYear--;
    generateCalendar(currentYear, currentMonth);
  });

  nextYearBtn.addEventListener("click", () => {
    currentYear++;
    generateCalendar(currentYear, currentMonth);
  });

  function initializeCalendar() {
    generateCalendar(currentYear, currentMonth);
  }

  initializeCalendar();
});
