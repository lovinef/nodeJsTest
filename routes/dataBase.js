var express = require('express');
var sql = require('../config/db');
var router = express.Router();

// Interceptor, if no session do redirect
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

    // Create new db connection
    var conn = new sql.Request();
    conn.stream = true;

    // set query
    var query = "SELECT TOP 5 APT_CODE, USR_ID FROM COUSRIF01 WHERE APT_CODE = @param";

    // query param set
    conn.input('param', '00002'); // param set

    // excute query
    conn.query(query);
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
        jsonObj.list = jsonArray;
        res.json(jsonObj);
    });
});

module.exports = router;
