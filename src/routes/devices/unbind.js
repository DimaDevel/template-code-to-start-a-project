const error = require('debug')('app:error:unbind');
const Device = require('../../classes/models-controllers/Device');
const { getErrorObject } = require('../../helpers/errors');
const bugTracker = require('./../../classes/BugTracker');

module.exports = async (req, res) => {
  const { deviceId } = req.params;

  try {
    await Device.model.deleteMany({ deviceId });

    return res.json({ message: true });
  } catch (err) {
    error(err);
    bugTracker.captureException(err);
    throw getErrorObject('GENERAL_ERROR', 400, err);
  }
};
