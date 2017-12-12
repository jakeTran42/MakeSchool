require('dotenv').config();
var express = require('express')
var methodOverride = require('method-override')
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
var app = express()
var Game = require('./models/game');
const User = require('./models/user');
// const unirest = require()

//MIDDLEWARES
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/Web2-custom', { useMongoClient: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(cookieParser());

var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next()
}
app.use(checkAuth);


require('./controllers/games.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);


//ROUTES
app.get('/home', function (req, res) {
  res.render('home', {message: 'Hello World!'});
})

app.get('/', function(req, res) {

    var currentUser = req.user;

  Game.find({}).then((games) => {
    res.render('games-index', { games, currentUser })
}).catch((err) => {
  console.log(err.message);
  })
})


app.get('/n/:console', function(req, res) {

     var currentUser = req.user;

    Game.find({ console: req.params.console }).then((games) => {
     res.render('games-index', { games, currentUser })
    }).catch((err) => {
     console.log(err)
    })
});

app.get('/genre/:genre', function(req, res) {

     var currentUser = req.user;

    Game.find({ genre: req.params.genre }).then((games) => {
     res.render('games-index', { games, currentUser })
    }).catch((err) => {
     console.log(err)
    })
});


app.delete('/games/:id', function(req, res) {
    // is this user logged ?
    if (!req.user) {
        // return and respond 401 maybe redirect
        res.redirect('/login')
    }
    // does this user own this post ?
    Game.findOneAndRemove({ _id: req.params.id, author: req.user }).then((game) => {
        res.redirect('/')
    }).catch((err) => {
        console.log(err.message);
    })

    // find post by id and remove
    // Game.findByIdAndRemove(req.params.id, function (err) {
    //     res.redirect('/')
    // })
 });


// PORT LISTERNERS
app.listen(3000, function () {
  console.log('Portfolio App listening on port 3000!')
})


/*
// These code snippets use an open-source library. http://unirest.io/nodejs
unirest.get("https://ahmedakhan-game-review-information-v1.p.mashape.com/api/v1/information?console=xbox+360&game_name=call+of+duty+black+ops")
.header("X-Mashape-Key", "1Ag38Os2Uymsh8Bj74jdlQDBks42p1NTlETjsnn8mBCoOA3tDg")
.header("Accept", "application/json")
.end(function (result) {
  console.log(result.status, result.headers, result.body);
});
*/
