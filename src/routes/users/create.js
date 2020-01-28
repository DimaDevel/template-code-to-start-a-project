const error = require('debug')('app:error:users/create');
const User = require('../../classes/models-controllers/User');
const { getErrorObject } = require('../../helpers/errors');
const bugTracker = require('./../../classes/BugTracker');

module.exports = async (req, res) => {
  const { body } = req;

  try {
    const user = await User.create(body);

    res.json(user);
  } catch (err) {
    error(err);
    bugTracker.captureException(err);
    throw getErrorObject('GENERAL_ERROR', 400, err);
  }
};
