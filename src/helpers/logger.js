const winston = require('winston');

const logger = new winston.Logger({
  colorize: true
});

logger.add(winston.transports.Console, {
  prettyPrint: true,
  timestamp: true
});

logger.cli();

module.exports = logger;
