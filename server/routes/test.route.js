import express from 'express';
import testCtrl from '../controllers/test.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/news')
  /** DELETE /api/test/news */
  .delete(testCtrl.deleteAllNewsArticles);

router.route('/collaborators')
  /** DELETE /api/test/collaborators */
  .delete(testCtrl.deleteAllCollaborators);

router.route('/press')
  /** DELETE /api/test/press */
  .delete(testCtrl.deleteAllPress);

router.route('/other-work')
  /** DELETE /api/test/other-work */
  .delete(testCtrl.deleteAllOtherWork);

export default router;
