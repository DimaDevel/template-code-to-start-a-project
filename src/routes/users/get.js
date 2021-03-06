const error = require('debug')('app:error:users/get');
const User = require('../../classes/models-controllers/User');
const { getErrorObject } = require('../../helpers/errors');
const bugTracker = require('./../../classes/BugTracker');

module.exports = async (req, res) => {
  const { query } = req;
  const queryFilter = query.filter || {};
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  try {
    const users = await User.paginate(queryFilter, page, limit, query.sort);

    res.json(users);
  } catch (err) {
    error(err);
    bugTracker.captureException(err);
    throw getErrorObject('GENERAL_ERROR', 400, err);
  }
};
