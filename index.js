const express = require('express');
var app = express();
var path = require('path');
var router = require('./routes/router');

app.use(express.json());

app.use('/', router);

app.listen(3000,function(){
   console.log("App listening on port 3000");
});
