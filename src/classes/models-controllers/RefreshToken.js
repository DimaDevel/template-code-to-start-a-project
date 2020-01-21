const BaseController = require('./Base');
const RefreshToken = require('../../models/RefreshToken');
const { getErrorObject } = require('../../helpers/errors');
const Token = require('../Token');

class RefreshTokenController extends BaseController {
  /**
   * returns refreshToken model
   */
  static get model() {
    return RefreshToken;
  }

  /**
   * returns notFound error, throwing when refreshToken not found by getOne or getById
   */
  static get notFoundError() {
    return getErrorObject('REFRESH_TOKEN_NOT_FOUND', 404);
  }

  static get expiredError() {
    return getErrorObject('REFRESH_TOKEN_EXPIRED', 400);
  }

  /**
   * was rewrite basic create method
   * @param {{userId:string, token:string}} param0
   */
  static create({ userId, token }) {
    const refreshToken = Token.createRefreshToken(userId);

    return super.create({ userId, token, refreshToken });
  }

  static async getOne(object) {
    const refreshToken = await super.getOne(object);

    if (!Token.verify(refreshToken)) {
      await this.deleteById(refreshToken._id);
      throw this.expiredError;
    }

    return refreshToken;
  }
}

module.exports = RefreshTokenController;
