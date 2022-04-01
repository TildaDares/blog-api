const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  username: { type: String, required: true, index: true, unique: true },
  password: { type: String, required: true },
  bio: String,
  joined_at: { type: Date, required: true },
  avatar: String,
  isAdmin: { type: Boolean, default: false },
});

UserSchema.methods.isValidPassword = async function (password) {
  const compare = await bcrypt.compare(password, this.password);

  return compare;
};

module.exports = mongoose.model("User", UserSchema);
