const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: "",
  },
  coverPic: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  followers: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  ],
  following: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

// Encrypt user password before saving to database
userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare user password
userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
}

const User = mongoose.model('User', userSchema);

module.exports = User;