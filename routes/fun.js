var Fun = require('../app/models/fun');


/* GET users listing. */
exports.getFun = function(req, res) {

	Fun.findOne({}, null, {sort: {funId: -1 }}, function(err, fun){
		if(err) console.log(err);
		res.render('fun',{
			fun: fun
		})
	});
}

exports.newFun = function(req, res){
	res.render('addFun',{
			fun: {},
		});
}

exports.add = function(req, res){
	var funObj =req.body.fun;
	
	if(req.file){
		funObj.picture="/upload/"+req.file.filename;
	}	

	var _fun =new Fun(funObj);
	
	Fun.findOne({})
		.sort('-funId')  // give me the max
  		.exec(function (err, fun) {
		if(err) console.log(err);

		console.log('fun:'+fun.title);
		if(fun){
			_fun.funId=fun.funId+1;
		}else{
			_fun.funId=0;
		}

		_fun.save(function(err,fun){
			if (err) {
				console.log(err);
			}
						
			res.redirect('/fun/getFun');		
		})
  	});
}

/*
router.get('/getMusic', function(req, res, next) {
	res.send('respond with a resource');
});*/

