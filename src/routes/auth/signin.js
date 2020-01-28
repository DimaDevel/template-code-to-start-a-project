const error = require('debug')('app:error:signin');
const User = require('../../classes/models-controllers/User');
const passwordHelper = require('../../helpers/password');
const { getErrorObject } = require('../../helpers/errors');
const Token = require('../../classes/Token');
const issueRefreshToken = require('../../classes/models-controllers/RefreshToken');
const bugTracker = require('./../../classes/BugTracker');

module.exports = async (req, res) => {
  const { body } = req;

  try {
    const user = await User.getOne({ email: body.email });

    if (user.bannedAt) throw getErrorObject('USER_BANNED', 403);

    const match = await passwordHelper.match({
      password: body.password,
      hashString: user.password
    });
    if (!match) throw getErrorObject('CREDENTIALS_NOT_VALID', 401);

    const token = Token.createIssueToken(user, '1d');

    const { refreshToken } = await issueRefreshToken.create({
      userId: user._id,
      token
    });

    res.json({ token, refreshToken });
  } catch (err) {
    error(err);
    bugTracker.captureException(err);
    throw getErrorObject('GENERAL_ERROR', 400, err);
  }
};
