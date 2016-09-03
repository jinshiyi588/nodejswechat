var express = require('express');
var router = express.Router();
var Fun = require('../app/models/fun');

var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload/fun')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+"-"+file.originalname)
  }
})

var upload = multer({ storage: storage })


/* GET users listing. */
router.get('/getFun', function(req, res) {

	Fun.findOne({}, null, {sort: {funId: -1 }}, function(err, fun){
		if(err) console.log(err);
		res.render('fun',{
			fun: fun
		})
	});
});

router.get('/newFun', function(req, res){
	res.render('addFun',{
			fun: {},
		});
})

router.post('/add', upload.single("picUpload"), function(req, res){
	var funObj =req.body.fun;
	
	if(req.file){
		funObj.picture="/upload/enjoy/"+req.file.filename;
	}	

	var _fun =new Fun(funObj);
	
	Fun.findOne({})
		.sort('-funId')  // give me the max
  		.exec(function (err, fun) {
		if(err) console.log(err);

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
})

router.get('/getMusic', function(req, res, next) {
	res.send('respond with a resource');
});

module.exports = router;
