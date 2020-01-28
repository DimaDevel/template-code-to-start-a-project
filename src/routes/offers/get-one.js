const error = require('debug')('app:error:offers/get-one');
const Offer = require('../../classes/models-controllers/Offer');
const { getErrorObject } = require('../../helpers/errors');
const bugTracker = require('./../../classes/BugTracker');

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    const offer = await Offer.getById(id);

    res.json(offer);
  } catch (err) {
    error(err);
    bugTracker.captureException(err);
    throw getErrorObject('GENERAL_ERROR', 400, err);
  }
};
