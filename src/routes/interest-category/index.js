const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();
const create = require('./create');
const get = require('./get');
const getById = require('./get-one');
const update = require('./update');
const deleteDoc = require('./delete');

router.post('/', asyncHandler(create));
router.get('/', asyncHandler(get));
router.get('/:id', asyncHandler(getById));
router.patch('/:id', asyncHandler(update));
router.delete('/:id', asyncHandler(deleteDoc));

module.exports = router;
