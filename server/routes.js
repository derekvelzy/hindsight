const router = require('express').Router();
const controller = require('../db/controller/controller.js');
// const dateController = require('../db/controller/dateController.js');

// routes
router.post('/requests', controller.post);

router.get('/requests', controller.get);

// router.put('/requests', controller.put);

router.patch('/requests', controller.patch);  // Updates the total shares

// router.patch('/updates', controller.update);

// router.patch('/date', dateController.patch);

// router.get('/date', dateController.get);

// // only meant to insert initial date through postman
// router.post('/date', dateController.post);

router.get('/next', (req, res) => {
  res.redirect('/qwerty')
})

module.exports = router;
