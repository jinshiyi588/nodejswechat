var mongoose = require('mongoose')
var FunSchema = require('../schemas/fun')
var Fun = mongoose.model('Fun', FunSchema)

module.exports = Fun