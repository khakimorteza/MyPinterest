# routes

- GET / Page with navbar and some images

# API Endpoints

### Session:

- GET "/api/session" - Log in
- DELETE "/api/session" - Log out

### Users

- POST "/api/users" - creates a new user
- GET "/api/users - return all users
- GET "/api/users/:id" - returns user information + all user boards(profile)
- GET "/api/users/:id/pins - returns all images for a user
- GET "/api/users/:id/boards - returns all boards for a user
- POST "/api/users" -sign up
- POST "/api/pins - post an image
- PATCH "/api/users/:id" - update user

### Pins

- GET "/api/pins/:id" - returns single image
- GET "/api/pins - returns relevent images
- DELETE /api/pins/:id - deletes a pin

### boards

- GET "/api/boards/:id/pins - returns all image in a board
- POST "/api/boards - create a board
- PATCH "/api/boards/:id - edite a board
- DELETE "/api/boards/:id - delete a board
- GET /api/boards/:id - gets single board
