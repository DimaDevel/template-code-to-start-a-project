const error = require('debug')('app:error:users/get-users-in-radius');
const createError = require('http-errors');
const User = require('../../classes/models-controllers/User');
const { getErrorObject } = require('../../helpers/errors');
const { systemCodes } = require('./../../enums/errors');
const bugTracker = require('./../../classes/BugTracker');

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
    const users = await User.getUsersInRadius(longitude, latitude, radius, { page, limit });

    res.json(users);
  } catch (err) {
    error(err);
    bugTracker.captureException(err);
    throw getErrorObject('GENERAL_ERROR', 400, err);
  }
};
