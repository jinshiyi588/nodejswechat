var fs = require("fs");

/* GET users listing. */
exports.log = function(req, res, next) {
	fs.readFile('./log.txt', function (err, data) {
   		if (err) {
       		return console.error(err);
   		}
   		console.log("File data: " + data.toString());
   		res.send(data.toString());
	});
}