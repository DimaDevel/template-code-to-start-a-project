const GoogleTokenStrategy = require("passport-token-google").Strategy;
const randomstring = require("randomstring");
const config = require("../config/config");
const User = require("../models/User");
const { hash } = require("../helpers/password");

module.exports = new GoogleTokenStrategy(
  {
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findOne({ $or: [{ email: profile._json.email }, { googleId: profile._json.sub }] });

      if (user) {
        if (!user.googleId && profile._json.sub) {
          user.googleId = profile._json.sub;
        }
        await user.save();

        return done(null, user);
      }

      const newUser = new User({
        email: profile._json.email,
        password: await hash({ password: randomstring.generate(8) }),
        googleId: profile._json.sub,
        firstName: profile._json.given_name,
        lastName: profile._json.family_name
      });

      await newUser.save()

      return done(null, newUser);
    } catch (error) {
      return done(error);
    }
  }
);
