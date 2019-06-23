const express = require('express');
const testCtrl = require('../controllers/test.controller');

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

router.route('/journalism')
  /** DELETE /api/test/journalism */
  .delete(testCtrl.deleteAllJournalism);

module.exports = router;
