import express from 'express';
import authRoutes from './auth.route';
import collaboratorsRoutes from './collaborators.route';
import newsRoutes from './news.route';
import pressRoutes from './press.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);

router.use('/collaborators', collaboratorsRoutes);

router.use('/news', newsRoutes);

router.use('/press', pressRoutes);

// router.use('/user', userRoutes);

export default router;
