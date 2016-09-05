var Tech = require('../app/models/tech');
var fs = require("fs");


exports.getTech = function(req, res) {

	Tech.findOne({}, null, {sort: {techId: -1 }}, function(err, tech){
		if(err) console.log(err);

		var abPath=__dirname;
		var lastIndex = abPath.lastIndexOf('/');
		if(lastIndex==-1){
			lastIndex = abPath.lastIndexOf('\\');
		}
		abPath=abPath.substring(0, lastIndex);
		//console.log(abPath);

		fs.readFile(abPath+tech.path, function (err, data) {
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

}

exports.newTech = function(req, res){
	res.render('addTech',{
			tech: {},
		});
}

exports.add = function(req, res){
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
}

