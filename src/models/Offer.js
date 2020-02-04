const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const renameId = require('../helpers/rename-id');
const coordinatesSchema = require('./../models/coordinates-schema');

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    timeOfAction: {
      type: Number,
      required: true
    },
    ownerId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User'
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      // required: true,
      ref: 'InterestCategory'
    },
    startDate: {
      type: Date,
      // required: true
    },
    endDate: {
      type: Date,
      // required: true
    },
    coordinates: {
      type: coordinatesSchema,
      required: true
    },
    status: {
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

module.exports = mongoose.model('Offer', schema);
