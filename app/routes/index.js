var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs= require('fs');  
var path = require('path');  

/* GET home page. */
router.get('/', function(req, res, next) {
   fs.readFile(path.join(__dirname, 'public/index.html'), function (err, bytesRead) {  
        if (err) 
            throw err;  
        res.send(bytesRead);
    });
});

router.post("/evelation", function(req, res) {
    console.log(req.body[0]);
    res.json(req.body);
});

module.exports = router;
