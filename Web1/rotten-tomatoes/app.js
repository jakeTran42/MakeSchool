var express = require('express')
var app = express()
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
var Review = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String
});

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));  
mongoose.connect('mongodb://localhost/rotten-tomatoes');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



app.get('/', function (req, res) {
    Review.find(function(err, reviews) {
        res.render('reviews-index', {reviews: reviews});
    })
})

// NEW
app.get('/reviews/new', function (req, res) {
    res.render('reviews-new', {});
})

//Create
app.post('/reviews', function (req, res) {
    Review.create(req.body, function(err, review) {
      res.redirect('/reviews/' + review._id);
    })
})

// SHOW
app.get('/reviews/:id', function (req, res) {
    Review.findById(req.params.id).exec(function (err, review) {
      res.render('reviews-show', {review: review});
    })
});

app.listen(3000, function () {
  console.log('Portfolio App listening on port 3000!')
})