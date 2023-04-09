const express = require('express');
const passport = require('passport');
const journalismCtrl = require('../controllers/journalism.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/journalism - Get all journalism articles */
  .get(journalismCtrl.getAll)

  /** POST /api/journalism - Create journalism */
  .post(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    journalismCtrl.createSingle(req, res, next);
  });

router.route('/category/:categoryId')
  /** GET /api/journalism/category/:categoryId - Get journalism articles by category ID */
  .get(journalismCtrl.getAllByCategoryId);

router.route('/:journalismId')
  /** GET /api/journalism/:id - Get journalism */
  .get(journalismCtrl.getSingle)

  /** PUT /api/journalism/:id - Edit journalism */
  .put(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    journalismCtrl.editSingle(req, res, next);
  })

  /** DELETE /api/journalism/:id - Delete journalism */
  .delete(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    journalismCtrl.removeSingle(req, res, next);
  });

router.param('journalismId', journalismCtrl.loadSingle);

module.exports = router;
