const mongoose = require('mongoose');
const renameId = require('../helpers/rename-id');

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    token: {
      type: String,
      required: true
    },
    refreshToken: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: renameId
    }
  }
);

module.exports = mongoose.model('RefreshToken', schema);
