const mongoose = require('mongoose');
const validator = require('validator');
const mongoosePaginate = require('mongoose-paginate');
const { userRoles } = require('../enums/user');
const { hash } = require('../helpers/password');
const coordinatesSchema = require('./../models/coordinates-schema');

const interestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  },
  {
    _id: false,
    id: false
  }
);

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        isAsync: true,
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email.'
      }
    },
    assignedTerms: {
      type: Boolean,
      default: false
    },
    password: {
      type: String,
      required: true,
      hideJSON: true,
      minlength: 8
    },
    livingArea: {
      type: String,
      required: true
    },
    interests: {
      type: [interestSchema],
      default: []
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
    profilePicture: {
      type: String
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
    },
    coordinates: {
      type: coordinatesSchema,
      required: true
    },
    emailConfirmed: {
      type: Boolean
    }
  },
  {
    versionKey: false,
    _id: true,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      }
    }
  }
);

schema.plugin(mongoosePaginate);

schema.pre('save', async function hashPasswordHook() {
  if (!this.isModified('password')) return;
  this.password = await hash({ password: this.password });
});

module.exports = mongoose.model('User', schema);
