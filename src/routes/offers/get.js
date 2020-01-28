const error = require('debug')('app:error:offers/get');
const Offer = require('../../classes/models-controllers/Offer');
const { getErrorObject } = require('../../helpers/errors');
const bugTracker = require('./../../classes/BugTracker');

module.exports = async (req, res) => {
  const { query } = req;
  const queryFilter = query.filter || {};
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  try {
    const offers = await Offer.paginate(queryFilter, page, limit, query.sort);

    res.json(offers);
  } catch (err) {
    error(err);
    bugTracker.captureException(err);
    throw getErrorObject('GENERAL_ERROR', 400, err);
  }
};
