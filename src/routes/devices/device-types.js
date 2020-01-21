const { deviceTypes } = require('../../enums/device');

module.exports = async (req, res) => res.json(deviceTypes);
