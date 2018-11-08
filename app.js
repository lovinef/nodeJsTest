require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var loginRouter = require('./routes/login');
var indexRouter = require('./routes/index');
var dataBaseRouter = require('./routes/dataBase');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: '1@%24^%$3^*&98&^%$', // 쿠키에 저장할 connect.sid값을 암호화할 키값 입력
  resave: true,                //세션 아이디를 접속할때마다 새롭게 발급하지 않음
  saveUninitialized: true       //세션 아이디를 실제 사용하기전에는 발급하지 않음
}));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/data', dataBaseRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');

  req.accepts('application/json');

  console.log(err.message);

  res.json({
    system_msg: "error",
      system_msg_detail: err.message
  });
});


app.listen(process.env.port, function(){
  console.log("server on");
});

module.exports = app;
