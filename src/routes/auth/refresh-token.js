const { getErrorObject } = require('../../helpers/errors');
const Token = require('../../classes/Token');
const RefreshToken = require('../../classes/models-controllers/RefreshToken');

module.exports = async (req, res) => {
  const { refreshToken } = req.params;

  const oldRefreshToken = await RefreshToken.getOne({ refreshToken });
  await oldRefreshToken.populate('userId').execPopulate();

  try {
    const token = Token.createIssueToken(oldRefreshToken.userId, '1d');
    const { refreshToken: newRefreshToken } = await RefreshToken.create({
      userId: oldRefreshToken.userId._id,
      token
    });

    await oldRefreshToken.remove();

    return res.json({
      token,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    console.log(error);
    throw getErrorObject('GENERAL_ERROR', 400, error);
  }
};
