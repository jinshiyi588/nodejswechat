var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.get('/', function(req, res, next) {
	fs.appendFile('log.txt','index.js1',function(err){
    	if(err){
     	 return console.log(err);
   		}
   		//res.send('indexpage');
  		res.render('index');
	});
});

module.exports = router;
