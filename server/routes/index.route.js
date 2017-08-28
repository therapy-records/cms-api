import express from 'express';
import authRoutes from './auth.route';
import newsRoutes from './news.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// router.use('/user', userRoutes);

router.use('/news', newsRoutes);

router.use('/auth', authRoutes);

export default router;
