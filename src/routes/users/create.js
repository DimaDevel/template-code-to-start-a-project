const User = require('../../classes/models-controllers/User');
const { getErrorObject } = require('../../helpers/errors');

module.exports = async (req, res) => {
  const { body } = req;

  try {
    const user = await User.create(body);

    res.json(user);
  } catch (error) {
    throw getErrorObject('GENERAL_ERROR', 400, error);
  }
};
