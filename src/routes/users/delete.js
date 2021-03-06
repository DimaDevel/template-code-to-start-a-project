const error = require('debug')('app:error:users/delete');
const User = require('../../classes/models-controllers/User');
const { getErrorObject } = require('../../helpers/errors');
const bugTracker = require('./../../classes/BugTracker');

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.deleteById(id);

    res.json(user);
  } catch (err) {
    error(err);
    bugTracker.captureException(err);
    throw getErrorObject('GENERAL_ERROR', 400, err);
  }
};
