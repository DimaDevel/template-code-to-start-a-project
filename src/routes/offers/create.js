const error = require('debug')('app:error:offers/create');
const Offer = require('../../classes/models-controllers/Offer');
const { getErrorObject } = require('../../helpers/errors');
const bugTracker = require('./../../classes/BugTracker');

module.exports = async (req, res) => {
  const { body } = req;

  try {
    const user = await Offer.create(body);

    res.json(user);
  } catch (err) {
    error(err);
    bugTracker.captureException(err);
    throw getErrorObject('GENERAL_ERROR', 400, err);
  }
};
