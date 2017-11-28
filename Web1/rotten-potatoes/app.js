var express = require('express')
var exphbs = require('express-handlebars')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var mongoose = require('mongoose')
var app = express()

var Review = mongoose.model('Review', {
    title: String,
    movieTitle: String,
    rating: Number,
    description: String
})

//--------------------------------------------------------------//

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', { useMongoClient: true, })

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//---------------------------INDEX------------------------------//

//GET
app.get('/', function (req,res) {
    Review.find(function(err, reviews) {
        if (err) {
            console.log(err)
            return
        }
        res.render('reviews-index', {reviews: reviews})
    })
})

//POST
app.post('/reviews', function (req, res) {
  Review.create(req.body, function(err, review) {
      console.log(review)

      res.redirect('/reviews/' + review._id)
  })
})

//GET
app.get('/reviews/new', function (req, res) {
    res.render('reviews-new', {})
})

//GET
app.get('/reviews/:id', function (req, res) {
    Review.findById(req.params.id).exec(function (err, review) {
        res.render('reviews-show', {review: review})
    })
})

//GET
app.get('/reviews/:id/edit', function (req, res) {
    Review.findById(req.params.id, function (err, review) {
        res.render('reviews-edit', {review: review})
    })
})

//PUT
app.put('/reviews/:id', function (req, res) {
    Review.findByIdAndUpdate(req.params.id, req.body, function(err, review) {
        res.redirect('/reviews/' + review._id)
    })
})

//DELETE
app.delete('/reviews/:id', function (req, res) {
    Review.findByIdAndRemove(req.params.id, function(err) {
        res.redirect('/')
    })
})

app.listen(process.env.PORT || 3000, function(){
    console.log('Portfolio App listening on port 3000!')
})