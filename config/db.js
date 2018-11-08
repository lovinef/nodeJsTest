var sql = require('mssql');
var config = {
    user: process.env.ms_user,
    password: process.env.ms_password,
    database: process.env.ms_database,
    server: process.env.ms_server,
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