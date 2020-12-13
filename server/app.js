const express = require('express');
const parser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

// eslint-disable-next-line no-unused-vars
const db = require('../db/mongoDB.js');
const router = require('./routes.js');

const app = express();
app.use(morgan('dev'));
app.use(parser.json());

app.set('port', 8020);

app.use('/', express.static(path.join(__dirname, '/../client/dist')), router);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'))
})

app.listen(app.get('port'), (err) => {
  if (err) {
    console.log('error connecting to server');
  } else {
    console.log(`>>> Listening on port ${app.get('port')} <<<`);
  }
});
