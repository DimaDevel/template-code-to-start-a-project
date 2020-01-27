const BaseController = require('./Base');
const InterestCategory = require('../../models/InterestCategory');
const { getErrorObject } = require('../../helpers/errors');

class DeviceController extends BaseController {
  /**
   * returns refreshToken model
   */
  static get model() {
    return InterestCategory;
  }

  /**
   * returns notFound error, throwing when refreshToken not found by getOne or getById
   */
  static get notFoundError() {
    return getErrorObject('INTEREST_CATEGORY_NOT_FOUND', 404);
  }
}

module.exports = DeviceController;
