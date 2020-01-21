const fs = require('fs');
const jwt = require('jsonwebtoken');
const request = require('request-promise-native').defaults({ json: true })
const config = require('../config/config');
const { getErrorObject } = require('./errors');

//generate client secret for apple api
const getClientSecret = () => {
  const privateKey = fs.readFileSync(config.APPLE_KEY_PATH);
  const headers = {
    kid: config.APPLE_KEY_ID,
    typ: undefined,
    alg: 'ES256',
  };
  const claims = {
    iss: config.APPLE_TEAM_ID,
    aud: 'https://appleid.apple.com',
    sub: config.APPLE_CLIENT_ID,
  };
  const token = jwt.sign(claims, privateKey, {
    algorithm: 'ES256',
    header: headers,
    expiresIn: '24h',
  });
  return token;
};


async function getSubAndEmailByAuthCode(authCode) {
  try {
    const client_secret = getClientSecret()

    // request for refresh token and check is it valid
    const res = await request(`https://appleid.apple.com/auth/token`, {
      method: 'POST',
      form: {
        code: authCode,
        client_secret,
        client_id: config.APPLE_CLIENT_ID,
        grant_type: "authorization_code"
      }
    })

    if (res && res.error) {
      throw res.error;
    }

    // getting users email and sub(appleId) for find/create new user;
    const { email, sub } = jwt.decode(res.id_token);

    return { email, sub }
  } catch (err) {
    throw getErrorObject('INVALID_APPLE_AUTH_PARAMS', 400, err);
  }
}

module.exports = getSubAndEmailByAuthCode;
