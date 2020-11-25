var StockModel = require('../schema/mongoSchema.js')

module.exports = {
  addStock: function(stock, callback) {
    var post = new StockModel({
      ticker: stock.ticker,
      name: stock.name,
      shares: stock.shares,
      data: stock.data
    })
    post.save(err => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    })
  },

  getAll: function(callback) {
    StockModel.find((err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    })
  },

  removeOne: function(stock, callback) {
    StockModel.deleteOne({ticker: stock.ticker}, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    })
  },

  updateShares: function(shares, callback) {
    StockModel.findOneAndUpdate({ticker: shares.ticker}, {shares: shares.amount}, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    })
  },

  updateStockData: function(data) {
    StockModel.findOneAndUpdate({ticker: data.ticker}, {data: data.data}, (err) => {
      if (err) {
        console.log('error updating stock data in db')
      } else {
        console.log('successfully updated stock data to db')
      }
    });
  }
}