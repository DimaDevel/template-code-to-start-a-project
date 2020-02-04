const error = require('debug')('app:error:interest-category/create');
const InterestCategory = require('../../classes/models-controllers/InterestCategory');
const { getErrorObject } = require('../../helpers/errors');
const bugTracker = require('./../../classes/BugTracker');

module.exports = async (req, res) => {
  const { body } = req;

  try {
    const interestCategory = await InterestCategory.create(body);
    res.status(201).json(interestCategory);
  } catch (err) {
    error(err);
    bugTracker.captureException(err);
    throw getErrorObject('GENERAL_ERROR', 400, err);
  }
};
