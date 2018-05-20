const express = require('express');
// const validate = require('express-validation');
// const paramValidation = require('../../config/param-validation');
const userCtrl = require('../controllers/user.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** POST /api/user - Create new user */
  // .post(validate(paramValidation.createUser), userCtrl.create);
  .post(userCtrl.create);

router.route('/:userId')
  /** GET /api/user/:userId - Get user */
  // .get(userCtrl.get)

  /** DELETE /api/user/:userId - Delete user */
  .delete(userCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', userCtrl.load);

module.exports = router;
