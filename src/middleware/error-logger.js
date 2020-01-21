const expressWinston = require('express-winston');
const logger = require('../helpers/logger');

module.exports = () =>
  expressWinston.errorLogger({
    winstonInstance: logger,
    colorize: true
  });
