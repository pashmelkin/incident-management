"use strict";

const request = require('request');
const config  = require('../config');
const utils   = require('../utils/apiCall');
const apiHeaders = config.apiHeaders;
const victoropsOnCall = config.victoropsUrlBase + config.victorops.onCall;
const victoropsOverride = config.victoropsUrlBase + config.victorops.overrides;


module.exports = {

  getOnCall: function (team, order) {
      let step = (order === 'secondary') ? '?step=1' : '';

      var options = {
        url: victoropsOnCall + team + '/oncall/schedule' + step,
        headers: apiHeaders
      };
      return utils.MakeRequest(options).then(function (jsonBody){
        let user = jsonBody.schedules[0].schedule[0].onCallUser.username;
        console.log("middleware : user: " + user);
        options.url = victoropsOverride;
        let overUser ='';

        return utils.MakeRequest(options).then(function (jsonBody) {
          jsonBody.overrides.forEach(function(override) {
               if (user === override.user.username)
               {
                 overUser = override.assignments[0].user;
               }
             });
        return (user);
        });
      })

  }

}
