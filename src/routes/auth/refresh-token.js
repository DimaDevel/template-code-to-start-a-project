const error = require('debug')('app:error:refresh-token');
const { getErrorObject } = require('../../helpers/errors');
const Token = require('../../classes/Token');
const RefreshToken = require('../../classes/models-controllers/RefreshToken');
const bugTracker = require('./../../classes/BugTracker');

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
  } catch (err) {
    error(err);
    bugTracker.captureException(err);
    throw getErrorObject('GENERAL_ERROR', 400, err);
  }
};
