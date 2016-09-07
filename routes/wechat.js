//var wechat = require('wechat');
//var crypto  = require('crypto');
var wechat_cfg = require('../public/config');
var http = require('http');
var cache = require('memory-cache');
var sha1 = require('sha1'); //签名算法
	//var url = require('url');
var signature = require('../sign/signature');
//

/* GET users listing. */

exports.get = function(res, req){

	var echoString = res.body.echostr;
	res.send(echoString);
}


exports.jssdk =function(req,res){
		//var url = req.protocol + '://' + req.host + req.path;
		var url = req.protocol + '://' + req.host + req.originalUrl; 
		console.log("url:"+url);
		//获取当前url
		signature.sign(url,function(signatureMap){
			signatureMap.appId = wechat_cfg.appid;
			res.render('jssdk',signatureMap);
		});
	}