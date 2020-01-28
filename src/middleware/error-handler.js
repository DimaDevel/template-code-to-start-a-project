const config = require('../config/config');

/* eslint-disable */
// error handler
module.exports = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = config.NODE_ENV === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err.errorObject || { message: err.message });
};
/* eslint-enable */
