const { MAX_QUERY_LIMIT } = require('../config/config');

module.exports = (req, res, next) => {
  if (!req.query || !req.query.limit) return next();

  if (!Number(req.query.limit) || Number(req.query.limit) > MAX_QUERY_LIMIT) {
    req.query.limit = MAX_QUERY_LIMIT;
    return next();
  }
  return next();
};
