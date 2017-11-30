var express = require('express')
var app = express()
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Post = require('./models/post')



// Middlewares
mongoose.connect('mongodb://localhost/reddit-clone', { useMongoClient: true });
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));



//Requires
require('./controllers/posts.js')(app);





//Routes

//Index Route
app.get('/', function (req, res) {
  Post.find().exec(function (err, posts) {
    res.render('posts-index', { posts: posts });
  });
})

//New Form
app.get('/posts/new', function (req, res) {
    res.render('posts-new', {})
})

//Show Post
app.get('/posts/:id', function (req, res) {
    // LOOK UP THE POST
    Post.findById(req.params.id).exec(function(err, post) {

      // RESPOND BY RENDERING THE TEMPLATE
      res.render('post-show', { post: post });
    });
  });



//Host
app.listen(3000, function () {
  console.log('Portfolio App listening on port 3000!')
})
