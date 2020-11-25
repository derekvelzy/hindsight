var model = require('../models/model.js')

module.exports = {
  post: function(req, res) {
    console.log(req.body)
    model.addStock(req.body, (err) => {
      if (err) {
        console.log('error posting')
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    })
  },

  get: function(req, res) {
    model.getAll((err, results) => {
      if (err) {
        console.log('error getting')
      } else {
        res.send(results);
      }
    })
  },

  put: function(req, res) {
    model.removeOne(req.body, (err) => {
      if (err) {
        console.log('error deleting one');
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    })
  },

  patch: function(req, res) {
    model.updateShares(req.body, (err) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    })
  },

  update: function(req, res) {
    model.updateStockData(req.body);
    res.sendStatus(200);
  }
}