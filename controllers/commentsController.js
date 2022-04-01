const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");

exports.index = function (req, res, next) {
  Comment.find({ post: req.params.postId })
    .sort({ created_at: -1 })
    .populate("user", "username")
    .exec(function (err, result) {
      if (err) return next(err);

      res.status(200).json({ comments: result });
    });
};

exports.show = function (req, res, next) {
  Comment.findOne({ _id: req.params.commentId, post: req.params.postId })
    .populate("user", "username")
    .exec(function (err, result) {
      if (err) return next(err);

      res.status(200).json({ comment: result });
    });
};

exports.new = [
  body("body").isLength({ min: 1 }).withMessage("Body must be present"),
  function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ body: req.body, errors: errors.array() });
      return;
    }

    const comment = new Comment({
      body: req.body.body,
      created_at: new Date(),
      user: req.user._id,
      post: req.params.postId,
    });

    comment.save((err, result) => {
      if (err) return next(err);

      res
        .status(201)
        .json({ comment: result, message: "Comment created successfully" });
    });
  },
];

exports.destroy = function (req, res, next) {
  Comment.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);

    res.status(200).json({ message: "Comment deleted successfully" });
  });
};

exports.userComments = function (req, res, next) {
  Comment.find({ user: req.params.id })
    .sort({ created_at: -1 })
    .exec(function (err, result) {
      if (err) return next(err);

      res.status(200).json({ comments: result });
    });
};

exports.userComment = function (req, res, next) {
  Comment.find({ _id: req.params.commentId, user: req.params.userId }).exec(
    function (err, result) {
      if (err) return next(err);

      res.status(200).json({ comment: result });
    }
  );
};
