const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();
const signUrl = require('./sign-url');

router.post('/sign-url', asyncHandler(signUrl));

module.exports = router;
