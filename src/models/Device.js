const mongoose = require('mongoose');
const renameId = require('../helpers/rename-id');
const { deviceTypes } = require('../enums/device');

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  deviceId: {
    type: String,
    required: true,
  },
  deviceType: {
    type: String,
    enum: Object.values(deviceTypes),
    required: true,
  },
},
{
  versionKey: false,
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: renameId,
  },
});

module.exports = mongoose.model('Device', schema);
