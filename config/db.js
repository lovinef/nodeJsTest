var sql = require('mssql');
var config = {
    user: "sa",
    password: "Qwer!@#$",
    database: "APT_TAX",
    server: "192.168.10.200",
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