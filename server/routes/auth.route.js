import express from 'express';
// import validate from 'express-validation';
// import expressJwt from 'express-jwt';
import authCtrl from '../controllers/auth.controller';
// import config from '../../config/env';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** POST /api/auth - Post for auth check */
  .post(authCtrl.getAuthToken);

/** GET /api/auth/random-number - Protected route,
 * needs token returned by the above as header. Authorization: Bearer {token} */
// router.route('/random-number')
//   .get(expressJwt({ secret: config.secret }), authCtrl.getRandomNumber);

export default router;
