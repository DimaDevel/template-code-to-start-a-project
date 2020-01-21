const express = require('express');
const asyncHandler = require('express-async-handler');
const passport = require('passport');
const { socialAuth } = require('./helpers');

const router = express.Router();

const resendVerificationEmail = require('./resend-ver-email');
const signup = require('./signup');
const signin = require('./signin');
const refreshToken = require('./refresh-token');
const appleAuth = require('./apple-auth');
const verifyEmail = require('./verify-email');
const forgotPassword = require('./forgot-password');
const getForgotPasswordPage = require('./get-forgot-pass-page');
const resetPasswordByToken = require('./forgot-password-by-token');

router.post('/signup', asyncHandler(signup));
router.post('/signin', asyncHandler(signin));
router.post('/signin/refresh/:refreshToken', asyncHandler(refreshToken));
router.post('/resend-verification-email', asyncHandler(resendVerificationEmail));
router.get('/verify-email/:userToken', asyncHandler(verifyEmail));
router.post('/forgot-password', asyncHandler(forgotPassword));
router.get('/forgot-password/:userToken', asyncHandler(getForgotPasswordPage));
router.post('/forgot-password/:userToken', asyncHandler(resetPasswordByToken));
/*
router.post(
  "/facebook",
  passport.authenticate("facebook-token", { session: false }),
  asyncHandler(socialAuth)
);

router.post(
  "/google",
  passport.authenticate("google-token", { session: false }),
  asyncHandler(socialAuth)
); */

router.post('/apple', asyncHandler(appleAuth));

module.exports = router;
