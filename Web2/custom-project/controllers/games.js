const Game = require('../models/game')

module.exports = (app) => {
  // CREATE
  app.post('/games', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    var game = new Game(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    game.save((err, game) => {
      // REDIRECT TO THE ROOT
      return res.redirect(`/`);
    })
  });


  app.get('/games/new', function (req, res) {
       res.render('games-new', {});
   })
};
