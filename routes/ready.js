"use strict";

const express = require('express');
const incidentService = require("../middleware/getOnCall");
const router = express.Router();

router.get('/', function(req, res) {
    const team = 'IDAM';

    incidentService.getOnCall(team, 'primary').then(function (user) {
      if (user) {
        res.send('Ok');
    }
    });
});


module.exports = router;
