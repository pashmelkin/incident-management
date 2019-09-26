"use strict";

const config  = require('../config');
const utils   = require('../utils/apiCall');
const incidentService = require("../middleware/getOverride");
const apiHeaders = config.apiHeaders;
const victoropsOnCallUrl = config.victoropsUrlBase + config.victorops.onCall;


module.exports = {

  getOnCall: function (team, order) {
      let step = (order === 'secondary') ? '?step=1' : '';

      var options = {
        url: victoropsOnCallUrl + team + '/oncall/schedule' + step,
        headers: apiHeaders
      };
      return utils.MakeRequest(options).then(function (jsonBody){
        let user = jsonBody.schedules[0].schedule[0].onCallUser.username;
        console.log("middleware : user: " + user);


          return incidentService.getOverride(user).then(function (overUser) {
              if (overUser) {
                  return (overUser);
              }
              else
                  return user;
          });

      })

  }

}
