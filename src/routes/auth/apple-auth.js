const randomstring = require('randomstring');
const error = require('debug')('app:error:apple-auth');
const getAppleCruds = require('../../helpers/get-apple-cruds');
const User = require('../../models/User');
const { hash } = require('../../helpers/password');
const { getErrorObject } = require('../../helpers/errors');
const { socialAuth } = require('./helpers');
const bugTracker = require('./../../classes/BugTracker');


module.exports = async (req, res) => {
  const { body } = req;

  try {
    const { authCode, fullName } = body;
    // check is valid current auth code or not
    const { sub: appleId, email } = await getAppleCruds(authCode);

    const userEmail = email || appleId + '@user.com';
    const firstName = fullName.givenName || '';
    const lastName = fullName.familyName || '';

    let user = await User.findOne({ $or: [{ email: userEmail }, { appleId }] });

    if (user && !user.appleId) {
      user.appleId = appleId;
      await user.save();
    }

    if (!user && userEmail) {
      const newUser = new User({
        email: userEmail,
        password: await hash({ password: randomstring.generate(8) }),
        appleId,
        firstName,
        lastName,
      });

      user = await newUser.save();
    }

    return socialAuth({ user }, res);
  } catch (err) {
    error(err);
    bugTracker.captureException(err);
    throw getErrorObject('GENERAL_ERROR', 400, err);
  }
};
