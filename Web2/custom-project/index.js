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

//MIDDLEWARES
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/Web2-custom', { useMongoClient: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


require('./controllers/games.js')(app);
require('./controllers/auth.js')(app);


//ROUTES
app.get('/home', function (req, res) {
  res.render('home', {message: 'Hello World!'});
})

app.get('/', function(req, res) {
  Game.find({}).then((games) => {
    res.render('games-index', { games })
}).catch((err) => {
  console.log(err.message);
  })
})

app.get('/games/:id', function (req, res) {
   // LOOK UP THE POST
   Game.findById(req.params.id).then((game) => {
     res.render('game-show', { game })
   }).catch((err) => {
     console.log(err.message)
   })
 })

 app.get('/n/:console', function(req, res) {
   Game.find({ console: req.params.console }).then((games) => {
     res.render('games-index', { games })
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
        return res.status(401).send({ message: 'Wrong Username or Password' });
      }
      // Check the password
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          // Password does not match
          return res.status(401).send({ message: "Wrong Username or password"});
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
