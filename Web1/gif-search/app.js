var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var http = require('http');
var giphy = require('giphy-api')();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

//GET gif search index
app.get('/', function (req, res) {
    var queryString = encodeURIComponent(req.query.term);
    console.log(queryString);
    if (queryString == "") {
        //load trending page if empty search
        giphy.trending(function (err, response) {
            res.render('home', {term: req.query.term, gifs: response.data});
        });
    } else {
        //load an update with
        giphy.search(queryString, function (err, response) {
            res.render('home', {term: req.query.term, gifs: response.data});
        });
    }
});

app.listen(3000, function() {
    console.log('Gif Search listening on port localhost:3000!');
});