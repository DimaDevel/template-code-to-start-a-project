const User = require('../../classes/models-controllers/User');
const { getErrorObject } = require('../../helpers/errors');

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.unban(id);

    res.json(user);
  } catch (error) {
    throw getErrorObject('GENERAL_ERROR', 400, error);
  }
};
