const express = require('express');
const logger = require('../helpers/logger');
const router = express.Router();

//routes
const authRoutes = require('./auth');
const usersRoutes = require('./users');
const devicesRoutes = require('./devices');
// commented while not inited s3
// const mediaRoutes = require('./media');

//routes init
router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/devices', devicesRoutes);
// router.use('/media', mediaRoutes);

//init route for debug info from client
router.post('/debug', (req, res, next) => {
  logger.error('___________DEBUG INFO FROM THE CLIENT___________', req.body);
  res.status(200).json({ success: true });
});

module.exports = router;
