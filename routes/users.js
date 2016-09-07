var User = require('../app/models/user')

/* GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/

exports.signup = function(req, res){
		var _user = req.body.user;

		User.findOne({name: _user.name},function(err, user){
			if (err) {
				console.log(err);
			}
			if (user) {
				console.log("user already exists.");
				return res.redirect("/");
			}else{
				var user = new User(_user);
				user.save(function(err, user){
					if (err) {
						console.log(err);
					}
					res.redirect('/');
				})
			}

		})

	}

exports.login = function(req, res){
		var userObj = req.body.user;
		var name = userObj.name;
		var password = userObj.password;

		User.findOne({name: name},function(err, user){
			if (err) {
				console.log(err);
			}

			if(!user){
				console.log("user does not exist.");
				return res.redirect("/");
			}else{
			//console.log(user.password);
			user.comparePassword(password, function(err, isMatch){
				if (err) {
					console.log(err);
				}
				if (isMatch) {
					//session
					req.session.user = user ;
					return res.redirect('/');
				}else{
					console.log("password is not match");
					res.redirect('/');
				}

			})

		}

	})

}

exports.logout =function(req, res){

	delete req.session.user;
	//delete app.locals.user;
	res.redirect('/');
}

exports.showSignup = function(req,res){
	res.render('showSignup',{
		title: 'imooc signup'
		
	})
		
}

exports.showLogin = function(req,res){
	res.render('showLogin',{
		title: 'imooc login'
		
	})
		
}

//middleware
exports.isSignin = function(req,res,next){
	var _user = req.session.user;
	if(!_user){
		return res.redirect('/showLogin');
	}
	next();

}