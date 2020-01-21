const User = require('../../classes/models-controllers/User');
const config = require('../../config/config');
const email = require('../../classes/Email');
const { getErrorObject } = require('../../helpers/errors');
const Token = require('../../classes/Token');

module.exports = async (req, res) => {
  const { body } = req;
  const tokenExpiresIn = '30min';
  const tokenExpiresInForTemplate = '30 minutes';

  try {
    const user = await User.getOne({
      email: body.email
    });

    const actionUrl = `${
      config.FORGOT_PASSWORD_ACTION_URL
    }/${Token.createIssueToken(user, tokenExpiresIn)}`;

    let userNameForTemplate = '';
    if (user.firstName) {
      userNameForTemplate = ` ${user.firstName}`;
    }

    if (config.EMAIL_ENABLE) {
      await email.sendEmailWithTemplate({
        to: body.email,
        template: config.FORGOT_PASSWORD_TEMPLATE,
        vars: {
          user_name: userNameForTemplate,
          action_url: actionUrl,
          expires_in: tokenExpiresInForTemplate
        }
      });
    }

    res.json({
      message:
        'An email with further instructions has been sent to your email address'
    });
  } catch (error) {
    throw getErrorObject('GENERAL_ERROR', 400, error);
  }
};
