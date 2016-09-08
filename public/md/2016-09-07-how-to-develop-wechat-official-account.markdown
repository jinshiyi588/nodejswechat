
###前期准备
1. 注册微信公众号
2. 注册azure账号，现在有1元使用一个月的试用版，可以供新手练习(但是我用到现在发现，试用版的性能果然不太好，网页打开速度有点慢)
* 网上也有建议使用Amazon的EC2，新用户第一年免费，但是需要提供能证明你所填地址的账单，并传真给amazon,我没有申请成功。

###安装nodejs和mongodb
* 命令行网上可以查到

###上传azure部署
1. 在webapp中新建一个app,获得一个url地址
2. 在config中设置SCM_COMMAND_IDLE_TIMEOUT为1000，这个是部署时最长等待时间，如果时间过短，容易部署失败
3. 在vritual machine中新建一个vm,我开发用的是mac，vm操作系统选了ubuntu
4. 新建endpoint,它是开通的端口，开放mongodb的27017端口
5. 使用ssh连接到vm，安装mongodb

###微信公众号开发-基本配置
1. 填写url(服务器地址，azure webapp地址)
2. Token(令牌)
3. 获取EncodingAESKey，APPID,APPSecret(后面会用到)
4. 选择安全模式

###使用微信提供的wechat包
* [npm wechat](https://www.npmjs.com/package/wechat)
* 下面的例子很详细，再结合这篇[博客](http://blog.csdn.net/virtualpower/article/details/38733569),基本上可以把框架搭出来了。
* 可以开发一些自己想要的功能，我在webapp中使用bootstrap的模板开发了几个页面，可以在微信浏览器中打开，并获取azure上的数据

###主要代码

```javascript
	app.post('/wechat', wechat(config, function (req, res, next) {
  		// message is located in req.weixin
 		var message = req.weixin;

		  if(((message.MsgType === 'event') && (message.Event === 'subscribe'))||((message.MsgType=== 'text') &&  (message.Content === 'm')))  
		  { 
		  	//新用户关注时或用户回复m时

		    var replyStr = "Hello，你终于来啦，颜值高的人都在关注我哟～(•̀ロ•́)و✧ ~~" ;
		                   
		    res.reply(replyStr); 
		  }else{
			//用户回复其他
		    var emptyStr = "          ";   
		    res.reply("回复m重新进入菜单~"+"\n"+emptyStr+"\n"
		              +"功能还未完善，欢迎调戏我～");

		  }
```

* 完整代码请查看我的[github]()

###微信jssdk功能



