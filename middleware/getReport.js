"use strict";

const config = require('../config');
const apiCallUtil = require('../utils/apiCall');
const dateUtils = require('../utils/dates');
const Report = require('../entities/Report');
const ReportUser = require('../entities/ReportUser');
const apiHeaders = config.apiHeaders;
const victoropsOnCall = config.victoropsUrlBase + config.victorops.api_report;


module.exports = {

  getReport: function (team, date) {
      const startDate = dateUtils.getStartDate(date);
      const endDate = dateUtils.getEndDate(date);
      console.log('startDate=' + startDate);
      console.log('endDate=' + endDate);

      // proper date format
      var options = {
        url: victoropsOnCall + team + '/oncall/log' + '?start=' + startDate + '&end=' + endDate,
        headers: apiHeaders
      };

      const report = new Report(team, date);

      return apiCallUtil.MakeRequest(options).then(function (jsonBody){
        const userLogs = jsonBody.userLogs;

        userLogs.forEach(function(userLog) {
          console.log("middleware : userlog: " + userLog.userId);

          const reportUser = new ReportUser(userLog.userId);

          let primaryWorkingDays = 0;
          let primaryWeekendDays = 0;
          let secondaryWorkingDays = 0;
          let secondaryWeekendDays = 0;

          const logs = userLog.log;

          logs.forEach(function(log) {
            var startDate = dateUtils.adjustDate(new Date(log.on), date);
            var endDate = dateUtils.adjustDate(new Date(log.off), date);
            const days = dateUtils.calculateWorkingDays(startDate, endDate);
            primaryWorkingDays += days.countWorkingDays;
            primaryWeekendDays += days.countWeekdEndDays;
          });

          reportUser.primaryWorkingDays = primaryWorkingDays;
          reportUser.primaryWeekendDays = primaryWeekendDays;
          reportUser.secondaryWorkingDays = secondaryWorkingDays;
          reportUser.secondaryWeekendDays = secondaryWeekendDays;
          reportUser.totalWorkingDays = primaryWorkingDays + secondaryWorkingDays;
          reportUser.totalWeekendDays = primaryWeekendDays + secondaryWeekendDays;

          report.onCallUsers.push(reportUser);
        });
        return (report);

      })

  }

}
