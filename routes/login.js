var express = require('express');
var sql = require('../config/db');
var router = express.Router();

router.post('/', function(req, res) {
    var json = req.body;
    var id = json.id;
    var pwd = json.pwd;

    var jsonObj = new Object();
    var conn = new sql.Request();   // DB connection
    conn.stream = true;
    
    var query = "SELECT COUNT(*) AS CNT FROM COUSRIF01 WHERE USR_ID = '" + id + "' AND USR_PWD = '" + pwd + "'";
    conn.query(query);
    conn.on('row', function(row) {
        console.log(row.CNT);
        if(row.CNT > 0){
            jsonObj.result = 'success';
        }else{
            jsonObj.result = 'login failed';
        }
    });
    conn.on('error', function(err) {
        console.log(err);
    });
    conn.on('done', function(returnValue) {
        if(jsonObj.result == 'success'){
            req.session.usr_id = id;
            res.redirect('/');
        }else{
            res.json(jsonObj);
        }
    });
});


router.post('/getSession', function(req, res) {
    var json = req.body;
    var usr_id = json.usr_id;

    if(session.usr_id == undefined){
        session.usr_id = usr_id;
    }

    res.redirect('/');
});

router.post('/sessionOut', function(req, res) {
    session.destroy();
    res.redirect('/');
});

router.post('/hasSession', function(req, res) {
   console.log(session.usr_id);

   // 결과 값 전달
   var jsonObj = new Object();

    if(session != undefined && session.usr_id != undefined){
        jsonObj.usr_id = session.usr_id;
        jsonObj.result = true;
    }else{
        jsonObj.result = false;
    }

   res.json(jsonObj);
});



module.exports = router;
