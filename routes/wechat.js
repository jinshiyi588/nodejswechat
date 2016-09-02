var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var fs = require("fs");
var config = require('../public/config');
//var crypto  = require('crypto');

//

/* GET users listing. */

router.get('/', function(res, req){

	var echoString = res.body.echostr;
	res.send(echoString);
});

router.post('/', wechat(config, function (req, res, next) {
  // message is located in req.weixin
  var message = req.weixin;
  
  fs.writeFile('./log.txt',message.FromUserName,function(err){
    if(err){
      return console.log(err);
    }

    console.log('write file success');
  });

  if(((message.MsgType === 'event') && (message.Event === 'subscribe'))||((message.MsgType=== 'text') &&  (message.Content === '3')))  
  {

    var coldStr = "<a href=\"http://jin41.chinacloudsites.cn/fun/getFun?weixinId=" + message.FromUserName + "\">1. 每日一冷</a>";
                          
    var musicStr = "<a href=\"http://jin41.chinacloudsites.cn/fun/getMusic?weixinId=" + message.FromUserName + "\">2. Music</a>";   
    
    var menuStr = "3. 回复3进入Menu";   

    var emptyStr = "          ";                  
    
    var replyStr = "Hello，你终于来啦，颜值高的人都在关注我哟～(•̀ロ•́)و✧ ~~" + "\n"+ emptyStr + "\n" + coldStr + "\n"+ emptyStr + "\n" + musicStr;  

    res.reply(replyStr); 
  } else if(message.MsgType=== 'text' &&  message.Content === '你好'){
    res.reply('你好呀～');

  }else if(message.MsgType=== 'text' &&  message.Content === 'site'){
    
    res.reply([
      {
        title: 'Jinshiyi588',
        description: 'Jinshiyi’s github site',
        picurl: 'http://jin41.chinacloudsites.cn/images/pic1.jpg',
        url: 'https://jinshiyi588.github.io/'
      }
    ]);
  }else{
    res.reply('功能还未完善，欢迎调戏我～');

  }
  
}));



module.exports = router;
