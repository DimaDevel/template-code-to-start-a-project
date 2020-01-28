const error = require('debug')('app:error:interest-category/update');
const InterestCategory = require('./../../classes/models-controllers/InterestCategory');
const { getErrorObject } = require('./../../helpers/errors');
const bugTracker = require('./../../classes/BugTracker');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  
  if (Object.keys(body).length === 0) throw getErrorObject('BODY_IS_NULL', 400);

  try {
    const updatedInterestCategory = await InterestCategory.update(id, body);
    res.json(updatedInterestCategory);
  } catch (err) {
    error(err);
    bugTracker.captureException(err);
    throw getErrorObject('GENERAL_ERROR', 400, err);
  }
};
