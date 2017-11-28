var express = require('express')
var app = express()
var exphbs  = require('express-handlebars');

//MIDDLEWARES
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//ROUTES
app.get('/home', function (req, res) {
  res.render('home', {message: 'Hello World!'});
})



// PORT LISTERNERS
app.listen(3000, function () {
  console.log('Portfolio App listening on port 3000!')
})
