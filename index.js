document.addEventListener("DOMContentLoaded", function () {
    const calendarBody = document.getElementById("calendar-body");
    const monthYearDisplay = document.getElementById("month-year");
    const selectedDatesContainer = document.getElementById("selected-dates");
  
    let currentDate = new Date();
    let selectedDates = [];
  
    function initializeCalendar() {
      renderCalendar(currentDate);
      updateSelectedDatesContainer();
    }
  
    function renderCalendar(date) {
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  
      monthYearDisplay.textContent = `${getMonthName(
        date.getMonth()
      )} ${date.getFullYear()}`;
  
      let dayCounter = 1;
  
      while (dayCounter <= lastDay.getDate()) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.textContent = dayCounter;
  
        if (
          date.getMonth() === currentDate.getMonth() &&
          dayCounter === currentDate.getDate()
        ) {
          dayElement.classList.add("selected");
          selectedDates.push(formatDate(currentDate));
        }
  
        dayElement.addEventListener("click", function () {
          toggleDateSelection(dayElement, date, dayCounter);
        });
  
        calendarBody.appendChild(dayElement);
        dayCounter++;
      }
    }
  
    function toggleDateSelection(dayElement, date, day) {
      const selectedDate = new Date(date.getFullYear(), date.getMonth(), day);
  
      if (dayElement.classList.contains("selected")) {
        dayElement.classList.remove("selected");
        selectedDates = selectedDates.filter(
          (date) => date !== formatDate(selectedDate)
        );
      } else {
        dayElement.classList.add("selected");
        selectedDates.push(formatDate(selectedDate));
      }
  
      updateSelectedDatesContainer();
    }
  
    function updateSelectedDatesContainer() {
      selectedDatesContainer.textContent = `Selected Dates: ${selectedDates.join(
        ", "
      )}`;
    }
  
    function clearCalendar() {
      calendarBody.innerHTML = "";
    }
  
    function prevMonth() {
      clearCalendar();
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar(currentDate);
    }
  
    function nextMonth() {
      clearCalendar();
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar(currentDate);
    }
  
    function formatDate(date) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
  
      return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
    }
  
    function getMonthName(monthIndex) {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return months[monthIndex];
    }
  
    initializeCalendar();
  
    document.getElementById("prev-btn").addEventListener("click", prevMonth);
    document.getElementById("next-btn").addEventListener("click", nextMonth);
  });

