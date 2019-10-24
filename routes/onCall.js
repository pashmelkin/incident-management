"use strict";

const express = require('express');
const incidentService = require("../middleware/getOnCall");
const dateUtils   = require('../utils/dates');
const router = express.Router();

let onCall = {
  "team": "",
  "primary": "",
  "secondary": "",
  "date": ""
}

router.get('/', function(req, res) {
    onCall.team = req.query.team;
    onCall.date = dateUtils.getCurrentDate();

    incidentService.getOnCall(onCall.team, 'primary').then(function (primaryUser) {
        onCall.primary = primaryUser;
        return incidentService.getOnCall(onCall.team, 'secondary');
    }).then(function (secondaryUser) {
      onCall.secondary = secondaryUser;
      res.header("Access-Control-Allow-Origin", "*"); 
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.send(onCall);
    });
});

module.exports = router;
