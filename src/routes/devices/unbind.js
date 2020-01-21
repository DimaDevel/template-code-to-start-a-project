const Device = require('../../classes/models-controllers/Device');
const { getErrorObject } = require('../../helpers/errors');

module.exports = async (req, res) => {
  const { deviceId } = req.params;

  try {
    await Device.model.deleteMany({ deviceId });

    return res.json({ message: true });
  } catch (error) {
    throw getErrorObject('GENERAL_ERROR', 400, error);
  }
};
