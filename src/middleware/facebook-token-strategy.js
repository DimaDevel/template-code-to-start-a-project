const FacebookTokenStrategy = require('passport-facebook-token');
const randomstring = require('randomstring');
const config = require('../config/config');
const User = require('../models/User');
const { hash } = require('../helpers/password');

module.exports = new FacebookTokenStrategy(
  {
    clientID: config.FACEBOOK_CLIENT_ID,
    clientSecret: config.FACEBOOK_CLIENT_SECRET
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const userEmail = profile._json.email || `${profile._json.id}@user.com`;

      const user = await User.findOne({ $or: [{ email: userEmail }, { facebookId: profile._json.id }] });

      if (user) {
        if (!user.facebookId && profile._json.id) {
          user.facebookId = profile._json.id;
        }

        await user.save();

        return done(null, user);
      }

      const newUser = new User({
        email: userEmail,
        password: await hash({ password: randomstring.generate(8) }),
        facebookId: profile._json.id,
        firstName: profile._json.first_name,
        lastName: profile._json.last_name
      });

      await newUser.save();

      return done(null, newUser);
    } catch (error) {
      return done(error);
    }
  }
);
