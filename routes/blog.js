var express = require("express");
var router = express.Router();
const usersController = require("../controllers/usersController");
const postsController = require("../controllers/postsController");
const commentsController = require("../controllers/commentsController");
const passport = require("passport");
const authorization = require("../middleware/authorization");
require("dotenv").config();

router.get("/", (req, res, next) => res.send("Hello world"));

// User routes
router.get("/users", usersController.index);
router.get("/users/:id", usersController.show);
router.post("/signup", usersController.signup);
router.post("/login", usersController.login);

// Comment routes
router.get("/posts/:postId/comments", commentsController.index);
router.get("/posts/:postId/comments/:commentId", commentsController.show);
router.post(
  "/posts/:postId/comments",
  passport.authenticate("jwt", { session: false }),
  commentsController.new
);
router.delete(
  "/comments/:id",
  passport.authenticate("jwt", { session: false }),
  authorization.isCommentAuthor,
  commentsController.destroy
);
router.get("/users/:id/comments", commentsController.userComments);
router.get(
  "/users/:userId/comments/:commentId",
  commentsController.userComment
);

// Post routes
router.get("/posts", postsController.index);
router.get("/posts/:id", postsController.show);
router.post(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  postsController.new
);
router.put(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  authorization.isPostAuthor,
  postsController.edit
);
router.put(
  "/posts/:id/publish",
  passport.authenticate("jwt", { session: false }),
  authorization.isPostAuthor,
  postsController.publish
);
router.put(
  "/posts/:id/unpublish",
  passport.authenticate("jwt", { session: false }),
  authorization.isPostAuthor,
  postsController.unpublish
);
router.delete(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  authorization.isPostAuthor,
  postsController.destroy
);
router.get("/users/:id/posts", postsController.userPosts);
router.get("/users/:id/posts/published", postsController.userPublishedPosts);
router.get(
  "/users/:id/posts/unpublished",
  postsController.userUnpublishedPosts
);

module.exports = router;
