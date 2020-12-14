const router = require('express').Router();
const controller = require('../db/controller/controller.js');
const dateController = require('../db/controller/dateController.js');
const sentiment = require('../db/controller/sentiments.js');

// routes
router.post('/requests', controller.post);

router.get('/requests', controller.get);

router.put('/requests', controller.put);

router.patch('/requests', controller.patch);  // Updates the total shares

router.get('/one/:id', controller.getOne);

router.get('/twitter/:ticker', sentiment.twitter);

router.post('/polygon/:ticker', sentiment.polygon);

// router.patch('/updates', controller.update);

// // only meant to insert initial date through postman
// router.post('/date', dateController.post);

router.get('/next', (req, res) => {
  res.redirect('/qwerty')
})

module.exports = router;
