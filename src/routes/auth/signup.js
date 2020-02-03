const error = require('debug')('app:error:signup');
const config = require('../../config/config');
const User = require('../../classes/models-controllers/User');
const { getErrorObject } = require('../../helpers/errors');
const Token = require('../../classes/Token');
const RefreshToken = require('../../classes/models-controllers/RefreshToken');
const { sendVerificationEmail } = require('./helpers');
const bugTracker = require('./../../classes/BugTracker');

module.exports = async (req, res) => {
  const { body } = req;

  try {
    // deleting restricted props for user self setted, like role
    User.deleteDisallowedProps(body);
    const user = await User.create(body);

    // generating JWT token for auth
    const newToken = Token.createIssueToken(user, '1d');

    // generating refresh token for creating new JWT token if current JWT token expired
    const { refreshToken } = await RefreshToken.create({
      userId: user._id,
      token: newToken
    });

    if (config.EMAIL_ENABLE) {
      await sendVerificationEmail(user, newToken);
    }

    res
      .status(201)
      .json({ token: newToken, refreshToken });
  } catch (err) {
    error(err);
    bugTracker.captureException(err);
    throw getErrorObject('GENERAL_ERROR', 400, err);
  }
};
