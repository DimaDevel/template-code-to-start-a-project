const BaseController = require('./Base');
const InterestCategory = require('../../models/InterestCategory');
const { getErrorObject } = require('../../helpers/errors');

class InterestCategoryController extends BaseController {
  /**
   * returns interest category model
   */
  static get model() {
    return InterestCategory;
  }

  /**
   * returns notFound error, throwing when interest category not found by getOne or getById
   */
  static get notFoundError() {
    return getErrorObject('INTEREST_CATEGORY_NOT_FOUND', 404);
  }
}

module.exports = InterestCategoryController;
