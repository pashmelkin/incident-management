"use strict";

class ReportUser {
  constructor(name) {
    this.name = name,
    this.primaryWorkingDays = 0,
    this.primaryWeekendDays = 0,
    this.secondaryWorkingDays = 0,
    this.secondaryWeekendDays = 0,
    this.totalWorkingDays = 0,
    this.totalWeekendDays =0
  }
}

module.exports = ReportUser;
