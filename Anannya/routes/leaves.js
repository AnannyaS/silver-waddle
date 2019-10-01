var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//var Leave = require('../models/leaves');


//Get Register
router.get('/apply',function(req,res){
    res.render('apply');
});

//Video register user
router.post('/apply',function(req,res){
    var name = req.user.username; 
    console.log( req.user.username +" applying");
   
    var applname = req.user.username;
    var applno = req.body.applno;
    var leaveType = req.body.leaveType;
    var fromDate = req.body.fromDate;
    var toDate = req.body.toDate;
    var lvdays = req.user.lvdays;
    var stndays = req.body.stndays;
    var stnout = req.body.stnout;
    var stnin = req.body.stnin;
    var chargeTakenBy = req.body.chargeTakenBy;
    var reason = req.body.reason;

    req.checkBody('leaveType', 'Enter Leave no.').notEmpty();
    req.checkBody('leaveType', 'Enter Leave Type').notEmpty();
    req.checkBody('fromDate', 'Enter Starting Date').notEmpty();
    req.checkBody('toDate', 'Enter End Date').notEmpty();
    req.checkBody('chargeTakenBy', 'Enter who takes up Charge of duty').notEmpty();
    req.checkBody('reason','Enter Reason').notEmpty();

    var errors = req.validationErrors();

    if(errors){
         res.render('apply',{
            errors: errors
        });
    }
    else{ leave.find({applno :  req.body.applno})
    .exec()
    .then(leave=> {
        if(leave != undefined){
            req.flash('warning_msg','This applno is taken');
            console.log('This applno is taken');
            next();
        }
        else{
            var newLeave = new Leave({
                'applname': req.user.username,
                'applno': req.body.applno,
                'name': req.body.username,
                'leaveType'  : req.body.leaveType,
                'fromDate' : req.body.fromDate,
                'toDate' : req.body.toDate,
                'lvdays' : req.body.lvdays,
                'stndays' : req.body.stndays,
                'stnout': req.body.stnout,
                'stnin'  : req.body.stnin,
                'chargeTakenBy' : req.body.chargeTakenBy,
                'reason' : req.body.reason,
                'rejoinDate' : req.body.rejoinDate,
                'status' : false                   
            });
            newLeave.save()
            .then(result =>{
                req.flash('success_msg','Successfully applied');
                res.redirect('/users/user');
                console.log("Sucessfully applied");
            });
          }
        });
    }
});



//Post Leave application
router.post('/apply',function(req,res){

    
    var name = req.user.username; 
    console.log( req.user.username +" applying");
   // vals['email'] = "new_email";
    // var newLeave = new User({
    //     // emp_name : req.body.emp_name,
    //     // emp_id : req.body.emp_id,
    //     stndays : req.body.stndays,
    //     rejoinDate : req.body.rejoinDate
    // });
    var newLeave = new Leave({
                'applname': req.user.username,
                'applno': req.body.applno,
                'name': req.body.username,
                'leaveType'  : req.body.leaveType,
                'fromDate' : req.body.fromDate,
                'toDate' : req.body.toDate,
                'lvdays' : req.body.lvdays,
                'stndays' : req.body.stndays,
                'stnout': req.body.stnout,
                'stnin'  : req.body.stnin,
                'chargeTakenBy' : req.body.chargeTakenBy,
                'reason' : req.body.reason,
                'rejoinDate' : req.body.rejoinDate,
                'status' : false                   
     });
     newLeave.save()
     .then(result =>{
         req.flash('success_msg','Successfully applied');
         res.redirect('/users/apply');
     })
});


module.exports = router;
