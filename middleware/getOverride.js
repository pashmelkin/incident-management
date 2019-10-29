"use strict";

const config  = require('../config');
const utils   = require('../utils/apiCall');
const options = {
    url: config.victoropsUrlBase + config.victorops.overrides,
    headers: config.apiHeaders
};

module.exports = {

    getOverride: function (user) {

        return utils.MakeRequest(options).then(function (){
            let overUser ='';

            return utils.MakeRequest(options).then(function (jsonBody) {
                jsonBody.overrides.forEach(function(override) {
                    if (user === override.user.username)
                    {
                        overUser = override.assignments[0].user;
                        console.log("user found:" + overUser);
                    }
                });
                return (overUser);
            });
        })

    }

}
