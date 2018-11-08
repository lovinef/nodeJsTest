var express = require('express');
var sql = require('../config/db');
var router = express.Router();

// Interceptor, 세션 없으면 메인 화면으로 이동.
router.use(function(req, res, next) {
    if(req.session != undefined && req.session.usr_id != undefined){
        next();
    }else{
        res.redirect('/');
        
    }
});

router.post('/getAptCodes', function(req, res) {
    var jsonObj = new Object();
    var jsonArray = new Array();
    var conn = new sql.Request();
    conn.stream = true;

    conn.query('SELECT TOP 5 APT_CODE, USR_ID FROM COUSRIF01');
    conn.on('row', function(row) {
        jsonArray.push({
            apt_code : row.APT_CODE,
            usr_id : row.USR_ID
        });
    });
    conn.on('error', function(err) {
        console.log(err);
    });
    conn.on('done', function(returnValue) {
        jsonObj.result = 'success';
        jsonObj.list = jsonArray;
        res.json(jsonObj);
        
    });
});

module.exports = router;
