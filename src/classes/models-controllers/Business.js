const BaseController = require('./Base');
const Business = require('../../models/Business');
const { getErrorObject } = require('../../helpers/errors');

class BusinessController extends BaseController {
  /**
   * returns business model
   */
  static get model() {
    return Business;
  }

  /**
   * returns notFound error, throwing when business not found by getOne or getById
   */
  static get notFoundError() {
    return getErrorObject('BUSINESS_NOT_FOUND', 404);
  }
}

module.exports = BusinessController;
