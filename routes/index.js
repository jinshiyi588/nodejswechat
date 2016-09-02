var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	fs.appendFile('log.txt','index.js1',function(err){
    	if(err){
     	 return console.log(err);
   		}
	});
  res.render('index', { title: 'Express' });
});

module.exports = router;
