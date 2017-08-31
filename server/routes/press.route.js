import express from 'express';
// import validate from 'express-validation';
// import passport from 'passport';
// import paramValidation from '../../config/param-validation';
import pressCtrl from '../controllers/press.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/press - Get all articles */
  .get(pressCtrl.getAllArticles);

export default router;
