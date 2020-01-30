const error = require('debug')('app:error:business/update');
const Business = require('./../../classes/models-controllers/Business');
const { getErrorObject } = require('./../../helpers/errors');
const bugTracker = require('./../../classes/BugTracker');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  
  if (Object.keys(body).length === 0) throw getErrorObject('BODY_IS_NULL', 400);

  try {
    const updatedBusiness = await Business.update(id, body);
    res.json(updatedBusiness);
  } catch (err) {
    error(err);
    bugTracker.captureException(err);
    throw getErrorObject('GENERAL_ERROR', 400, err);
  }
};
