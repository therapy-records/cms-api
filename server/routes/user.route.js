import express from 'express';
// import validate from 'express-validation';
// import paramValidation from '../../config/param-validation';
// import userCtrl from '../controllers/user.controller';

const router = express.Router(); // eslint-disable-line new-cap

// router.route('/')
  /** POST /api/user - Create new user */
  // .post(validate(paramValidation.createUser), userCtrl.create);

// router.route('/:userId')
  /** GET /api/user/:userId - Get user */
  // .get(userCtrl.get);

  /** PUT /api/user/:userId - Update user */
  // .put(validate(paramValidation.updateUser), userCtrl.update)

  /** DELETE /api/user/:userId - Delete user */
  // .delete(userCtrl.remove);

/** Load user when API with userId route parameter is hit */
// router.param('userId', userCtrl.load);

export default router;
