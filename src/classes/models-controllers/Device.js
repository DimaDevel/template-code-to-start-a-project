const BaseController = require('./Base');
const Device = require('../../models/Device');
const { getErrorObject } = require('../../helpers/errors');

class DeviceController extends BaseController {
  /**
   * returns refreshToken model
   */
  static get model() {
    return Device;
  }

  /**
   * returns notFound error, throwing when refreshToken not found by getOne or getById
   */
  static get notFoundError() {
    return getErrorObject('DEVICE_NOT_FOUND', 404);
  }
}

module.exports = DeviceController;
