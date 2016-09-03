var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AboutSchema = new Schema({
	aboutId: Number,
	title: String,
	content: String,
	picture: String,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()

		}
	}

});

AboutSchema.pre('save',function(next) {
	if (this.isNew ) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}

	next();

});

AboutSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById: function(id, cb) {
		return this
			.findOne({_id: id})
			.exec(cb)
	}
}

module.exports = AboutSchema