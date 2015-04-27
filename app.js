/**
 * Created by ronfe on 15/3/28.
 */

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var pythonShell = require('python-shell');
var _ = require('underscore');
var async = require('async');

var app = express();
var port = process.env.PORT || 11700;

//Config bodyParser and cors
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

//routes for api
app.post('/textrank', function (req, res) {
    var result = [];
    var textrank = function(cb){
        var pyTT = new pythonShell('./calc.py');
        pyTT.send(req.body.url);
        pyTT.on('message', function(m){
            console.log('pyTT received');
            var r = m.split(',');
            cb(null, r);
        });
        pyTT.end(function(err){
            if (err){
                console.error(err);
            }
            console.log('pyTT closed');
        });
    };

    var loglikelihood = function(cb){
        var pyLL = new pythonShell('./calc2.py');
        pyLL.send(req.body.url);
        pyLL.on('message', function(message){
            var r = message.split(',');
            console.log('pyLL received');
            cb(null, r);
        });
        pyLL.end(function(err){
            if (err){
                console.error(err);
            }
            console.log('pyLL closed');
        });
    };

    async.parallel([textrank, loglikelihood], function(err, data){
        if (err){
            console.error(err);
        }
        var unionData = _.union(data[0], data[1]);
        var wordle = [];
        _.each(unionData, function(ele){
            if (_.contains(data[0], ele)){
                var n = data[0].length;
                var V1weight = 10 * (n - data[0].indexOf(ele)) / n;
            }
            else {
                var V1weight = 0;
            }

            if (_.contains(data[1], ele)){
                var n = data[1].length;
                var weight = 10 * (n - data[1].indexOf(ele)) / n + V1weight;
                wordle.push([ele, weight]);
            }
            else {
                wordle.push([ele, V1weight]);
            }
        });
        var out = [data[0], data[1], wordle];
        res.send(out);
    });
});

app.get('/', function (req, res) {
    res.end('hello world');
});

app.listen(port);
console.log('The app is listening on ' + port);
