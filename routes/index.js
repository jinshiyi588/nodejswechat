var fs = require("fs");

/* GET home page. */
exports.index = function(req, res, next) {
	fs.appendFile('log.txt','index.js1',function(err){
    	if(err){
     	 return console.log(err);
   		}
   		//res.send('indexpage');
  		res.render('index');
	});
}

