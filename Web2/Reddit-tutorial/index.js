const express = require('express')
const app = express()
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');



// Middlewares
mongoose.connect('mongodb://localhost/Reddit-tutorial');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Requires
require('./controllers/posts.js')(app);


//Routes
app.get('/', function (req, res) {
  res.render('home', {msg: 'Hello World!'});
})

app.get('/posts/new', function (req, res) {
    res.render('posts-new', {});
})




//Server
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
