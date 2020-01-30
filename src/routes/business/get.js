const error = require('debug')('app:error:business/get');
const Business = require('../../classes/models-controllers/Business');
const { getErrorObject } = require('../../helpers/errors');
const bugTracker = require('./../../classes/BugTracker');

module.exports = async (req, res) => {
  const { query } = req;
  const queryFilter = query.filter || {};
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  try {
    const business = await Business.paginate(queryFilter, page, limit, query.sort);

    res.json(business);
  } catch (err) {
    error(err);
    bugTracker.captureException(err);
    throw getErrorObject('GENERAL_ERROR', 400, err);
  }
};
