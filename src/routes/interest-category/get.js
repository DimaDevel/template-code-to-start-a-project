const InterestCategory = require('../../classes/models-controllers/InterestCategory');
const { getErrorObject } = require('../../helpers/errors');

module.exports = async (req, res) => {
  const { query } = req;
  const queryFilter = query.filter || {};
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  try {
    const interestCategory = await InterestCategory.paginate(queryFilter, page, limit, query.sort);

    res.json(interestCategory);
  } catch (error) {
    throw getErrorObject('GENERAL_ERROR', 400, error);
  }
};
