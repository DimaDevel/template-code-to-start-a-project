const Device = require('../../classes/models-controllers/Device');
const { getErrorObject } = require('../../helpers/errors');

module.exports = async (req, res) => {
  const user = req.userData;
  if (!user) throw getErrorObject('USER_NOT_FOUND', 404);
  if (!req.body.deviceId) throw getErrorObject('DEVICE_ID_REQUIRED', 400);

  try {
    await Device.model.deleteMany({
      deviceId: req.body.deviceId
    });

    const device = await Device.create(
      Object.assign(req.body, {
        userId: user._id
      })
    );

    return res.json(device);
  } catch (error) {
    throw getErrorObject('GENERAL_ERROR', 400, error);
  }
};
