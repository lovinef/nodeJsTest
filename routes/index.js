var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/', (req, res) => {
    if(req.session != undefined && req.session.usr_id != undefined){
        res.render('index', { title: req.session.usr_id});
    }else{
        res.render('index', { title: 'Helo'});
    }
});

router.post('/rest', (req, res) => {
    req.accepts('application/json');

    var json = req.body;
    var req_name = json.name;
    var req_age = json.age;

    // JSON Object 생성
    var jsonObj = new Object();
    jsonObj.new_name = req_name + '_check';
    jsonObj.new_age = parseInt(req_age) + 20;

    res.json(jsonObj);
});

router.get('/downloadFile', (req, res) => {
    var filePath = "C:/Users/user/Downloads/abcd.png"; // Or format the path using the `id` rest param
    var fileName = "abcd.png";

    fs.exists(filePath, function(exists){
        if (exists) {
            // Content-type is very interesting part that guarantee that
            // Web browser will handle response in an appropriate manner.
            res.writeHead(200, {
                "Content-Type": "application/octet-stream",
                "Content-Disposition": "attachment; filename=" + fileName
            });
            fs.createReadStream(filePath).pipe(res);
        } else {
            res.writeHead(400, {"Content-Type": "text/plain"});
            res.end("ERROR File does not exist");
        }
    });
});

module.exports = router;
