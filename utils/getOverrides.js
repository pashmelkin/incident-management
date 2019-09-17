"use strict";

const request = require('request');
const apiHeaders = {
    'X-VO-Api-Id': 'a3b64b9d',
    'X-VO-Api-Key': 'dab2d280d5954dc3bac3364a2e59bad2'
  };
const victoropsUrl = 'https://api.victorops.com/api-public/v1/overrides';


module.exports = {

  getOverrides: function () {

      var options = {
        url: victoropsUrl,
        headers: apiHeaders
      };

      return new Promise((success, failure) => {
          request(options, function (error, response, body) {
              if(error){  failure(error) };
              if (response.statusCode == 200) {
                let jsonBody =  JSON.parse(body);
                success(jsonBody);
              }
              else {
                failure(error);
              }
            });
          });
  }

}
