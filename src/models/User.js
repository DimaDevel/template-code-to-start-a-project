const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate');
const { userRoles } = require('../enums/user');
const renameId = require('../helpers/rename-id');
const { hash } = require('../helpers/password');

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      minlength: 1,
      trim: true,
      unique: true,
      uniqueCaseInsensitive: true
    },
    assignedTerms: {
      type: Boolean,
      default: false
    },
    password: {
      type: String,
      required: true,
      hideJSON: true,
      minlength: 6
    },
    facebookId: {
      type: String
    },
    googleId: {
      type: String
    },
    appleId: {
      type: String
    },
    role: {
      type: String,
      required: true,
      enum: Object.values(userRoles),
      default: userRoles.USER
    },
    bannedAt: {
      type: Date
    },
    verifiedAt: {
      type: Date
    },
    firstName: {
      type: String
    },
    lastName: {
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

schema.plugin(mongooseHidden());
schema.plugin(mongoosePaginate);

schema.pre('save', async function hashPasswordHook() {
  if (!this.isModified('password')) return;
  this.password = await hash({ password: this.password });
});

schema.plugin(uniqueValidator, {
  message: 'Error, expected {PATH} to be unique.'
});

module.exports = mongoose.model('User', schema);
