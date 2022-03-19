var express = require("express");
var router = express.Router();
const usersController = require("../controllers/usersController");
const postsController = require("../controllers/postsController");
const passport = require("passport");
require("dotenv").config();

router.get("/", (req, res, next) => res.send("Hello world"));

// User routes
router.post("/signup", usersController.signup);

router.post("/login", usersController.login);

// Post routes
router.get("/posts", postsController.index);
router.get("/post/:id", postsController.show);
router.post(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  postsController.new
);

module.exports = router;
