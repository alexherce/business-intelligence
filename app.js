const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const uuidv4 = require('uuid/v4');

const db = require('./db/mysql');
const indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Connect to MySQL on start
db.connect(db.MODE_PRODUCTION, function(err) {
  if (err) {
    console.log('ERROR: Unable to connect to MySQL!');
  } else {
    console.log('Connected to MySQL...');
  }
})

app.use(session({
  genid: function(req) {
    return uuidv4(); // use UUIDs for session IDs
  },
  secret: 'YL!a:9CN/?TZF?$s)zZc7~mAH)<MgmUz2tA%L<zSM=Sa7s/b]7BR^En%!y!dtrGNRpc5g<Y94[=&>%KnWzj;"rVe4xh_b[RzYb:MS{Sz)~:+*AH>dj~Wa8$',
  name: 'id',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/', indexRouter);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  })
});

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
