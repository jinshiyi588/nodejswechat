var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var config = require('../config.js');

/* GET users listing. */
router.get('/', wechat('jsy_token', function (req, res, next) {  
    // 微信输入信息都在req.weixin上  
    var message = req.weixin;  
    console.log(message);  
    
    if((message.MsgType == 'event') && (message.Event == 'subscribe'))  
    {  
                    
        var replyStr = "感谢你的关注！";  
        res.reply(replyStr);  
    }  
}));  

module.exports = router;
