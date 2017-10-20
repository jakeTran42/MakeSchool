var express = require('express')
var methodOverride = require('method-override')
var app = express()
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Game = mongoose.model('Game', {
    title: String,
    description: String,
    comment: String,
    rating: Number
});

var Fav = mongoose.model('Fav', {
    title: String,
    description: String,
    comment: String,
    rating: Number
});

mongoose.connect('mongodb://localhost/game-list');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))



//==============================================================//
// INDEX
app.get('/', function (req, res) {
    Game.find(function(err, games) {
        res.render('games-index', {games: games});
    })
})

// NEW
app.get('/games/new', function (req, res) {
    res.render('games-new', {});
  })

// CREATE
app.post('/games', function (req, res) {
    Game.create(req.body, function(err, game) {
      res.redirect('/games/' + game._id);
    })
  })

// SHOW
app.get('/games/:id', function (req, res) {
    Game.findById(req.params.id).exec(function (err, game) {
      res.render('games-show', {game: game});
    })
  });

// EDIT
app.get('/games/:id/edit', function (req, res) {
    Game.findById(req.params.id, function(err, game) {
      res.render('games-edit', {game: game});
    })
  })

// UPDATE
app.put('/games/:id', function (req, res) {
    Game.findByIdAndUpdate(req.params.id,  req.body, function(err, game) {
      res.redirect('/games/' + game._id);
    })
  })

// DELETE
app.delete('/games/:id', function (req, res) {
    Game.findByIdAndRemove(req.params.id, function(err) {
      res.redirect('/');
    })
  })
//====================================================//

app.get('/favs', function (req, res) {
  Fav.find(function(err, favs) {
    res.render('favs-index', {favs: favs});
  })
})




app.listen(3000, function () {
    console.log('Portfolio App listening on port 3000!')
  })
