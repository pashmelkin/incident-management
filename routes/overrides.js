"use strict";

const express = require('express');
const router = express.Router();
const incidentService = require("../middleware/getOverride");

router.get('/', function(req, res) {

     try {
       let reqUser = req.query.user.toLowerCase();
       if (reqUser === undefined)
       {
          res.send("no user provided for the call");
       }
       incidentService.getOverride(reqUser).then(function (overUser) {
           if (overUser) {
               res.send (overUser);
           }
           else
               res.send(reqUser);
       });
     }
     catch(error) {
       console.log("Error");
       res.send("error");
     }

});

module.exports = router;
