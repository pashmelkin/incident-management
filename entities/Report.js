"use strict";

class Report {
  constructor(team, date) {
    this.team = team;
    this.date = date;
    this.onCallUsers = [];
  }
}

module.exports = Report;
