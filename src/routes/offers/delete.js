const error = require('debug')('app:error:offers/delete');
const Offer = require('./../../classes/models-controllers/Offer');
const { getErrorObject } = require('./../../helpers/errors');
const isOwner = require('./../../helpers/is-offer-owner');
const bugTracker = require('./../../classes/BugTracker');

module.exports = async (req, res) => {
  const { id } = req.params;
  await isOwner(id, req.user);
  try {
    const offer = await Offer.deleteById(id);

    res.json(offer);
  } catch (err) {
    error(err);
    bugTracker.captureException(err);
    throw getErrorObject('GENERAL_ERROR', 400, err);
  }
};
