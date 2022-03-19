const Post = require("../models/post");
const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");

exports.index = function (req, res, next) {
  Comment.find({})
    .populate("user")
    .exec(function (err, result) {
      if (err) return next(err);

      res.status(200).json({ comments: result });
    });
};

exports.show = function (req, res, next) {
  Comment.find({ _id: req.params.id })
    .populate("user")
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
      post: req.params.id,
    });

    comment.save((err, result) => {
      if (err) return next(err);

      res.status(201).json({ message: "Comment created successfully" });
    });
  },
];

exports.destroy = function (req, res, next) {
  Comment.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);

    res.status(200).json({ message: "Comment deleted successfully" });
  });
};
