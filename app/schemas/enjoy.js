var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EnjoySchema = new Schema({
	enjoyId: Number,
	author: String,
	title: String,
	content: String,
	picture: String,
	link: String,
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

EnjoySchema.pre('save',function(next) {
	if (this.isNew ) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}

	next();

});

EnjoySchema.statics = {
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

module.exports = EnjoySchema