var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Friend = require('./Friend.model');

var db = 'mongodb://localhost/frnd';

mongoose.connect(db);

app.use(bodyParser.json({
    extended: false
}));

app.get('/friends', function(req,res){
    console.log('Getting all friends');
    Friend.find({}).exec(function(err, friends){
        if(err){
            res.send('An error has occured');
        } else{
            console.log(friends);
           // res.set('Content-Type', 'text/html');
            res.json(friends);
        }
    });
});

app.get('/friends/:id', function(req,res){
    console.log('Getting one friend');
    Friend.findOne({
    _id: req.params.id
    }).exec(function(err, friend){
        if(err){
            res.send('An error has occured');
        } else{
            console.log(friend);
           // res.set('Content-Type', 'text/html');
            res.json(friend);
        }
    });
});

app.post('/friends', function(req, res){
    var newFriend = new Friend();
    newFriend.name = req.body.name;
    newFriend.company = req.body.company;

    newFriend.save(function(err, friend){
        if(err){
            res.send('Error saving friend');
        }else{
            console.log(friend);
            res.send(friend);
        }
    });
});

app.put('/friends/:id', function(req, res){
    Friend.findOneAndUpdate({
        _id: req.params.id
    },{$set:{name: req.body.name}},
        {upsert: true},
    function(err, newFriend){
        if(err){
            console.log('Error occured');
        } else {
            console.log(newFriend);
            res.send(newFriend);
        }
    });
});

app.delete('/friends/:id', function(req, res){
    Friend.findOneAndRemove({
        _id: req.params.id
    },function(err, friend){
        if(err){
            console.log('Error deleting');
        } else {
            console.log(friend);
            res.send(friend);
        }
    });
});

var port = 8989;

app.listen(port, function(){
    console.log('Server started on port: ' + port);
});