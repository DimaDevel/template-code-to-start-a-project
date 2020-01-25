const Offer = require('../../models/Offer');
const BaseController = require('./Base');
const { getErrorObject } = require('../../helpers/errors');
const getInRadius = require('./helpers-for-models/find-in-radius-helper');

class UserController extends BaseController {
  /**
   * returns offer's Model
   */
  static get model() {
    return Offer;
  }

  /**
   * returns notFound error, throwing when offer not found by getOne or getById
   */
  static get notFoundError() {
    return getErrorObject('OFFER_NOT_FOUND', 404);
  }

  /**
   * 
   * @param {double} longitude 
   * @param {double} latitude 
   * @param {int} radius 
   * @param {object} paginateOpt
   * 
   * @returns {object} offers
   */
  static async getOffersInRadius(longitude, latitude, radius, paginateOpt) {
    return await getInRadius(this.model, longitude, latitude, radius, paginateOpt);
  }
}

module.exports = UserController;
