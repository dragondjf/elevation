var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs= require('fs');  
var path = require('path');
var db  = require('./db');

function createSql(sql, params, callback) {
    if (callback) {
        return callback(null, {
            sql: sql,
            params: params
        });
    }
    return {
        sql: sql,
        params: params
    };
}


var modSql = 'INSERT INTO mapdata SET ?';
/* GET home page. */
router.get('/', function(req, res, next) {
   fs.readFile(path.join(__dirname, 'public/index.html'), function (err, bytesRead) {  
        if (err) 
            throw err;  
        res.send(bytesRead);
    });
});

router.post("/elevation", function(req, res) {
    if (req.body.length > 0){
        var sqls = [];
        for (var i = 0; i < req.body.length; i++) {
            sqls.push(createSql(modSql, req.body[i]));
        }

        db.execTrans(sqls, function(err, info){
            if(err){
               console.error("事务执行失败");
            }else{
               console.log("插入成功.");
            }
        })
        res.json(req.body);
    }
    else{
        res.json({"status": "fail"});
    }
});

module.exports = router;
