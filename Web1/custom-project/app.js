//-----------------------------VARIABLES----------------------//
var express = require('express');
var methodOverride = require('method-override')
var app = express();
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Game = mongoose.model('Game', {
  title: String,
  description: String,
  comment: String,
  rating: Number
});


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
mongoose.connect('mongodb://localhost/Custom-Game-List');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))



//-----------------------------ROUTES-------------------------//

app.get('/', function (req, res) {
  Game.find(function(err, games) {
      res.render('games-index', {games: games});
  })
})

//New
app.get('/games/new', function (req, res) {
    res.render('games-new', {});
})

//CREATE
app.post('/games', function (req, res) {
    Game.create(req.body, function(err, game) {
        console.log(game);
        res.redirect('/games/' + game._id);
    })
})

//SHOW
app.get('/games/:id', function (req, res) {
    Game.findById(req.param.id).exec(function (err, game) {
        res.render('games-show', {game: game});
    })
});

//EDIT
app.get('/games/:id/edit', function (req, res) {
  Game.findById(req.params.id, function(err, game) {
    res.render('games-edit', {game: game});
  })
})

// UPDATE
app.put('/games/:id', function (req, res) {
  Games.findByIdAndUpdate(req.params.id,  req.body, function(err, game) {
    res.redirect('/games/' + game._id);
  })
})

//-----------------------------LISTENERS----------------------//
app.listen(3000, function () {
  console.log('Gif Search listening on port localhost:3000! Custom Project');
});

//End
