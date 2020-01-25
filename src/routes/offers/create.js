const Offer = require('../../classes/models-controllers/Offer');
const { getErrorObject } = require('../../helpers/errors');

module.exports = async (req, res) => {
  const { body } = req;

  try {
    const user = await Offer.create(body);

    res.json(user);
  } catch (error) {
    throw getErrorObject('GENERAL_ERROR', 400, error);
  }
};
