var express = require('express')
var app = express()
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');



// Middlewares
mongoose.connect('mongodb://localhost/reddit-clone', { useMongoClient: true });
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));



//Requires
require('./controllers/posts.js')(app);





//Routes
app.get('/', function (req, res) {
  res.render('home', {msg: 'Hello Reddit!'});
})

app.get('/posts/new', function (req, res) {
    res.render('posts-new', {})
})




//Host
app.listen(3000, function () {
  console.log('Portfolio App listening on port 3000!')
})
