const express = require('express');
const bodyParser = require('body-parser');
const ejwt = require('express-jwt');
const cors = require('cors');
const passport = require('passport');
const acl = require('express-acl');
const asyncHandler = require('express-async-handler');
const config = require('./config/config');
const noAuthPaths = require('./config/no-auth-paths');
const email = require('./classes/Email');
const bugTracker = require('./classes/BugTracker');
require('./db/db'); /*
const facebookTokenStrategy = require("./middleware/facebook-token-strategy");
const googleTokenStrategy = require("./middleware/google-token-strategy"); */
const requestLogger = require('./middleware/request-logger');
const errorLogger = require('./middleware/error-logger');
const userByToken = require('./middleware/user-by-token');
const { checkIfUserIsBanned } = require('./middleware/check-user');
const { getErrorObject } = require('./helpers/errors');
const errorHandler = require('./middleware/error-handler');
const router = require('./routes');
const requestLimit = require('./middleware/query-limit');
const push = require('./classes/Push');

const app = express();

// OneSignal init
push.setOptions({
  userAuthKey: config.PUSH_USER_AUTH_KEY,
  appAuthKey: config.PUSH_APP_AUTH_KEY,
  appId: config.PUSH_APP_ID
});

// Sentry bag tracker init
bugTracker.setOptions({
  enabled: config.SENTRY_LOG === 'on',
  url: config.SENTRY_URL
});

// Postmark init
email.setOptions({
  key: config.EMAIL_KEY,
  from: config.EMAIL_FROM
});
// middlewares init
app.use(bugTracker.getClient().Handlers.requestHandler());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger());
// express-jwt - module that decoded JWT token and sets decoded data to req.user
app.use(
  ejwt({
    secret: config.JWT_SECRET,
    credentialsRequired: false
  }).unless(noAuthPaths)
);

// passport - module for different already done authorization strategies
app.use(
  passport.initialize()
); /*
passport.use(facebookTokenStrategy);
passport.use(googleTokenStrategy); */

// local middleware
// userByToken - check is exists user with userId from decoded JWT token
// and then sets his role in req.session.role for acl check
app.use(asyncHandler(userByToken));

// check is user banned and throw error if he is banned
app.use(asyncHandler(checkIfUserIsBanned));

// check limit in req.params, if anyone trying get more rows than config.MAX_QUERY_LIMIT limit
// sets equal config.MAX_QUERY_LIMIT
app.use(asyncHandler(requestLimit));

// init express-acl that checking user access by his role in req.session.role
acl.config({ filename: 'acl.json', path: 'src/config' });
app.use(acl.authorize.unless(noAuthPaths));

// init all routes from ./routes
app.use(router);

// init start page
app.get(
  '/',
  asyncHandler(async (req, res) => res.json('Welcome to Blizzz API!'))
);

// error handlers init
app.use(bugTracker.getClient().Handlers.errorHandler());
app.use(errorLogger());
app.use(errorHandler);

// throw error if path not found
app.use(
  asyncHandler(async (req, res) => {
    res.status(404).json(
      getErrorObject('PATH_NOT_FOUND', {
        message: `Cannot ${req.method} ${req.path}`
      }).errorObject
    );
  })
);

module.exports = { app };
