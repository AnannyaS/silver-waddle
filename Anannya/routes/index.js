var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

var Leave = require('../models/leave');
var Counters = require('../models/add');

//Get homepage
router.get('/', verifyToken, function(req, res) {
    res.render('index');
});  

//Get user profile
router.get('/users/user',verifyToken, function(req,res){  
    Leave.find({applname : req.user.username }).then(function(leaves){
        Counters.find({}, function(seq){
            res.render('user',{
                leave: leaves,
                seq: seq
        });
     });  
     console.log("This is " + req.user.username);
    });
});

//Get admin profile 
router.get('/users/admin',verifyToken, function(req,res){
    Leave.find().then(function(leaves){
        Counters.find({}, function(seq){
            res.render('admin',{
                leave: leaves,
                seq: seq
             });
          });  
    });
});

//Get attendance
router.get('/users/attendance',verifyToken, function(req,res){
    res.render('calendar');
});

//Get apply
router.get('/users/apply',verifyToken, function(req,res){
    res.render('apply');
});

function verifyToken(req, res, next) {
    jwt.verify(req.session.token, 'secretkey', (err, authUser) => {
        if (err) {
            res.redirect('/users/login');
        } else {
            next();
        }
    });
}

module.exports = router;