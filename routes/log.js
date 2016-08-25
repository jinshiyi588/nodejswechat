var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET users listing. */
router.get('/', function(req, res, next) {
	fs.readFile('./log.txt', function (err, data) {
   		if (err) {
       		return console.error(err);
   		}
   		console.log("File data: " + data.toString());
   		res.send(data.toString());
	});
});

module.exports = router;
