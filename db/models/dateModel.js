var DateModel = require('../schema/dateSchema.js')

module.exports = {
  getDate: function(callback) {
    DateModel.find((err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    })
  },

  updateDate: function(theDate, callback) {
    console.log(theDate, 'in the model');
    DateModel.findOneAndUpdate({}, {date: theDate}, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    })
  },

  createDate: function(date, callback) {
    console.log("the day:", date.date);
    var createDate = new DateModel({
      date: date.date
    })

    createDate.save(err => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    })
  }
}