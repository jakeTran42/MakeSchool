## PROJECT NAME

### To Be Announce

## REQUIREMENTS

 1. Begin from scratch without any sort of template. You may look at any code you like, and copy and paste chunks of other code, but do not duplicate an entire other project.
 2. Useful RESTful routing.
 3. Your site serves at least three resources.
 4. The project must be shipped live on heroku.
 5. Stretch Goals
 6. A full test suite of controller tests for your routes.
 7. A fully responsive, conventionally styled, front end using Bootstrap 3.

## RESOURCES

 1. Users
 2. Favorites
 3. Comments
 4. Rating

## ROUTES

| Routes  | Action  | HTTP Verbs  | Path  | Returns  |
|---|---|---|---|---|
| 1  | Index  | GET  | /  | Home/Index  |
| 2  | New  | GET  | /signin  | User See Sign-in Form  |
| 3  | Show  | POST  | /Users/signin  | User Can Sign In  |
| 4  | Show  | GET  | /sign-up  | User See Sign-up Form  |
| 5  | New  | POST  | /Users/sign-up  | User Can Sign Up  |
| 6  | Show  | GET  | /users/:id/favorites | User Can View Their Favorites  |
| 7  | Show  | GET  | /users/logout  | Logout For Users  |
| 8  | Show  | POST  | /Users/:postId/comments  | Creating New Comments  |
| 9  | New  | GET  | /Users/:id/game/new  | New Game form  |
| 10  | Show  | POST  | /Users/:id/games  | Adding new games to user account  |



## TODO

1. Add Favorites/Game Statuses
2. Add comments
3. Associate Ratings (Maybe popular game List?) Similar to Upvote
3. New Release games, Year it was released and Game System as well as GENRE
4. Set it so only Admin can add game while user can fav, status, comment, rate. (Regular User cannot add game)
5. Upload Picture
6. Add Edit/Delete Button to user so they can edit personal comment or Delete/Edit from favorites.
