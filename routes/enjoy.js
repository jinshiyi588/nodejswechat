var express = require('express');
var router = express.Router();
var Enjoy = require('../app/models/enjoy');

var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload/enjoy')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+"-"+file.originalname)
  }
})

var upload = multer({ storage: storage })


/* GET users listing. */
router.get('/getEnjoy', function(req, res) {

	Enjoy.findOne({}, null, {sort: {enjoyId: -1 }}, function(err, enjoy){
		if(err) console.log(err);
		res.render('enjoy',{
			enjoy: enjoy
		})
	});
});

router.get('/newEnjoy', function(req, res){
	res.render('addEnjoy',{
			enjoy: {},
		});
})

router.post('/add', upload.single("picUpload"), function(req, res){
	var enjoyObj =req.body.enjoy;
	
	if(req.file){
		enjoyObj.picture="/upload/enjoy/"+req.file.filename;
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
})


module.exports = router;
