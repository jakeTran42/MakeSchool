require('dotenv').config();
var express = require('express');
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
var app = express();
var Post = require('./models/post');
var User = require('./models/user');



// Middlewares
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/reddit-clone', { useMongoClient: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'))
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

var checkAuth = function(req, res, next) {
    console.log("Checking authentication")

    if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
        req.user = null
    } else {
        var token = req.cookies.nToken
        var decodedToken = jwt.decode(token, { complete: true }) || {}
        req.user = decodedToken.payload
    }
    next()
}

app.use(checkAuth)



//Requires
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app)





//========================ROUTES

//Index Route

// app.get('/', function (req, res) {
//   Post.find().exec(function (err, posts) {
//     res.render('posts-index', { posts: posts });
//   });
// })

app.get('/', function (req, res) {
    Post.find({}).then((posts) => {
      res.render('posts-index.handlebars', { posts })
      console.log(req.cookies);
    }).catch((err) => {
      console.log(err.message);
    })
})

//New Form
app.get('/posts/new', function (req, res) {
    res.render('posts-new', {})
})

//Show Post

// app.get('/posts/:id', function (req, res) {
//     // LOOK UP THE POST
//     Post.findById(req.params.id).exec(function(err, post) {
//
//       // RESPOND BY RENDERING THE TEMPLATE
//       res.render('post-show', { post: post });
//     });
//   });

app.get('/posts/:id', function (req, res) {
   // LOOK UP THE POST
   Post.findById(req.params.id).populate('comments').then((post) => {
     res.render('post-show.handlebars', { post })
   }).catch((err) => {
     console.log(err.message)
   })
 })


// SUBREDDIT
 app.get('/r/:subreddit', function(req, res) {
     Post.find({ subreddit: req.params.subreddit }).then((posts) => {
       res.render('posts-index.handlebars', { posts })
     }).catch((err) => {
       console.log(err)
     })
  });

//logout
app.get('/logout', (req, res) => {
    res.clearCookie('nToken');
    res.redirect('/');
  });

//Login Form
app.get('/login', (req, res) => {
    res.render('login.handlebars');
  });

// LOGIN
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


//Host
app.listen(3000, function () {
  console.log('Portfolio App listening on port 3000!')
})
