const error = require('debug')('app:error:offers/update');
const Offer = require('./../../classes/models-controllers/Offer');
const { getErrorObject } = require('./../../helpers/errors');
const isOwner = require('./../../helpers/is-offer-owner');
const bugTracker = require('./../../classes/BugTracker');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  
  if (Object.keys(body).length === 0) throw getErrorObject('BODY_IS_NULL', 400);
  await isOwner(id, req.user);

  try {
    const updatedOffer = await Offer.update(id, body);
    res.json(updatedOffer);
  } catch (err) {
    error(err);
    bugTracker.captureException(err);
    throw getErrorObject('GENERAL_ERROR', 400, err);
  }
};
