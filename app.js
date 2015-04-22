/**
 * Created by ronfe on 15/3/28.
 */

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var pythonShell = require('python-shell');

var app = express();
var port = process.env.PORT || 11700;

//Config bodyParser and cors
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

//routes for api
app.post('/textrank', function (req, res) {
    var pyshell = new pythonShell('./calc.py');
    pyshell.send(req.body.url);
    pyshell.on('message', function (message) {
        console.log(message);
        res.end(message);
    });

    pyshell.end(function (err) {
        if (err) {
            console.error(err);
        }
        console.log('textrank finished');
    });
    //res.end('Hi ' + req.body.url);
});

app.post('/ll', function (req, res) {
    var pyshell = new pythonShell('./calc2.py');
    pyshell.send(req.body.url);
    pyshell.on('message', function (message) {
        console.log(message);
        res.end(message);
    });

    pyshell.end(function (err) {
        if (err) {
            console.error(err);
        }
        console.log('ll finished');
    });
    //res.end('Hi ' + req.body.url);
});

app.get('/', function (req, res) {
    res.end('hello world');
});

app.listen(port);
console.log('The app is listening on ' + port);
