const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    required: true,
  },
});

userSchema.methods.toDTO = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    dateOfBirth: this.dateOfBirth,
    gender: this.gender,
    avatar: this.avatar,
    isVerified: this.isVerified,
    age: Math.floor(
      (new Date() - new Date(this.dateOfBirth)) /
        (365.25 * 24 * 60 * 60 * 1000),
    ),
  };
};

module.exports = mongoose.model('User', userSchema);
