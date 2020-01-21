const jwt = require('jsonwebtoken');

// Here is busic jwt functions for create, verify, decode JWT tokens

function create({ payload, secret, expiresIn = '1d' }) {
  return jwt.sign(payload, secret, { expiresIn });
}

function verify({ token, secret, ignoreExpiration = false }) {
  return jwt.verify(token, secret, { ignoreExpiration });
}

module.exports = {
  create,
  verify,
  decode: jwt.decode,
};
