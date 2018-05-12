const express = require('express');
const authRoutes = require('./auth.route');
const collaboratorsRoutes = require('./collaborators.route');
const newsRoutes = require('./news.route');
const pressRoutes = require('./press.route');
const otherWorkRoutes = require('./otherWork.route');
const userRoutes = require('./user.route');
const testRoutes = require('./test.route');

const router = express.Router(); // eslint-disable-line new-cap

router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);

router.use('/collaborators', collaboratorsRoutes);

router.use('/news', newsRoutes);

router.use('/press', pressRoutes);

router.use('/other-work', otherWorkRoutes);

router.use('/user', userRoutes);

router.use('/test', testRoutes);

module.exports = router;
