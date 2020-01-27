const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();
const createOffer = require('./create');
const getOffersInRadius = require('./get-offers-in-radius');
const getOffers = require('./get');
const getById = require('./get-one');
const updateOffer = require('./update');
const deleteOffer = require('./delete');

router.get('/inRadius', asyncHandler(getOffersInRadius));
router.post('/', asyncHandler(createOffer));
router.get('/', asyncHandler(getOffers));
router.get('/:id', asyncHandler(getById));
router.patch('/:id', asyncHandler(updateOffer));
router.delete('/:id', asyncHandler(deleteOffer));

module.exports = router;
