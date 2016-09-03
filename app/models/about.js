var mongoose = require('mongoose')
var AboutSchema = require('../schemas/about')
var About = mongoose.model('About', AboutSchema)

module.exports = About