const error = require('debug')('app:error:business/delete');
const Business = require('./../../classes/models-controllers/Business');
const { getErrorObject } = require('./../../helpers/errors');
const bugTracker = require('./../../classes/BugTracker');

module.exports = async (req, res) => {
  const { id } = req.params;
  
  try {
    const business = await Business.deleteById(id);

    res.json(business);
  } catch (err) {
    error(err);
    bugTracker.captureException(err);
    throw getErrorObject('GENERAL_ERROR', 400, err);
  }
};
