var express = require('express');
var router = express.Router();
var Tech = require('../app/models/tech');
var fs = require("fs");


router.get('/getTech', function(req, res) {

	Tech.findOne({}, null, {sort: {techId: -1 }}, function(err, tech){
		if(err) console.log(err);


		fs.readFile('.'+tech.path, function (err, data) {
   			if (err) {
       			return console.error(err);
   			}
   			//console.log("File data: " + data.toString());

   			var showdown  = require('showdown'),
    			converter = new showdown.Converter(),
    			html      = converter.makeHtml(data.toString());

    		//console.log('html:'+html);
    		tech.content = html;
    		//console.log('tech.content\:'+tech.content);

			res.render('tech',{
				tech: tech
			})
		});
	});

	
});

router.get('/newTech', function(req, res){
	res.render('addTech',{
			tech: {},
		});
})

router.post('/add', function(req, res){
	var techObj =req.body.tech;

	console.log('author'+techObj.author);
	var _tech =new Tech(techObj);
	
	Tech.findOne({})
		.sort('-techId')  // give me the max
  		.exec(function (err, tech) {
		if(err) console.log(err);

		if(tech){
			_tech.techId=tech.techId+1;
		}else{
			_tech.techId=0;
		}

		_tech.save(function(err,tech){
			if (err) {
				console.log(err);
			}
						
			res.redirect('/tech/getTech');		
		})
  	});
})

module.exports = router;