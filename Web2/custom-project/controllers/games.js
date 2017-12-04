const Game = require('../models/game')

module.exports = (app) => {
  // CREATE
  app.post('/games', (req, res) => {
      if (req.user) {
          // INSTANTIATE INSTANCE OF POST MODEL
          var game = new Game(req.body);

          // SAVE INSTANCE OF POST MODEL TO DB
          game.save((err, game) => {
            // REDIRECT TO THE ROOT
            return res.redirect(`/`);
          })
      } else {
          return res.status(401);
      }
  });


  app.get('/games/new', function (req, res) {

      var currentUser = req.user

      res.render('games-new', {currentUser: currentUser});
   })
};
