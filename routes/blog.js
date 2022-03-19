var express = require("express");
var router = express.Router();
const usersController = require("../controllers/usersController");
const postsController = require("../controllers/postsController");
const commentsController = require("../controllers/commentsController");
const passport = require("passport");
require("dotenv").config();

router.get("/", (req, res, next) => res.send("Hello world"));

// User routes
router.get("/user/:id/posts", usersController.userPosts);
router.get("/user/:id/posts/published", usersController.userPublishedPosts);
router.get("/user/:id/posts/unpublished", usersController.userUnpublishedPosts);
router.get("/user/:id/comments", usersController.userComments);
router.get("/user/:userId/comments/:commentId", usersController.userComment);
router.post("/signup", usersController.signup);
router.post("/login", usersController.login);

// Post routes
router.get("/posts", postsController.index);
router.get("/posts/:id", postsController.show);
router.get("/posts/:id/comments", postsController.postComments);
router.get("/posts/:postId/comments/:commentId", postsController.postComment);
router.get("/posts/:id", postsController.show);
router.post(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  postsController.new
);
router.put(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  postsController.edit
);
router.delete(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  postsController.destroy
);

// Comment routes
router.get("/comments", commentsController.index);
router.get("/comments/:id", commentsController.show);
router.post(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  commentsController.new
);
router.delete(
  "/comments/:id",
  passport.authenticate("jwt", { session: false }),
  commentsController.destroy
);

module.exports = router;
