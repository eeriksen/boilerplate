var express = require('express');
var app = express();

app.use('/', function (req, res, next) {

    if (req.url.indexOf("/app") < 0) {
        res.sendFile(__dirname + "/build/index.html");
    } else {
        next();
    }
});

app.use(express.static(__dirname + '/build'));
app.listen(3000);
console.log("Listening at port 3000.");