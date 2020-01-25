const User = require('../../models/User');
const BaseController = require('./Base');
const { getErrorObject } = require('../../helpers/errors');
const getInRadius = require('./helpers-for-models/find-in-radius-helper');

class UserController extends BaseController {
  /**
   * returns user's Model
   */
  static get model() {
    return User;
  }

  /**
   * returns notFound error, throwing when user not found by getOne or getById
   */
  static get notFoundError() {
    return getErrorObject('USER_NOT_FOUND', 404);
  }
  /**
   * returns props for basic method deleteDisallowedProps
   * @returns {String[]}
   */
  static get disAllowedProps() {
    return [
      '_id',
      'role',
      'createdAt',
      'updatedAt',
      'bannedAt',
      'assignedTerms',
      'facebookId',
      'googleId',
      'appleId'
    ];
  }

  /**
   *
   * @param {string} id
   * @returns {Promise} banned user
   */
  static async ban(id) {
    const user = await this.getById(id);

    if (user.bannedAt) throw getErrorObject('USER_ALREADY_BANNED', 400);

    user.bannedAt = new Date();

    await user.save();

    return user;
  }

  /**
   * @param {string} id
   * @returns {Promise} unbanned user
   */
  static async unban(id) {
    const user = await this.getById(id);
    if (!user.bannedAt) throw getErrorObject('USER_ALREADY_UNBANNED', 400);

    user.bannedAt = undefined;

    await user.save();

    return user;
  }
  /**
   * 
   * @param {double} longitude 
   * @param {double} latitude 
   * @param {int} radius 
   * @param {object} paginateOpt
   * 
   * @returns {object} users
   */
  static async getUsersInRadius(longitude, latitude, radius, paginateOpt) {
    return await getInRadius(this.model, longitude, latitude, radius, paginateOpt);
  }
}

module.exports = UserController;
