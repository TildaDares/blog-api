const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
  isPublished: { type: Boolean, default: true },
});

module.exports = mongoose.model("Post", PostSchema);
