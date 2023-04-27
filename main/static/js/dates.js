/* functionality for date validation.
   responsible for handling date input events.
   ensures that start date can't be greater than end date.
*/

var startDate, endDate;
function dateInput() {
    startDate = document.querySelector(".start-date");
    endDate = document.querySelector(".end-date");

    startDate.addEventListener("input", startDateHandler);
    endDate.addEventListener("input", endDateHandler)
}

function startDateHandler() {
    if (endDate.value != "") {
        // start value can't be greater than end value
        if (this.value > endDate.value) {
            endDate.value = this.value;
        }
    }
}

function endDateHandler() {
    if (startDate.value != "") {
        // end value can't be less than start value
        if (this.value < startDate.value) {
            startDate.value = this.value;
        } 
    }
}

function start() {
    dateInput();
}
window.addEventListener("load", start)

/**function to take in a date object and returns its string representation.*/
function getDateString(date, european=false) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month.toString().length == 1) {
        month = `0${month}`;
    }
    let day = date.getDate();
    if (day.toString().length == 1) {
        day = `0${day}`;
    }
    if (!european) {
        return `${year}-${month}-${day}`;
    }
    else {
        return `${day}-${month}-${year}`;
    }
}

