//var wechat = require('wechat');
//var crypto  = require('crypto');

//

/* GET users listing. */

exports.get = function(res, req){

	var echoString = res.body.echostr;
	res.send(echoString);
}


