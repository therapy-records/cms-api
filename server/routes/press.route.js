const express = require('express');
const passport = require('passport');
const pressCtrl = require('../controllers/press.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/press - Get all */
  .get(pressCtrl.getAll)

  /** POST /api/press - Create press */
  .post(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    pressCtrl.createSingle(req, res, next);
  });

router.route('/:pressId')
  /** GET /api/press/:id - Get press */
  .get(pressCtrl.getSingle)

  /** PUT /api/press/:id - Edit press */
  .put(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    pressCtrl.editSingle(req, res, next);
  })

  /** DELETE /api/press/:id - Delete press */
  .delete(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    pressCtrl.removeSingle(req, res, next);
  });

router.param('pressId', pressCtrl.loadSingle);

module.exports = router;
