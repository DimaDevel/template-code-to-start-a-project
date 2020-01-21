const User = require('../../classes/models-controllers/User');
const { userRoles } = require('../../enums/user');
const { getErrorObject } = require('../../helpers/errors');

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.getById(id);

    res.json(user);
  } catch (error) {
    throw getErrorObject('GENERAL_ERROR', 400, error);
  }
};
