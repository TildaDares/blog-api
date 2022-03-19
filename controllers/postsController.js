const Post = require("../models/post");
const { body, validationResult } = require("express-validator");
const user = require("../models/user");

exports.index = function (req, res, next) {
  Post.find({})
    .populate("user")
    .exec(function (err, result) {
      if (err) return next(err);

      res.status(200).json({ posts: result });
    });
};

exports.show = function (req, res, next) {
  Post.find({ _id: req.params.id })
    .populate("user")
    .exec(function (err, result) {
      if (err) return next(err);

      res.status(200).json({ post: result });
    });
};

exports.new = [
  body("title")
    .trim()
    .isLength({ min: 6, max: 60 })
    .withMessage(
      "Title must be greater than 6 characters and less than 60 characters"
    ),
  body("body").isLength({ min: 1 }).withMessage("Body must be present"),
  function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ body: req.body, errors: errors.array() });
      return;
    }

    const post = new Post({
      title: req.body.title,
      body: req.body.body,
      updated_at: new Date(),
      created_at: new Date(),
      user: req.user._id,
      isPublished: req.body.published || true,
    });

    post.save((err, result) => {
      if (err) return next(err);

      res.status(201).json({ message: "Post created successfully" });
    });
  },
];

exports.destroy = function (req, res, next) {
  Post.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);

    res.status(200).json({ message: "Post deleted successfully" });
  });
};

exports.edit = [
  body("title")
    .trim()
    .isLength({ min: 6, max: 60 })
    .withMessage(
      "Title must be greater than 6 characters and less than 60 characters"
    ),
  body("body").isLength({ min: 1 }).withMessage("Body must be present"),
  function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ body: req.body, errors: errors.array() });
      return;
    }

    const post = new Post({
      _id: req.params.id,
      title: req.body.title,
      body: req.body.body,
      updated_at: new Date(),
      isPublished: req.body.published || true,
    });

    Post.findByIdAndUpdate(req.params.id, post, function (err) {
      if (err) return next(err);

      res.status(200).json({ message: "Post updated successfully" });
    });
  },
];
