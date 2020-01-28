const createError = require('http-errors');
const error = require('debug')('app:error:forgot-password-by-token');
const User = require('../../classes/models-controllers/User');
const verifyToken = require('../../helpers/verify-token');
const { getErrorObject } = require('../../helpers/errors');
const { systemCodes } = require('./../../enums/errors');
const bugTracker = require('./../../classes/BugTracker');

module.exports = async (req, res) => {
  const { body } = req;
  const { userToken } = req.params;

  try {
    const decodedToken = verifyToken(userToken);
    if (!decodedToken) throw createError(400, systemCodes.TOKEN_INVALID);

    const user = await User.getById(decodedToken.userId);

    if (!body || !body.password) throw createError(400, systemCodes.PASSWORD_NOT_VALID);
    if (body.password !== body.confirm) throw createError(400, systemCodes.PASSWORD_NOT_VALID);
    user.password = body.password;
    await user.save();

    res.send({ message: 'New password has been set successfully.' });
  } catch (err) {
    error(err);
    bugTracker.captureException(err);
    throw getErrorObject('GENERAL_ERROR', 400, err);
  }
};
