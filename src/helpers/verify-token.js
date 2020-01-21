const config = require('../config/config');
const token = require('./token');

module.exports = userToken => token.verify({
  token: userToken,
  secret: config.JWT_SECRET,
});
