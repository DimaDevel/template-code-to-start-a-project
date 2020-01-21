const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();
const bind = require('./bind');
const unbind = require('./unbind');
const types = require('./device-types');

router.post('/me', asyncHandler(bind));
router.delete('/me/:deviceId', asyncHandler(unbind));
router.get('/types', asyncHandler(types));

module.exports = router;
