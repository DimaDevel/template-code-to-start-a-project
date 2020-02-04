const error = require('debug')('app:error:offers/create');
const { Types } = require('mongoose');
const Offer = require('../../classes/models-controllers/Offer');
const { getErrorObject } = require('../../helpers/errors');
const bugTracker = require('./../../classes/BugTracker');

module.exports = async (req, res) => {
  const { body } = req;

  try {
    body.ownerId = Types.ObjectId(req.user.userId);
    const offer = await Offer.create(body);

    res.status(201).json(offer);
  } catch (err) {
    error(err);
    bugTracker.captureException(err);
    throw getErrorObject('GENERAL_ERROR', 400, err);
  }
};
