"use strict";

const request = require('request');

module.exports = {

  MakeRequest : function (options) {

      return new Promise((success, failure) => {
          request(options, function (error, response, body) {
              if(error){  failure(error) }
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
