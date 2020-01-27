const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const renameId = require('../helpers/rename-id');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String
  }
},
{
  versionKey: false,
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: renameId,
  },
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('InterestCategory', schema);
