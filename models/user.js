const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  username: { type: String, required: true, index: true, unique: true },
  password: { type: String, required: true },
  bio: String,
  joined_at: { type: Date, required: true },
  avatar: String,
});

UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const compare = await bcrypt.compare(password, this.password);

  return compare;
};

module.exports = mongoose.model("User", UserSchema);
