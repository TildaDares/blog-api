## Blog API

Blog API is a REST API for the blog project.

### API Endpoints

| Route                                   | Description                                                                                     | Method |
| --------------------------------------- | ----------------------------------------------------------------------------------------------- | ------ |
| `/api/users`                            | Returns an array of users in JSON                                                               | GET    |
| `/api/users/:id`                        | Returns a single user with the given id                                                         | GET    |
| `/api/signup`                           | Creates a new user and returns the user object                                                  | POST   |
| `/api/login`                            | Logs the user in and returns the user token                                                     | POST   |
| `api/posts/:postId/comments`            | Returns an array of comments in a post                                                          | GET    |
| `api/posts/:postId/comments/:commentId` | Returns a single comment with the given commentID and postID                                    | GET    |
| `api/posts/:postId/comments`            | Creates a new comment on the post with the given postId and returns the comment object          | POST   |
| `api/comments/:id`                      | Deletes the comment with the given id                                                           | DELETE |
| `api/users/:id/comments`                | Returns an array of a user's comments                                                           | GET    |
| `api/users/:userId/comments/:commentId` | Returns a single comment with the given commentID and created by the user with the given userId | GET    |
| `api/posts`                             | Returns all posts                                                                               | GET    |
| `api/posts/:id`                         | Returns a single post with the given id                                                         | GET    |
| `api/posts`                             | Creates a new post and returns the newly created post object                                    | POST   |
| `api/posts/:id/publish`                 | Publishes a post                                                                                | PUT    |
| `api/posts/:id/unpublish`               | Unpublishes a post                                                                              | PUT    |
| `api/posts/:id`                         | Deletes the post with the given id                                                              | DELETE |
| `api/posts/:id`                         | Edits a post and returns the edited object                                                      | PUT    |
| `api/users/:id/posts`                   | Returns an array of a user's posts                                                              | GET    |
| `api/users/:id/posts/published`         | Returns an array of a user's published posts                                                    | GET    |
| `api/users/:id/posts/unpublished`       | Returns an array of a user's unpublished posts                                                  | GET    |
