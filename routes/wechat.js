var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var fs = require("fs");
var crypto  = require('crypto');

//

/* GET users listing. */
router.get('/',  function (req, res) {
	fs.writeFile('./log.txt',req.query.timestamp,function(err){
		if(err){
			return console.log(err);
		}

		console.log('write file success');
	});

    if(!checkSignature(req)){
      res.writeHead(401);
      res.end('signature not matched.');
      return;
  	}
    
  	res.writeHead(200);
  	res.end(req.query.echostr);

  	function checkSignature(req){
      	var token = 'jsy_token',
      		timestamp = req.query.timestamp,
      		nonce     = req.query.nonce,
      		signature = req.query.signature;

    	var sha1 = crypto.createHash('sha1');
    	var arr = [token, timestamp, nonce].sort();
    	sha1.update(arr.join(''));

    	return sha1.digest('hex') === signature;
  	}
});  



module.exports = router;
