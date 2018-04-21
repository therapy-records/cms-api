const express = require('express');
const tokenCtrl = require('../controllers/token.controller');
const authCtrl = require('../controllers/auth.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** POST /api/auth - Post for auth check */
  .post(tokenCtrl.checkToken);

router.route('/login')
  /** POST /api/auth/login - Post to get auth token */
  .post(authCtrl.createAuthToken);

module.exports = router;
