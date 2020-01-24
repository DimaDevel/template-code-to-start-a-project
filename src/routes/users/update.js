const User = require('../../classes/models-controllers/User');
const passwordHelper = require('../../helpers/password');
const { userRoles } = require('../../enums/user');
const { getErrorObject } = require('../../helpers/errors');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  // check user access to update user by id
  if (
    req.userData.role !== userRoles.ADMIN &&
    req.user.userId.toString() !== id
  ) {
    throw getErrorObject('USER_UPDATE_NOT_ALLOWED', 403);
  }
  //deleting disallowed props for self update
  if (req.userData.role !== userRoles.ADMIN) {
    delete body.password;
    User.deleteDisallowedProps(body);
  }

  try {
    //find current user doc
    const oldUser = await User.getById(id);

    //matching current password with body.oldPassword and sets new password for user if they matches
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

    //update user function
    const user = await User.update(id, body);

    //return updated user in response
    res.json(user);
  } catch (error) {
    throw getErrorObject('GENERAL_ERROR', 400, error);
  }
};
