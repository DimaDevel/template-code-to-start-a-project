const createError = require('http-errors');
const { getErrorObject } = require('./errors');
const Offer = require('./../classes/models-controllers/Offer');
const bugTracker = require('./../classes/BugTracker');

module.exports = async (offerId, user) => {
  let offer;
  try {
    offer = await Offer.getById(offerId);
  } catch (err) {
    bugTracker.captureException(err);
    throw getErrorObject('GENERAL_ERROR', 400, err);
  }

  if (user.userId.toString() !== offer.ownerId.toString()) throw createError(403, 'Only offer creator can modify.');
};
