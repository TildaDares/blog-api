const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  body: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  created_at: { type: Date, required: true },
});

module.exports = mongoose.model("Comment", CommentSchema);