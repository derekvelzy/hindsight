var mongoose = require('mongoose');

var Contents = mongoose.Schema({
  date: String,
  cost: Number
})

var StockSchema = mongoose.Schema({
  ticker: String,
  name: String,
  shares: Number,
  data: [[Contents]]
})

module.exports = mongoose.model('StockModel', StockSchema);