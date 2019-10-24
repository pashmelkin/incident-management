"use strict";

const express = require('express');
const router = express.Router();
const victorops = require("../utils/getOverrides");

router.get('/', function(req, res) {
   let reqUser = req.query.user;
   let overUser ='';

    victorops.getOverrides().then(function (jsonBody) {

     jsonBody.overrides.forEach(function(override) {
          var user = override.user.username;

          if (reqUser === user)
          {
            overUser = override.assignments[0].user;
          }
        });

    res.send(overUser);
   });

});



module.exports = router;
