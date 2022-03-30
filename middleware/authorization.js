const Comment = require("../models/comment");
const Post = require("../models/post");

exports.isCommentAuthor = function (req, res, next) {
  Comment.findOne({ _id: req.params.id })
    .populate("user", "_id")
    .exec(function (err, result) {
      if (err) return next(err);

      if (req.user._id == result.user._id) return next();

      res.status(401).json({ msg: "You do not have access to this page!" });
    });
};

exports.isPostAuthor = function (req, res, next) {
  Post.findOne({ _id: req.params.id })
    .populate("user", "_id")
    .exec(function (err, result) {
      if (err) return next(err);

      if (req.user._id == result.user._id) return next();

      res.status(401).json({ msg: "You do not have access to this page!" });
    });
};
