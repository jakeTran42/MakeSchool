var express = require('express')
var app = express()
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Post = require('./models/post')



// Middlewares
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/reddit-clone', { useMongoClient: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'))
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));



//Requires
require('./controllers/posts.js')(app);





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
   Post.findById(req.params.id).then((post) => {
     res.render('post-show.handlebars', { post })
   }).catch((err) => {
     console.log(err.message)
   })
 })

 app.get('/r/:subreddit', function(req, res) {
     Post.find({ subreddit: req.params.subreddit }).then((posts) => {
       res.render('posts-index.handlebars', { posts })
     }).catch((err) => {
       console.log(err)
     })
  });


//Host
app.listen(3000, function () {
  console.log('Portfolio App listening on port 3000!')
})
