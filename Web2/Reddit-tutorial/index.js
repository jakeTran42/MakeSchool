var express = require('express')
var app = express()
var exphbs  = require('express-handlebars');



// Middlewares
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');





//Routes
app.get('/', function (req, res) {
  res.render('home', {msg: 'Hello World!'});
})






//Host
app.listen(3000, function () {
  console.log('Portfolio App listening on port 3000!')
})
