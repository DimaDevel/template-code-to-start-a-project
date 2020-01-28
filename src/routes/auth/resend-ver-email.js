const error = require('debug')('app:error:resend-ver-email');
const User = require('../../classes/models-controllers/User');
const { getErrorObject } = require('../../helpers/errors');
const Token = require('../../classes/Token');
const { sendVerificationEmail } = require('./helpers');
const bugTracker = require('./../../classes/BugTracker');

module.exports = async (req, res) => {
  try {
    const user = await User.getById(req.user.userId);
    if (user.verifiedAt) throw getErrorObject('USER_ALREADY_VERIFIED', 400);

    const newToken = Token.createIssueToken(user, '1d');

    await sendVerificationEmail(user, newToken);

    res.json({
      message:
        'An email with further instructions has been sent to your email address'
    });
  } catch (err) {
    error(err);
    bugTracker.captureException(err);
    throw getErrorObject('GENERAL_ERROR', 400, err);
  }
};
