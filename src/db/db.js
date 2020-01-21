const mongoose = require('mongoose');
const config = require('../config/config');
const logger = require('../helpers/logger');


// Basic mongoose module for create connection to mongodb and operate db

mongoose.Promise = global.Promise;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 5000
};

mongoose.connection.on('disconnected', () => {
  const errorMessage = 'MongoDB is disconnected';
  console.log(errorMessage);
});
mongoose.connection.on('reconnected', () => {
  console.log('MongoDB is reconnected');
});

const connectWithRetry = () => {
  mongoose
    .connect(config.DATABASE, options)
    .then(() => {
      logger.info('MongoDB is connected');
    })
    .catch(error => {
      logger.error(`MongoDB: ${error.message}`);
      logger.info('MongoDB: retrying to connect in 5 seconds');
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

module.exports = { mongoose };
