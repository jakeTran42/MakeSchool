//-----------------------------VARIABLES----------------------//
var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var games = [
  {title: "New Games"},
  {title: "Next Game"}
]


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



//-----------------------------ROUTES-------------------------//

app.get('/games', function (req, res) {
  res.render('games-index', {games: games});
})


//-----------------------------LISTENERS----------------------//
app.listen(3000, function () {
  console.log('Gif Search listening on port localhost:3000! Custom Project');
});

//End