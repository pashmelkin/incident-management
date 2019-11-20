"use strict";

 const express = require('express');
 const router = express.Router();


 router.get('/', function(req, res) {
   let reqTeam = req.query.team || 'idam';

   res.send(JSON.stringify({ team: reqTeam }));
 });

 module.exports = router;
