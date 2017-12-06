const Game = require('../models/game')
const User = require('../models/user')

module.exports = (app) => {
  // CREATE
  app.post('/games', (req, res) => {
      if (req.user) {
          // INSTANTIATE INSTANCE OF POST MODEL
          var game = new Game(req.body);
          game.author = req.user._id

          game.save().then((post) => {
            return User.findById(req.user._id)
          }).then((user) => {
            user.games.unshift(game);
            user.save();
            // REDIRECT TO THE NEW POST
            res.redirect('/games/'+ post._id)
          }).catch((err) => {
            console.log(err.message);
          });
      } else {
          return res.status(401);
      }
  });


  app.get('/games/new', function (req, res) {

      var currentUser = req.user

      res.render('games-new', {currentUser: currentUser});
   })
};
