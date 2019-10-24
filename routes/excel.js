"use strict";

var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/', function(req, res) {
  console.log("victorops: call of excel ");

  fs.readFile('./temp.txt', 'utf8', function read(err, data) {
    if (err) {
        throw err;
    }
      console.log(data);
      res.send(data.replace(/\n/g,'<br>'));
  });
});

module.exports = router;
