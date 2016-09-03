var mongoose = require('mongoose')
var EnjoySchema = require('../schemas/enjoy')
var Enjoy = mongoose.model('Enjoy', EnjoySchema)

module.exports = Enjoy