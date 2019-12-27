const express = require('express');
const passport = require('passport');
const gigsCtrl = require('../controllers/gigs.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/gigs - Get all */
  .get(gigsCtrl.getAll)

  /** POST /api/gigs - Create gig */
  .post(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    gigsCtrl.createSingle(req, res, next);
  });

router.route('/:gigId')
  /** GET /api/gigs/:id - Get gig */
  .get(gigsCtrl.getSingle)

  /** PUT /api/gigs/:id - Edit gig */
  .put(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    gigsCtrl.editSingle(req, res, next);
  })

  /** DELETE /api/gigs/:id - Delete gig */
  .delete(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    gigsCtrl.removeSingle(req, res, next);
  });

router.param('gigId', gigsCtrl.loadSingle);

module.exports = router;
