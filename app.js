// .env file Read
require('dotenv').config();

// Require setup
const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
  logger('dev')
  , express.json()
  , express.urlencoded({ extended: false })
  , express.static(path.join(__dirname, 'public'))
  , cookieParser()

  // session setup
  , session({
    // genid: function(req){ // use UUIDs for session IDs
    //   //return genuuid()
    // },
    secret: '1@%24^%$3^*&98&^%$', // 쿠키에 저장할 connect.sid값을 암호화할 키값 입력
    resave: true,                 //세션 아이디를 접속할때마다 새롭게 발급하지 않음
    saveUninitialized: true,      //세션 아이디를 실제 사용하기전에는 발급하지 않음
    cookie: {
      secure:false,        // https에서만 cookie를 사용여부 설정(HTTPS에서만 작당)
      maxAge : 1000*60*60 // 만료 시간 설정 ms 단위
      //expires : 1000 // 만료 날짜를 GMT 시간으로 설정(maxAge와 동시 등록시 마지막것 사용)
    }    
  })
);

// Router Setting
app.use('/'       , require('./routes/index'));
app.use('/login'  , require('./routes/login'));
app.use('/data'   , require('./routes/dataBase'));
app.use('/mongo'  , require('./routes/mongo'));

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

// Server Start Check
app.listen(process.env.port, () =>{
  console.log('server start');
});

module.exports = app;
