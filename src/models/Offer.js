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
      type: Date,
      required: true
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User'
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'Category'
    },
    subCategory: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'SubCategory'
    },
    offerCoordinates: {
      type: coordinatesSchema,
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
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
