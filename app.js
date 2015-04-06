/**
 * Created by ronfe on 15/3/28.
 */

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 11700;

//Config bodyParser and cors
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

//routes for api
app.get('/url?u=:uu', function (req, res) {
    res.end('Server received request of url: ' + req.params.uu);
});

app.post('/url', function (req, res) {
    res.end('Hi ' + req.body.url);
});

app.get('/', function (req, res) {
    res.end('hello world');
});

app.listen(port);
console.log('The app is listening on ' + port);