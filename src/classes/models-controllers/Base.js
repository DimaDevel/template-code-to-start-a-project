const { Types } = require('mongoose');
const createError = require('http-errors');
const { getErrorObject } = require('../../helpers/errors');

class MongoController {
  /**
   * returns basic mongoModel
   * @returns {Model}
   */
  static get model() {
    throw createError(500, 'Model undefined!');
  }

  /**
   * returns errorMessage if doc not found
   * @returns {{message:string}}
   */
  static get notFoundError() {
    throw createError(500, 'notFoundError undefined!');
  }

  /**
   * method that returns bodyNullError
   * @returns {{message:string}}
   */
  static get bodyNullError() {
    return getErrorObject('BODY_IS_NULL', 400);
  }

  /**
   * @returns {String[]}
   */
  static get disAllowedProps() {
    return [];
  }

  /**
   * check is valid ObjectId prop or not
   * @param {String} id
   */
  static validateObjectId(id) {
    if (!Types.ObjectId.isValid(id)) {
      throw this.notFoundError;
    }
  }
  /* eslint-disable */
  /**
   * Delete props from object, that disallowed to create/update by user input
   * @param {Object} object
   */
  static deleteDisallowedProps(object) {
    for (const prop of this.disAllowedProps) {
      delete object[prop];
    }

    return object;
  }

  /**
   *
   * @param {{email:string, password:string, firstName:string, lastName:string}} object
   * @returns {Promise}
   */
  static async create(object) {
    if (!object) {
      throw this.bodyNullError;
    }
    const doc = new this.model(object);
    await doc.save();

    return doc;
  }
  /* eslint-enable */

  /**
   *
   * @param {{email:string, password:string, firstName:string, lastName:string, _id:string}} object
   * @returns {Promise}
   */
  static async getOne(object) {
    if (!object) {
      throw this.bodyNullError;
    }

    if (object._id) {
      this.validateObjectId(object._id);
    }

    const doc = await this.model.findOne(object);
    if (!doc) throw this.notFoundError;

    return doc;
  }

  /**
   *
   * @param {String} id
   * @returns {Promise}
   */
  static async getById(id) {
    this.validateObjectId(id);

    const doc = await this.model.findById(id);
    if (!doc) throw this.notFoundError;

    return doc;
  }

  /**
   *
   * @param {string} id
   * @param {{email:string, newPassword:string, oldPassword:string, firstName:string, lastName:string, _id:string}} object
   */
  static async update(id, object) {
    if (!object) {
      throw this.bodyNullError;
    }
    const doc = await this.getById(id);

    Object.assign(doc, object);
    await doc.save();
    return doc;
  }

  /**
   *
   * @param {Object} filter
   * @param {Number} page
   * @param {Number} limit
   * @param {Object} sort
   */
  static paginate(filter, page, limit, sort) {
    return this.model.paginate(filter, { page, limit, sort });
  }

  /**
   * delete doc by params in object
   * @param {{email:string, newPassword:string, oldPassword:string, firstName:string, lastName:string, _id:string}} object
   */
  static async delete(object) {
    const doc = await this.model.findOneAndDelete(object);
    if (!doc) throw this.notFoundError;

    return doc;
  }

  /**
   *
   * @param {String} id
   */
  static async deleteById(id) {
    this.validateObjectId(id);

    const doc = await this.model.findByIdAndDelete(id);
    if (!doc) throw this.notFoundError;

    return doc;
  }
}

module.exports = MongoController;
