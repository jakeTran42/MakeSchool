require('dotenv').config();
var express = require('express')
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

app.get('/games/:id', function (req, res) {

    var currentUser = req.user;

   // LOOK UP THE POST
   Game.findById(req.params.id).then((game) => {
     res.render('game-show', { game, currentUser })
   }).catch((err) => {
     console.log(err.message)
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

// LOGOUT
 app.get('/logout', (req, res) => {
   res.clearCookie('nToken');
   res.redirect('/');
 });

 app.get('/login', (req, res) => {
    res.render('login');
  });

  app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Find this user name
    User.findOne({ username }, 'username password').then((user) => {
      if (!user) {
        // User not found
        return res.status(401).send({ message: 'Wrong Username' });
      }
      // Check the password
      user.comparePassword(password, (err, isMatch) => {

          console.log(password, err, isMatch);

        if (!isMatch) {
          // Password does not match
          return res.status(401).send({ message: "Wrong password"});
        }
        // Create a token
        const token = jwt.sign(
          { _id: user._id, username: user.username }, process.env.SECRET,
          { expiresIn: "60 days" }
        );
        // Set a cookie and redirect to root
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
        res.redirect('/');
      });
    }).catch((err) => {
      console.log(err);
    });
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
