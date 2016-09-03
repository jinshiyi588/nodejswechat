var mongoose = require('mongoose')
var TechSchema = require('../schemas/tech')
var Tech = mongoose.model('Tech', TechSchema)

module.exports = Tech