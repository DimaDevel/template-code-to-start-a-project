const createError = require('http-errors');
const Offer = require('./../../classes/models-controllers/Offer');
const { getErrorObject } = require('./../../helpers/errors');
const isOwner = require('./../../helpers/is-owner');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  let offer;
  
  if (Object.keys(body).length === 0) throw getErrorObject('BODY_IS_NULL', 400);
  await isOwner(id, req.user);

  if (!req.user && req.user.userId.toString() !== offer.owner.toString()) throw createError(403, 'Only offer creator can modify.');

  try {
    const updatedOffer = await Offer.update(id, body);
    res.json(updatedOffer);
  } catch (err) {
    throw getErrorObject('GENERAL_ERROR', 400, err);
  }
};
