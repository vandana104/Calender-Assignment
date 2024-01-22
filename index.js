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
        // Deselect the date
        dayElement.classList.remove("selected");
        selectedDates = selectedDates.filter(
          (date) => date !== formatDate(selectedDate)
        );
      } else {
        // Select the date
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
  
    // Initial setup
    initializeCalendar();
  
    // Event listeners for Prev and Next buttons
    document.getElementById("prev-btn").addEventListener("click", prevMonth);
    document.getElementById("next-btn").addEventListener("click", nextMonth);
  });

// let currentDate = new Date();
// let initialSelectedDate;
// let selectedDates = [];

// document.addEventListener("DOMContentLoaded", function () {
//   initialSelectedDate = new Date(currentDate);
//   renderCalendar(currentDate);
//   renderSelectedDates();
// });

// function renderCalendar(date) {
//   const calendarBody = document.getElementById("calendar-body");
//   const monthYear = document.getElementById("month-year");

//   calendarBody.innerHTML = "";
//   monthYear.textContent =
//     getMonthName(date.getMonth()) + " " + date.getFullYear();

//   const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
//   const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

//   let dayCount = 1;

//   for (let i = 0; i < 6; i++) {
//     for (let j = 0; j < 7; j++) {
//       const dayElement = document.createElement("div");
//       dayElement.classList.add("day");

//       if ((i === 0 && j < firstDay.getDay()) || dayCount > lastDay.getDate()) {
//         dayElement.textContent = "";
//       } else {
//         dayElement.textContent = dayCount;
//         dayElement.addEventListener("click", function () {
//           toggleDate(dayCount, date);
//         });

//         const formattedDate = formatDate(dayCount, date);
//         if (
//           selectedDates.includes(formattedDate) ||
//           (initialSelectedDate &&
//             isSameDate(initialSelectedDate, date, dayCount))
//         ) {
//           dayElement.classList.add("selected");
//         }

//         if (isToday(date, dayCount)) {
//           dayElement.classList.add("today");
//         }

//         dayCount++;
//       }
//       calendarBody.appendChild(dayElement);
//     }
//   }
// }

// function isSameDate(date1, date2, day) {
//   return (
//     date1.getFullYear() === date2.getFullYear() &&
//     date1.getMonth() === date2.getMonth() &&
//     day === date1.getDate()
//   );
// }

// function isToday(date, day) {
//   const today = new Date();
//   return isSameDate(today, date, day);
// }

// function getMonthName(month) {
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   return months[month];
// }

// function formatDate(day, date) {
//   const month = date.getMonth() + 1;
//   const year = date.getFullYear();
//   return `${year}-${month < 10 ? "0" : ""}${month}-${
//     day < 10 ? "0" : ""
//   }${day}`;
// }

// function toggleDate(day, date) {
//   const formattedDate = formatDate(day, date);
//   const index = selectedDates.indexOf(formattedDate);

//   if (index === -1) {
//     selectedDates.push(formattedDate);
//   } else {
//     selectedDates.splice(index, 1);
//   }

//   renderCalendar(date);
//   renderSelectedDates();
// }

// function renderSelectedDates() {
//   const selectedDatesContainer = document.getElementById("selected-dates");
//   selectedDatesContainer.innerHTML =
//     "User Selected Dates - " + JSON.stringify(selectedDates);
// }

// function prevMonth() {
//   currentDate.setMonth(currentDate.getMonth() - 1);
//   renderCalendar(currentDate);
// }

// function nextMonth() {
//   currentDate.setMonth(currentDate.getMonth() + 1);
//   renderCalendar(currentDate);
// }

