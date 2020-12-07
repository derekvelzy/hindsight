const model = require('../models/model.js');
const dateModel = require('../models/dateModel.js');

module.exports = {
  post: function(req, res) {
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

    var theDate = new Date().toLocaleDateString();
    dateModel.getDate((err, date) => {
      if (err) {
        console.log('error')
      } else if (date[0].date === theDate) {
        console.log('not neww', date, theDate);
        model.getAll((err, results) => {
          if (err) {
            console.log('error getting')
          } else {
            res.send(results);
          }
        })
      } else {
        console.log('neww', date, theDate);
        console.log('get all tickers')
        model.getAll((err, results) => {
          if (err) {
            console.log('error getting')
          } else {
            res.send(results);
          }
        })
      }
    });
  },

  getOne: function(req, res) {
    model.getOne(req.params.id, (err, results) => {
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
    model.updateStockData(req.body)
    .then(() => {
      console.log('hh')
    })
    // res.sendStatus(200);
  }
}