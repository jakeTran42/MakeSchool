const express = require('express')
const app = express()
var exphbs  = require('express-handlebars');


// Middlewares
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Routes
app.get('/', function (req, res) {
  res.render('home', {msg: 'Hello World!'});
})



//Server
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
