const User = require('../classes/models-controllers/User');
const { getErrorObject } = require('../helpers/errors');

module.exports = async (req, res, next) => {
  if (req.user && req.user.userId) {
    try {
      const user = await User.getById(req.user.userId);
      req.userData = user;

      // assign session.role for express-acl module
      if (!req.session) {
        req.session = {};
      }
      req.session.role = user.role;
    } catch (error) {
      throw getErrorObject('GENERAL_ERROR', 400, error);
    }
  }
  return next();
};
