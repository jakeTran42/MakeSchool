const Game = require('../models/game')
const User = require('../models/user')

module.exports = (app) => {

  // CREATE
  app.post('/games', (req, res) => {
      if (req.user) {
          // INSTANTIATE INSTANCE OF POST MODEL
          let game = new Game(req.body);
          game.author = req.user._id

          game.save().then((game) => {
            return User.findById(req.user._id)
          }).then((user) => {
            user.games.unshift(game);
            return user.save();
        }).then((user) => {
            // REDIRECT TO THE NEW POST
            res.redirect('/games/'+ game._id)
        }).catch((err) => {
            console.log(err.message);
          });
      } else {
          res.redirect('/login')
          return res.status(401);
      }
  });

  app.get('/games/new', function (req, res) {

      var currentUser = req.user

      res.render('games-new', {currentUser: currentUser});
   })

   // Show game details
  app.get('/games/:id', function (req, res) {

      var currentUser = req.user;

     // LOOK UP THE POST
     Game.findById(req.params.id).populate('author').populate('comments').then((game) => {
         let currentClass = ""
         if (game.author && currentUser) {
             var currentAuthor = game.author.username;
             currentClass = currentUser.username === currentAuthor ? "is-author" : "";
         }

         // let currentAuthor = game.author.username;
         //
         // if (currentUser) {
         //     var currentUsername = currentUser.username
         // }
         // const currentClass = (currentUsername === currentAuthor ? "is-author" : "nil");
         //
         // console.log('currentUser:' + currentUser);
         // console.log('currentAuthor: ' + Game.author);
         // console.log('current class is: ' + currentClass);

         res.render('game-show', { game, currentUser, currentClass })
       }).catch((err) => {
         console.log(err.message)
       })
   })
};
