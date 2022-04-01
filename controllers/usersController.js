const User = require("../models/user");
const Post = require("../models/post");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
require("dotenv").config();

exports.index = function (req, res, next) {
  User.find({}, { password: 0 }).exec(function (err, result) {
    if (err) return next(err);

    res.status(200).json({ users: result });
  });
};

exports.show = function (req, res, next) {
  User.findOne({ _id: req.params.id }, { password: 0 }).exec(function (
    err,
    result
  ) {
    if (err) return next(err);

    res.status(200).json({ user: result });
  });
};

exports.signup = [
  body("username").isLength({ min: 1 }).withMessage("Username is required"),
  body("username")
    .custom(async (username) => {
      const user = await User.findOne({ username: username });
      if (user) {
        throw new Error("Username is already in use");
      }

      return true;
    })
    .withMessage("Username is already in use"),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
    .withMessage(
      "Password must be greater than 8 characters and contains at least one uppercase letter, one lowercase letter, one symbol, and one number"
    ),
  body("passwordConfirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }

    // Indicates the success of this synchronous custom validator
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ body: req.body, errors: errors.array() });
      return;
    }

    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) return next(err);
      // otherwise, store hashedPassword in DB
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
        joined_at: new Date(),
      });

      user.save((err) => {
        if (err) return next(err);

        res.status(201).json({
          msg: "Successfully signed up",
          user: req.user,
        });
      });
    });
  },
];

exports.login = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        return res.status(400).json({ msg: info.message });
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = {
          _id: user._id,
          username: user.username,
        };
        const token = jwt.sign({ user: body }, process.env.SECRET, {
          expiresIn: "2d",
        });

        return res.status(200).json({ msg: "Successfully logged in", token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};
