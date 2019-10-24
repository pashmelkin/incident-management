"use strict";

const config  = require('../config');
const utils   = require('../utils/apiCall');
const victoropsContactTemplateURl = config.victoropsUrlBase + config.victorops.contact;

function buildOptions(url) {
  this.url = url;
  this.headers = config.apiHeaders;
}

module.exports = {

    getContact: function (user) {
      const contactUserUrl = victoropsContactTemplateURl.replace("{user}", user);

      const options = new buildOptions(contactUserUrl);

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
