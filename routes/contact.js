"use strict";

const express = require('express');
const router = express.Router();
const incidentService = require("../middleware/getContact");
const redisService = require("../middleware/checkCache");

router.get('/', redisService.checkCache, function(req, res) {
    let reqUser = req.query.user;

    incidentService.getContact(reqUser).then(function (phone) {
        res.send(phone);
    });

});

module.exports = router;
