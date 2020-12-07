var model = require('../models/dateModel.js')

module.exports = {
  get: function(req, res) {
    model.getDate((err, results) => {
      if (err) {
        console.log('error getting date')
      } else {
        res.send(results);
      }
    })
  },

  patch: function(req, res) {
    model.updateDate(req.body, (err) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    })
  },

  post: function(req, res) {
    console.log(req.body, new Date().toLocaleDateString(), req.body.date === new Date().toLocaleDateString())
    model.createDate(req.body, (err) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    })
  }
}