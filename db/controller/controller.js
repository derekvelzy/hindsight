const model = require('../models/model.js');
const dateModel = require('../models/dateModel.js');
const axios = require('axios');
const apiKey = "721H17JOIS0DYUYS";

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
      // console.log('date!!!!!!', date)
      if (err) {
        res.sendStatus(400);
      } else if (date[0].date === theDate) {
        // console.log('not neww', date, theDate);
        model.getAll((err, results) => {
          if (err) {
            res.sendStatus(400);
          } else {
            res.send(results);
          }
        })
      } else {
        dateModel.updateDate(theDate, (err) => {
          if (err) {
            throw err;
          } else {
            model.getAll(async (err, results) => {
              if (err) {
                res.sendStatus(400);
              } else {
                for (const result of results) {
                  await axios({
                    method: "get",
                    url: `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${result.ticker}&outputsize=compact&apikey=${apiKey}`,
                  }).then((data) => {
                    const coords = [];
                    for (const key in data["data"]["Time Series (Daily)"]) {
                      coords.unshift({
                        date: key,
                        cost: data["data"]["Time Series (Daily)"][key]["4. close"],
                      });
                    }
                    return { ticker: result.ticker, data: coords };
                  }).then((newData) => {
                    model.updateStockData(newData)
                    // console.log('new data', newData)
                  });
                }
                console.log('lastly...');
                model.getAll((err, results) => {
                  if (err) {
                    res.sendStatus(400);
                  } else {
                    res.send(results);
                  }
                })
              }
            })
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
  },
}