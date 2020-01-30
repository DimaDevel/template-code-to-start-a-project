const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const validator = require('validator');
const renameId = require('../helpers/rename-id');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User'
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'InterestCategory'
    },
    phone: {
      type: String
    },
    corporateEmail: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        isAsync: true,
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email.'
      }
    },
    country: {
      type: String
    },
    city: {
      type: String
    },
    address: {
      type: String
    }
  },
  {
    versionKey: false,
    _id: true,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: renameId
    }
  }
);

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Business', schema);
