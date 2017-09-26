import express from 'express';
import passport from 'passport';
import collaboratorsCtrl from '../controllers/collaborators.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/collaborators - Get all */
  .get(collaboratorsCtrl.getAll)

  /** POST /api/collaborators - Create collaborator */
  .post(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    collaboratorsCtrl.createSingle(req, res, next);
  });

router.route('/:collaboratorId')
  /** GET /api/collaborators/:id - Get collaborator */
  .get(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    collaboratorsCtrl.getSingle(req, res, next);
  })

  /** PUT /api/collaborators/:id - Edit collaborator */
  .put(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    collaboratorsCtrl.editSingle(req, res, next);
  })

  /** DELETE /api/collaborators/:id - Delete collaborator */
  .delete(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    collaboratorsCtrl.removeSingle(req, res, next);
  });

router.param('collaboratorId', collaboratorsCtrl.loadSingle);

export default router;
