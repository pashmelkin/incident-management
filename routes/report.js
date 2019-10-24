"use strict";

const express = require('express');
const incidentService = require("../middleware/getReport");
const router = express.Router();


router.get('/', function(req, res) {
    const team = req.query.team;
    const date = req.query.date;

    incidentService.getReport(team, date).then(function (report) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.send(report);
    });
});

module.exports = router;
