var index = require('./routes/index');
var User = require('./routes/users');
var Wechat = require('./routes/wechat');
var Log = require('./routes/log');
var Fun = require('./routes/fun');
var Tech = require('./routes/tech');
var Enjoy = require('./routes/enjoy');
var About = require('./routes/about');
var wechat = require('wechat');
var config = require('./public/config');
var fs = require("fs");



var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+"-"+file.originalname)
  }
})
var upload = multer({ storage: storage })


//route config
module.exports = function(app){

	app.use(function(req, res, next) {
	    var _user = req.session.user;

	    app.locals.user = _user;

	    next();
  	});

	//index
	app.get('/', index.index);

	//4 function
	app.get('/fun/getFun', Fun.getFun);
	app.get('/fun/newFun', User.isSignin, Fun.newFun);
	app.post('/fun/add', User.isSignin, upload.single("picUpload"), Fun.add);

	app.get('/tech/getTech', Tech.getTech);
	app.get('/tech/newTech', User.isSignin, Tech.newTech);
	app.post('/tech/add', User.isSignin, Tech.add);
	
	app.get('/about/getAbout', About.getAbout);
	app.get('/about/newAbout', User.isSignin, About.newAbout);
	app.post('/about/add', User.isSignin, upload.single("picUpload"), About.add);
	
	app.get('/enjoy/getEnjoy', Enjoy.getEnjoy);
	app.get('/enjoy/newEnjoy', User.isSignin, Enjoy.newEnjoy);
	app.post('/enjoy/add', User.isSignin, upload.single("picUpload"), Enjoy.add);

	//user
	app.post('/signup', User.signup);
	app.post('/login', User.login);
	app.get('/logout', User.logout);
	app.get('/showSignup', User.showSignup);
	app.get('/showLogin', User.showLogin);	

	app.get('/log', Log.log);

	app.get('/wechat', Wechat.get);

	app.get('/wechat/jssdk', Wechat.jssdk);
	//app.delete('/admin/list', User.isSignin, User.isAdministrator, Movie.delete);

	app.post('/wechat', wechat(config, function (req, res, next) {
  		// message is located in req.weixin
  		var message = req.weixin;
  
		  fs.writeFile('./log.txt',message.FromUserName,function(err){
		    if(err){
		      return console.log(err);
		    }

		    console.log('write file success');
		  });

		  if(((message.MsgType === 'event') && (message.Event === 'subscribe'))||((message.MsgType=== 'text') &&  (message.Content === 'm')))  
		  {

		    var coldStr = "<a href=\"http://jin41.chinacloudsites.cn/fun/getFun?weixinId=" + message.FromUserName + "\">1. 每日一冷</a>";
		                          
		    var techStr = "<a href=\"http://jin41.chinacloudsites.cn/tech/getTech?weixinId=" + message.FromUserName + "\">2. 技术分享</a>";   
		    
		    var enjoyStr = "<a href=\"http://jin41.chinacloudsites.cn/enjoy/getEnjoy?weixinId=" + message.FromUserName + "\">3. 吃喝玩乐</a>";   

		    var aboutStr = "<a href=\"http://jin41.chinacloudsites.cn/about/getAbout?weixinId=" + message.FromUserName + "\">4. 关于我</a>";   
		    
		    var jssdkStr = "<a href=\"http://jin41.chinacloudsites.cn/wechat/jssdk\">5. jssdk</a>";   
		    
		    var menuStr = "5. 回复m重新进入菜单";   

		    var emptyStr = "          ";                  
		    
		    var replyStr = "Hello，你终于来啦，颜值高的人都在关注我哟～(•̀ロ•́)و✧ ~~" 
		                  + "\n"+ emptyStr + "\n" + coldStr + "\n"
		                  + emptyStr + "\n" + techStr + "\n"
		                  + emptyStr + "\n" + enjoyStr + "\n"
		                  + emptyStr + "\n" + aboutStr + "\n"
		                  + emptyStr + "\n" + menuStr + "\n"
		                  + emptyStr + "\n" + jssdkStr + "\n";  

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
		    var emptyStr = "          ";   
		    res.reply("回复m重新进入菜单~"+"\n"+emptyStr+"\n"
		              +"功能还未完善，欢迎调戏我～");

		  }
  
	}));


}