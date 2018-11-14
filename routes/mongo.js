const express = require('express');
const db = require('../config/mongoDB');
const router = express.Router();

router.post('/connectTest', (req, res) =>{
    db.collection('orders').find().toArray((err, docs)=>{
        docs.forEach((v, i, ar) =>{
            console.log(v.item.category);
        });
        res.send(docs);
    });
});

module.exports = router;
