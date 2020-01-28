const error = require('debug')('app:error:interest-category/delete');
const InterestCategory = require('./../../classes/models-controllers/InterestCategory');
const { getErrorObject } = require('./../../helpers/errors');
const bugTracker = require('./../../classes/BugTracker');

module.exports = async (req, res) => {
  const { id } = req.params;
  
  try {
    const interestCategory = await InterestCategory.deleteById(id);

    res.json(interestCategory);
  } catch (err) {
    error(err);
    bugTracker.captureException(err);
    throw getErrorObject('GENERAL_ERROR', 400, err);
  }
};
