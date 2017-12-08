const Comment = require('../models/comment')
const Game = require('../models/game')
const User = require('../models/user');

module.exports = function(app) {

  // app.post('/games/:gameId/comments', function (req, res) {
  // // INSTANTIATE INSTANCE OF MODEL
  //   const comment = new Comment(req.body)
  //   // comment.author = req.user._id;
  //
  //   // SAVE INSTANCE OF Comment MODEL TO DB
  //   comment.save().then((comment) => {
  //     return Game.findById(req.params.gameId)
  //   }).then((game) => {
  //     game.comments.unshift(comment)
  //     return game.save()
  //   }).then((game) => {
  //     res.redirect(`/games/` + game._id)
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // })

  // app.post('/games/:gameId/comments', (req, res) => {
  //   if (req.user) {
  //     const comment = new Comment(req.body);
  //
  //     comment.save().then((comment) => {
  //       return Game.findById(req.params.gameId)
  //     }).then((game) => {
  //       game.comments.unshift(comment)
  //       return game.save()
  //     }).then((game) => {
  //       res.redirect(`/games/` + game._id)
  //     })
  //   } else {
  //     return res.status(401); // UNAUTHORIZED
  //   }
  // });

  app.post('/games/:gameId/comments', (req, res) => {
    if (req.user) {
      const comment = new Comment(req.body);

      comment.save().then((comment) => {
        return Game.findById(req.params.gameId)
    }).then((game) => {
        game.comments.unshift(comment)
        return game.save()
      }).then((game) => {
        res.redirect(`/games/` + game._id)
    }).catch((game) => {
        res.redirect('login')
    })
    } else {
        // res.redirect('/login')
        return res.status(401); // UNAUTHORIZED
    }
  });

};
