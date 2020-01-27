const InterestCategory = require('../../classes/models-controllers/InterestCategory');
const { getErrorObject } = require('../../helpers/errors');

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    const interestCategory = await InterestCategory.getById(id);

    res.json(interestCategory);
  } catch (error) {
    throw getErrorObject('GENERAL_ERROR', 400, error);
  }
};
