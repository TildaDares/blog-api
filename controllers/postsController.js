const Post = require("../models/post");
const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");

exports.index = function (req, res, next) {
  Post.find({})
    .sort({ created_at: -1 })
    .populate("user", "username")
    .exec(function (err, result) {
      if (err) return next(err);

      res.status(200).json({ posts: result });
    });
};

exports.show = function (req, res, next) {
  Post.find({ _id: req.params.id })
    .populate("user", "username")
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

      res
        .status(201)
        .json({ post: result, message: "Post created successfully" });
    });
  },
];

exports.destroy = function (req, res, next) {
  Post.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);

    res.status(204).json({ message: "Post deleted successfully" });
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
      res.status(400).json({ post: req.body, errors: errors.array() });
      return;
    }

    const post = new Post({
      _id: req.params.id,
      title: req.body.title,
      body: req.body.body,
      updated_at: new Date(),
      isPublished: req.body.published || true,
    });

    Post.findByIdAndUpdate(req.params.id, post, function (err, result) {
      if (err) return next(err);

      res
        .status(200)
        .json({ post: result, message: "Post updated successfully" });
    });
  },
];

exports.userPosts = function (req, res, next) {
  Post.find({ user: req.params.id })
    .sort({ created_at: -1 })
    .exec(function (err, result) {
      if (err) return next(err);

      res.status(200).json({ posts: result });
    });
};

exports.userPublishedPosts = function (req, res, next) {
  Post.find({ user: req.params.id, isPublished: true })
    .sort({ created_at: -1 })
    .exec(function (err, result) {
      if (err) return next(err);

      res.status(200).json({ posts: result });
    });
};

exports.userUnpublishedPosts = function (req, res, next) {
  Post.find({ user: req.params.id, isPublished: false })
    .sort({ created_at: -1 })
    .exec(function (err, result) {
      if (err) return next(err);

      res.status(200).json({ posts: result });
    });
};

exports.publish = function (req, res, next) {
  Post.findByIdAndUpdate(
    req.params.id,
    { isPublished: true },
    function (err, result) {
      if (err) return next(err);

      res
        .status(200)
        .json({ post: result, message: "Post published successfully" });
    }
  );
};

exports.unpublish = function (req, res, next) {
  Post.findByIdAndUpdate(
    req.params.id,
    { isPublished: false },
    function (err, result) {
      if (err) return next(err);

      res
        .status(200)
        .json({ post: result, message: "Post unpublished successfully" });
    }
  );
};
