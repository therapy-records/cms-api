import express from 'express';
import collaboratorsCtrl from '../controllers/collaborators.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/collaborators - Get all */
  .get(collaboratorsCtrl.getAll);

router.route('/:collaboratorId')
  /** GET /api/collaborators/:id - Get collaborator */
  .get(collaboratorsCtrl.getSingle)

  /** PUT /api/collaborators/:id - Edit collaborator */
  .put(collaboratorsCtrl.editSingle)

  /** DELETE /api/collaborators/:id - Delete collaborator */
  .delete(collaboratorsCtrl.removeSingle);

router.param('collaboratorId', collaboratorsCtrl.loadSingle);

export default router;
