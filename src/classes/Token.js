const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { getErrorObject } = require('../helpers/errors');

class Token {
  /**
   * 
   * @param {string} secret 
   * @param {string} audience 
   * @param {string} issuer 
   */
  constructor(secret, audience, issuer) {
    if (!secret) throw new Error('Can not find secret for jwt.');
    if (!audience) throw new Error('Can not find audience for jwt');
    if (!issuer) throw new Error('Can not find issuer for jwt');
    this.secret = secret;
    this.audience = audience;
    this.issuer = issuer;
  }
  /**
   * @typedef tokenTypes
   * @property {string} refresh token type
   * @property {string} access token type
   */

  /**
   * @returns {tokenTypes}
   * Represent token types
   */
  get tokenTypes() {
    return {
      refresh: 'refresh',
      access: 'access'
    };
  }

  get invalidRefreshTokenError() {
    return getErrorObject('INVALID_REFRESH_TOKEN', 400);
  }

  /**
   * 
   * @param {object} payload 
   * @param {string} expiresIn 
   * @param {object} type 
   */
  create(payload, expiresIn = '1d', type) {
    return jwt.sign(payload, this.secret, {
      expiresIn,
      header: { type },
      audience: this.audience,
      issuer: this.issuer
    });
  }

  /**
   * 
   * @param {object}
   */
  verify({ token, ignoreExpiration = false }) {
    return jwt.verify(token, this.secret, { ignoreExpiration });
  }

  /**
   * 
   * @param  {...any} args 
   */
  decode(...args) {
    return jwt.decode(...args);
  }

  /**
   * 
   * @param {string} refreshToken 
   */
  verifyRefreshToken(refreshToken) {
    const decoded = this.verify(refreshToken);

    if (!decoded || decoded.type !== this.tokenTypes.refreshToken) {
      return false;
    }

    return true;
  }

  /**
   * 
   * @param {object} user 
   * @param {string} expiresIn 
   */
  createIssueToken(user, expiresIn = '1d') {
    return this.create(
      {
        userId: user._id,
        role: user.role
      },
      expiresIn,
      this.tokenTypes.access
    );
  }

  /**
   * 
   * @param {string} userId 
   * @param {string} expiresIn 
   */
  createRefreshToken(userId, expiresIn = '60d') {
    return this.create(
      {
        userId,
      },
      expiresIn,
      this.tokenTypes.refresh
    );
  }
}

module.exports = new Token(config.JWT_SECRET, config.JWT_AUDIENCE, config.JWT_ISSUER);
