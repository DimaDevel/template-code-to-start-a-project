const info = require('debug')('app:info:src/index');
const { app } = require('./server');
const config = require('./config/config');

const port = config.NODE_PORT;

// app start
app.listen(port, () => {
  info(`Started on port ${port}`);
});
