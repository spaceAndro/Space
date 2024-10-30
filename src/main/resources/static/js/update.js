document.addEventListener("DOMContentLoaded", function () {
	const userId = document.querySelector(".calendar-container").dataset.userId;
	const savedDate = localStorage.getItem("date");
	const breakfastInput = document.getElementById("breakfastInput");
	const lunchInput = document.getElementById("lunchInput");
 	const dinnerInput = document.getElementById("dinnerInput");
 	const savedDateInput = document.getElementById("savedDateInput"); // 숨겨진 필드

    savedDateInput.value = savedDate; // savedDate를 hidden input에 설정
	
	fetch(`/api/calendars/date?userId=${userId}&date=${savedDate}`)
		.then(response => response.json())
		.then(calendarData => {
			console.log(calendarData);
			breakfastInput.value = `${calendarData.breakfast}`;
			lunchInput.value = `${calendarData.lunch}`;
			dinnerInput.value = `${calendarData.dinner}`;
		})
		.catch(error => console.log("에러 발생 : ", error));
});