var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hindsight', {useNewUrlParser: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('~~~ connected to mongo database ~~~')
})

module.exports = db;