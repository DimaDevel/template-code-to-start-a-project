const InterestCategory = require('./../../classes/models-controllers/InterestCategory');
const { getErrorObject } = require('./../../helpers/errors');

module.exports = async (req, res) => {
  const { id } = req.params;
  
  try {
    const interestCategory = await InterestCategory.deleteById(id);

    res.json(interestCategory);
  } catch (err) {
    throw getErrorObject('GENERAL_ERROR', 400, err);
  }
};
