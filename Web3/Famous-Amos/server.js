if (!process.env.PORT) {
  require('dotenv').config()
}

const express = require('express');
var http = require('http').Server(express);
const router = express.Router();
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const paginate = require('express-paginate');

const index = require('./routes/index');
const pets = require('./routes/pets');
const comments = require('./routes/comments');
const purchases = require('./routes/purchases');

const flash = require('express-flash');
const session = require('express-session');
const app = express();
const sendMail = require('./routes/sendMail');

//Sending email
// app.use('/api/v1/communicate', sendMail)

//flash
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

const Sequelize = require('sequelize');
const sequelize = new Sequelize('famous-amos', 'Insui', 'secret', {
  host: 'localhost',
  dialect: 'postgres'
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

//Pagination MW
app.use(paginate.middleware(4, 50));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/pets', pets);
app.use('/pets/:petId/comments', comments);
app.use(purchases);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  if(err.status == 404) {
  //do logging and user-friendly error message display
    res.redirect('/404.html');
  } else if (err.status == 500) {
    res.redirect('/500.html');
  }
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Socket message
// router.get('/pets/:id', function(req,res) {
//     res.sendFile(__dirname + '/views/layout.pug')
// });
//
// setInterval( function() {
//     const status = ['Planning World Domination', 'Playing Piano', 'Breeding', 'Eating Cats', 'Filing Taxes']
//     let randomIndex = Math.floor(Math.random() * 4 )
//     io.emit('status', { currentStatus: status[randomIndex] });
//     // console.log(status[randomIndex])
// }, 5000)


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = app;
