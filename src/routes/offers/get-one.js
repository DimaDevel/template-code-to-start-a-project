const Offer = require('../../classes/models-controllers/Offer');
const { getErrorObject } = require('../../helpers/errors');

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    const offer = await Offer.getById(id);

    res.json(offer);
  } catch (error) {
    throw getErrorObject('GENERAL_ERROR', 400, error);
  }
};
