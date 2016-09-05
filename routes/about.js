var express = require('express');
var router = express.Router();
var About = require('../app/models/about');



/* GET users listing. */
exports.getAbout = function(req, res) {

	About.findOne({}, null, {sort: {aboutId: -1 }}, function(err, about){
		if(err) console.log(err);
		res.render('about',{
			about: about
		})
	});
}

exports.newAbout = function(req, res){
	res.render('addAbout',{
			about: {},
		});
}

exports.add = function(req, res){
	var aboutObj =req.body.about;
	
	if(req.file){
		aboutObj.picture="/upload/"+req.file.filename;
	}	

	var _about =new About(aboutObj);
	
	About.findOne({})
		.sort('-aboutId')  // give me the max
  		.exec(function (err, about) {
		if(err) console.log(err);

		if(about){
			_about.aboutId=about.aboutId+1;
		}else{
			_about.aboutId=0;
		}

		_about.save(function(err,about){
			if (err) {
				console.log(err);
			}
						
			res.redirect('/about/getAbout');		
		})
  	});
}

