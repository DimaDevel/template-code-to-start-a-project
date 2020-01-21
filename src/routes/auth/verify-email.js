const User = require('../../classes/models-controllers/User');
const verifyToken = require('../../helpers/verify-token');
const { getErrorObject } = require('../../helpers/errors');

module.exports = async (req, res) => {
  const { userToken } = req.params;

  try {
    const decodedToken = verifyToken(userToken);
    const user = await User.getById(decodedToken.userId);

    if (user.verifiedAt) {
      return res.send({
        message: 'Your email address has already been verified.'
      });
    }

    user.verifiedAt = Date.now();
    await user.save();

    res.send({ message: 'Your email address has been verified successfully.' });
  } catch (error) {
    throw getErrorObject('GENERAL_ERROR', 400, error);
  }
};
