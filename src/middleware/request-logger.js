const expressWinston = require('express-winston');
const logger = require('../helpers/logger');

module.exports = () => expressWinston.logger({
  winstonInstance: logger,
  colorize: true
});
