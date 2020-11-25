var mongoose = require('mongoose');

var DateSchema = mongoose.Schema({
  date: String
})

module.exports = mongoose.model('DateModel', DateSchema);