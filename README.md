## Write the codes and the logics for Creating a User's APIs for ##

1. Registration (The model should be linked to two more models called KYC and Post as instructed below)
2. Login (Authentication) using JWT so you can send token to the user's browser and have access to it though a middleware for protected routes.
3. Deleting a user ( This includes authorising  the deleting of any KYC or Post that particular user has made, concurrently)
Create two more models for
1. Post (This should have one-to-many relationship with the User model created while registering a User)
2. KYC (This should have one-to-one relationship with the User model created while registering a User)
Note: for KYC and POSTS, just have an endpoint that create them and link to user.