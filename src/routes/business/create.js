const error = require('debug')('app:error:business/create');
const Business = require('../../classes/models-controllers/Business');
const { getErrorObject } = require('../../helpers/errors');
const bugTracker = require('./../../classes/BugTracker');

module.exports = async (req, res) => {
  const { body } = req;

  try {
    const business = await Business.create(body);
    res.json(business);
  } catch (err) {
    error(err);
    bugTracker.captureException(err);
    throw getErrorObject('GENERAL_ERROR', 400, err);
  }
};
