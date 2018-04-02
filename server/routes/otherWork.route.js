import express from 'express';
import passport from 'passport';
import otherWorkCtrl from '../controllers/otherWork.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/other-work - Get all */
  .get(otherWorkCtrl.getAll)

  /** POST /api/other-work - Create other-work */
  .post(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    otherWorkCtrl.createSingle(req, res, next);
  });

router.route('/:otherWorkId')
  /** GET /api/other-work/:id - Get other-work */
  .get(otherWorkCtrl.getSingle)

  /** PUT /api/other-work/:id - Edit other-work */
  .put(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    otherWorkCtrl.editSingle(req, res, next);
  })

  /** DELETE /api/other-work/:id - Delete other-work */
  .delete(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    otherWorkCtrl.removeSingle(req, res, next);
  });

router.param('otherWorkId', otherWorkCtrl.loadSingle);

export default router;
