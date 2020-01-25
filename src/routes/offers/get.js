const Offer = require('../../classes/models-controllers/Offer');
const { getErrorObject } = require('../../helpers/errors');

module.exports = async (req, res) => {
  const { query } = req;
  const queryFilter = query.filter || {};
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  try {
    const offers = await Offer.paginate(queryFilter, page, limit, query.sort);

    res.json(offers);
  } catch (error) {
    throw getErrorObject('GENERAL_ERROR', 400, error);
  }
};
