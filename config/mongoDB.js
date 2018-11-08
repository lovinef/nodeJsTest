var sql = require('mongoose');

var config = {
    user: "sa",
    password: "Qwer!@#$",
    database: "APT_TAX",
    server: "197.0.0.1",
    stream: true
};

var conn = sql.connect(config, function(err){
    if(err){
        console.log(err);
    }else{
        console.log('connection is established');
    }
});

module.exports = sql;