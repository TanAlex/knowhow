var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
const bodyParser = require('body-parser');




var app = express();



var DB = require('./libs/DB');

//docker-compose -e ENVIRONMENT=PROD up -d
//ENVIRONMENT can be "DEV", "PROD", "STAGING"
const env = process.env.ENVIRONMENT || "DEV"
global.configs = require(`./configs/configs.${env}.js`);
global.db = new DB(configs.dbConfig);
app._services = require('./services')({ db, configs });

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var store = new MySQLStore(configs.dbSessionOptions);

//var RedisStore = require('connect-redis')(session);
//var store = new RedisStore(configs.redisOptions);

configs.sessionOptions.store = store;

app.use(session(configs.sessionOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

// Start GraphQL related part

const graphql = require("./graphql");
graphql.addToApp(app);

// End GraphQL related part

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
