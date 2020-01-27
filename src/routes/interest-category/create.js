const InterestCategory = require('../../classes/models-controllers/InterestCategory');
const { getErrorObject } = require('../../helpers/errors');

module.exports = async (req, res) => {
  const { body } = req;

  try {
    const interestCategory = await InterestCategory.create(body);
    res.json(interestCategory);
  } catch (error) {
    throw getErrorObject('GENERAL_ERROR', 400, error);
  }
};
