const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();
const createUser = require('./create');
const getUsers = require('./get');
const getById = require('./get-one');
const updateUser = require('./update');
const deleteUser = require('./delete');
const ban = require('./ban');
const unban = require('./unban');
const getMe = require('./get-me');
const updateMe = require('./update-me');
const getUsersInRadius = require('./get-users-in-radius');

router.get('/inRadius', asyncHandler(getUsersInRadius));
router.get('/me', asyncHandler(getMe));
router.patch('/me', asyncHandler(updateMe));
router.post('/', asyncHandler(createUser));
router.get('/', asyncHandler(getUsers));
router.get('/:id', asyncHandler(getById));
router.patch('/:id', asyncHandler(updateUser));
router.delete('/:id', asyncHandler(deleteUser));
router.post('/:id/ban', asyncHandler(ban));
router.post('/:id/unban', asyncHandler(unban));

module.exports = router;
