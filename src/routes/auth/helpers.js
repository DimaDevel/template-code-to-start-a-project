const logger = require('../../helpers/logger');
const email = require('../../classes/Email');
const path = require('path');
const { getErrorObject } = require('../../helpers/errors');
const Token = require('../../classes/Token');
const RefreshToken = require('../../classes/models-controllers/RefreshToken');
const config = require('../../config/config');

function getTemplatePath(templateName) {
  return path.join(__dirname, '..', '..', 'templates', templateName);
}
// route that get req.user from passport middlewares and create JWT/refresh tokens for auth
async function socialAuth(req, res) {
  if (!req.user) throw getErrorObject('USER_NOT_AUTHENTICATED', 401);
  if (req.user.bannedAt) throw getErrorObject('USER_BANNED', 403);

  const token = Token.createIssueToken(req.user, '1d');
  logger.info('Social Auth, Token', token);

  const { refreshToken } = await RefreshToken.create({
    userId: req.user._id,
    token
  });

  logger.info('Social Auth, Refresh Token', refreshToken);

  res.send({
    token,
    refreshToken: refreshToken
  });
}

async function sendVerificationEmail(user, newToken) {
  const actionUrl = `${config.VERIFY_EMAIL_ACTION_URL}/${newToken}`;

  let userNameForTemplate = ` ${user.firstName}` || '';

  if (config.EMAIL_ENABLE) {
    return email.sendEmailWithTemplate({
      to: user.email,
      template: config.VERIFY_EMAIL_TEMPLATE,
      vars: {
        user_name: userNameForTemplate,
        action_url: actionUrl,
        product_url: config.INVITE_ACTION_URL
      }
    });
  }

  return null;
}

module.exports = {
  socialAuth,
  sendVerificationEmail,
  getTemplatePath
};
