"use strict";
var Holidays = require('date-holidays');

module.exports = {

  getCurrentDate: function () {
    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    return (dd + '/' + mm + '/' + yyyy);
  },

  getStartDate: function(date) {
    return date + '-01';
  },

  getEndDate: function(date) {
    const startDate = new Date(this.getStartDate(date));
    const currentYear = startDate.getFullYear();
    const currentMonth = startDate.getMonth() + 1;
    const lastDate = new Date(currentYear, currentMonth, 0).getDate();
    return  currentYear + '-' + currentMonth + '-' + lastDate;
  },

  calculateWorkingDays: function (startDate, endDate) {
    console.log("calculateWorkingDays: " + startDate);
    console.log("calculateWorkingDays: " + endDate);
    let currentDate = startDate;
    let workingDaysCount = 0;
    let weekendAndPublicHolidaysCount = 0;
    while (currentDate <= endDate) {
        if(this.isWeekend(currentDate) || this.isPublicHolidayInVicAus(currentDate))
          weekendAndPublicHolidaysCount++;
        else
          workingDaysCount++;

        currentDate.setDate(currentDate.getDate() + 1);
      }

    return {
      countWorkingDays: workingDaysCount,
      countWeekdEndDays: weekendAndPublicHolidaysCount
    };
  },

  isWeekend: function(date) {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 6 || dayOfWeek === 0;
  },

  isPublicHolidayInVicAus: function(date) {
    const hd = new Holidays('AU', 'VIC', 'M');
    return  hd.isHoliday(date) != false;
  },

  adjustDate: function (logDate, requestDate) {
    console.log('adjustDate : logDate=' + logDate);
    console.log('adjustDate: requestDate=' + requestDate);
    const dateMonth = logDate.getMonth() + 1;
    const requestMonth = requestDate.split('-')[1];

    if (dateMonth < requestMonth)
      return new Date(this.getStartDate(requestDate));
    else if (dateMonth > requestMonth)
      return new Date(this.getEndDate(requestDate));
    else {
      return new Date(logDate.getFullYear(), logDate.getMonth(), logDate.getDate());
    }
  }

}
