const User = require('../../classes/models-controllers/User');
const passwordHelper = require('../../helpers/password');
const { userRoles } = require('../../enums/user');
const { getErrorObject } = require('../../helpers/errors');

module.exports = async (req, res) => {
  const { body } = req;
  try {
    // find current user doc for check if user exists and then match his password
    const oldUser = await User.getById(req.user.userId);

    // if user not admin he can't change disallowed props
    if (req.userData.role !== userRoles.ADMIN) {
      delete body.password;
      User.deleteDisallowedProps(body);
    }

    // if body.oldPassword not matches current user password he can't update password.
    if (body.oldPassword && body.newPassword) {
      const match = await passwordHelper.match({
        password: body.oldPassword,
        hashString: oldUser.password
      });
      if (!match) throw getErrorObject('OLD_PASSWORD_NOT_VALID', 400);

      body.password = body.newPassword;

      delete body.newPassword;
      delete body.oldPassword;
    }

    const user = await User.update(req.user.userId, body);

    res.json(user);
  } catch (error) {
    throw getErrorObject('GENERAL_ERROR', 400, error);
  }
};
