const express = require('express');
const sql = require('../config/db');
const logger = require('../config/logger');
const router = express.Router();

// Interceptor, if no session do redirect
router.use((req, res, next) => {
    if(req.session != undefined && req.session.usr_id != undefined){
        next();
    }else{
        res.redirect('/');
    }
});

router.post('/getAptCodes', (req, res) => {
    var jsonArray = new Array();
    var jsonObj = new Object();

    var conn = new sql.Request();
    conn.stream = true;

    // set query
    var query = "SELECT TOP 5 APT_CODE, USR_ID FROM COUSRIF01 WHERE APT_CODE IN(@param, @param1)";

    // query param set
    conn.input('param', '00002'); // param set
    conn.input('param1', '00085'); // param set

    // execute query
    conn.query(query);

    conn.on('row', (row) => {
        jsonArray.push({
            apt_code : row.APT_CODE,
            usr_id : row.USR_ID
        });
    });

    conn.on('error', (err) => {
        jsonObj.err = true;
        jsonObj.errMsg = err;
        console.log(err);

        logger.err(err.message);
    });

    conn.on('done', (returnValue) => {
        if(jsonObj.err != true) jsonObj.list = jsonArray;
        res.json(jsonObj);
    });
});


module.exports = router;
