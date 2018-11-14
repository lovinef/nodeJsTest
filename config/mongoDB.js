const MongoClient = require('mongodb').MongoClient;
const Server = require('mongodb').Server;

// create mongoClient
const mongoClient = new MongoClient(
                    new Server(process.env.mongoDB_ip, process.env.mongoDB_port, {'native_parser':true})
                );

// create new connection
mongoClient.connect((err, client) => {
    if(err) throw err;
    console.log('mongo client has connected');
});

// set Tablespace
const db = mongoClient.db('mongodb_tutorial');

module.exports = db;