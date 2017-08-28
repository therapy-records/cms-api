import express from 'express';
import checkToken from '../controllers/token.controller';
import createAuthToken from '../controllers/auth.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** POST /api/auth - Post for auth check */
  .post(checkToken);

router.route('/login')
  /** POST /api/auth/login - Post to get auth token */
  .post(createAuthToken);

export default router;
