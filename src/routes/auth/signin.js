const logger = require('../../helpers/logger');
const User = require('../../classes/models-controllers/User');
const passwordHelper = require('../../helpers/password');
const { getErrorObject } = require('../../helpers/errors');
const Token = require('../../classes/Token');
const issueRefreshToken = require('../../classes/models-controllers/RefreshToken');

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
  } catch (error) {
    throw getErrorObject('GENERAL_ERROR', 400, error);
  }
};
