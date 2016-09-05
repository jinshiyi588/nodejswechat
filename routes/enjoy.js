var Enjoy = require('../app/models/enjoy');


/* GET users listing. */
exports.getEnjoy = function(req, res) {

	Enjoy.findOne({}, null, {sort: {enjoyId: -1 }}, function(err, enjoy){
		if(err) console.log(err);
		res.render('enjoy',{
			enjoy: enjoy
		})
	});
}

exports.newEnjoy = function(req, res){
	res.render('addEnjoy',{
			enjoy: {},
		});
}

exports.add = function(req, res){
	var enjoyObj =req.body.enjoy;
	
	if(req.file){
		enjoyObj.picture="/upload/"+req.file.filename;
	}	

	var _enjoy =new Enjoy(enjoyObj);
	
	Enjoy.findOne({})
		.sort('-enjoyId')  // give me the max
  		.exec(function (err, enjoy) {
		if(err) console.log(err);

		if(enjoy){
			_enjoy.enjoyId=enjoy.enjoyId+1;
		}else{
			_enjoy.enjoyId=0;
		}

		_enjoy.save(function(err,enjoy){
			if (err) {
				console.log(err);
			}
						
			res.redirect('/enjoy/getEnjoy');		
		})
  	});
}

