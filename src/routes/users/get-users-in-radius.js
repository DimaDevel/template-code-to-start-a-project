const createError = require('http-errors');
const User = require('../../classes/models-controllers/User');
const { getErrorObject } = require('../../helpers/errors');
const { systemCodes } = require('./../../enums/errors');

module.exports = async (req, res) => {
  const { query } = req;
  const longitude = Number(query.longitude);
  if (!longitude) throw createError(400, systemCodes.LONGITUDE_NOT_VALID);
  const latitude = Number(query.latitude);
  if (!latitude) throw createError(400, systemCodes.LATITUDE_NOT_VALID);
  const radius = Number(query.radius);
  if (!radius) throw createError(400, systemCodes.RADIUS_NOT_VALID);
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  try {
    const users = await User.getUsersByGeoCoordinates(longitude, latitude, radius, { page, limit });

    res.json(users);
  } catch (error) {
    throw getErrorObject('GENERAL_ERROR', 400, error);
  }
};
