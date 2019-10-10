"use strict";

const config  = require('../config');
const utils   = require('../utils/apiCall');
const victoropsContactTemplateURl = config.victoropsUrlBase + config.victorops.contact;
var options = {
    url: "",
    headers: config.apiHeaders
};

module.exports = {

    getContact: function (user) {
      options.url = victoropsContactTemplateURl.replace("{user}", user);
      let phone = "Phone details not found";
        return utils.MakeRequest(options).then(function (jsonBody){

          jsonBody.contactMethods.forEach(function(contactMethod) {
            if (contactMethod.contactType === "Phone")
            {
                phone = contactMethod.value;
            }
            });
          return (phone);
        }).catch(function () {
          console.log("Promise Rejected");
      });

    }

}
