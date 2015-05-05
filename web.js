var express = require('express');
var app = express();

app.use('/', function (req, res, next) {

    if (    req.url.indexOf("/p") == 0 ||
        req.url.indexOf("/u") == 0 ||
        req.url.indexOf("/o") == 0 ||
        req.url.indexOf("/signup") == 0 ||
        req.url.indexOf("/login") == 0 ||
        req.url.indexOf("/logout") == 0 ||
        req.url.indexOf("/not-found") == 0 ||
        req.url.indexOf("/icons") == 0 ||
        req.url.indexOf("/styleguide") == 0) {

        res.sendFile(__dirname + "/build/index.html");
    } else {
        next();
    }
});

app.use(express.static(__dirname + '/build'));
app.listen(3000);
console.log("Listening at port 3000.");