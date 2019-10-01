var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var User = require('../models/user');
var Leave = require('../models/leave');
var Counter = require('../models/add');

// var countt = Counter.getNextSequence("itemid", function(err,data){
//     if (err) throw err;
//     if(data){
//         console.log("from the function " + data.seq);
//         return (null,data.seq);
//     }
// });
//console.log("counter value  " + Counter.getNextSequence('itemid'));




//Get Register
router.get('/register',function(req,res){
    res.render('register');
}); 

//Get login
router.get('/login',function(req,res){
    res.render('login');
});

//Video register user
router.post('/register',function(req,res){
       
    var username = req.body.username;
    var email = req.body.email;
    var checkAdmin = req.body.checkAdmin;
    var password = req.body.password;
    var confirmpassword = req.body.confirmpassword;

    req.checkBody('username', 'Enter Username').notEmpty();
    req.checkBody('email','Enter E-mail').isEmail();
    req.checkBody('password','Enter password').notEmpty();
    req.checkBody('confirmpassword','Confirm password').equals(req.body.password);

    var errors = req.validationErrors();

    if(errors){
         res.render('register',{
            errors: errors
        });
    }
    else{ User.findOne({username :  req.body.username})
    .exec()
    .then(user => {
        if(user != undefined){
            req.flash('warning_msg','Already registered');
            console.log('Already registered');
        }
        else{
            bcrypt.hash(req.body.password,12,function(err,hash){
                if (err) throw err;
                else{
                    var newUser = new User({
                       username : username,
                       email : email,
                       checkAdmin : checkAdmin,
                       password : hash                  
                    });
                    newUser.save()
                    .then(result =>{
                        req.flash('success_msg','Successfully registered');
                        res.redirect('/users/login');
                    })
                    .catch(err=>{
                        console.log(err);
                    });
                }
            });
        }
    });
     req.flash('success_msg','Registered');
     res.redirect('/users/login');
    }
});
        



passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({username: username}, function(err, user ) {
            if (err) throw err; 
            if (!user )
             { 
            return done(null, false, {message:'Incorrect Username'}); }
            User.comparePassword(password,user.password,function(err,isMatch){
                if(err) throw err;
                if(isMatch){                 
                    return done(null,user,{message:'Access Granted'
                                            //,token: token
                    });
                }
                else{
                    return done(null,false,{message:'Invalid Password'});
                }
            });
        });
    })
);


passport.serializeUser(function(user , done){
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user ) {
        done(err, user );
    });
});

router.post('/login',
    passport.authenticate('local',{failureRedirect: "/users/login",failureFlash: true}),
    function(req,res){
        const token = jwt.sign({
            username: req.username,
            password: req.password
        }, 'secretkey',{expiresIn : 600});
      console.log(token);
      console.log('creating token');
      req.session.token = token;
      console.log(req.session.token);
      console.log(req.session.cookie);
     // var name = req.user.username;
      var arr = req.user.leaveBal;
      console.log( req.user.username +" trying for " + arr)
    //   var sum=0;
    //   for(var i=0; i<arr.length; i++){
    //     sum= sum + arr[i]; 
    //   }
     
    //   User.updateOne({"username": req.user.username},
    //                  { $set : {"totLvBal" : sum} },
    //                  function(err, result) {
    //                     if (err) {
    //                         console.log(err);   
    //                     }
    //                     else {
    //                         req.flash('Successfully added');
    //                         //console.log('Successfully added '+ req.user.totLvBal); 
    //                     }
    //                   }
    //                  );
    //  console.log("no. of days " + sum);

      if (req.user.checkAdmin == true){
        res.redirect('/users/admin');
         console.log(req.user.checkAdmin);
      }else{
        res.redirect('/users/user');
        console.log(req.user.checkAdmin);
      }
});


//Post Leave application
router.post('/apply',function(req,res){
  //  var name = req.user.username; 
    console.log( req.user.username +" applying");
   
    var applname = req.user.username;
    var leaveType = req.body.leaveType;
    var fromDate = req.body.fromDate;
    var toDate = req.body.toDate;
    var lvdays = req.body.lvdays;
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
    else{ 
        // Leave.findOne({applno :  req.body.applno}, function( err,  lvappl){
        // if (err) throw err;
        // if (!lvappl){
            // var retval = ret("itemid",function(err,data){
            //                 if(err) throw err;
            //                 if(data){                 
            //                     return data ;
            //                     }
            //      });
         var x = 0;
        Counter.getNextSequence("itemid", function(err, res){
            if(!err){
               x = res; 
            }
            console.log ("value of x: " + x);
        });
         
            var newLeave = new Leave({
                'applname': req.user.username,
                'applno': req.user.emp_cd + "/" + x,
                'emp_cd': req.user.emp_cd,
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
                'action': true,
                'status': "PENDING"
            });
            newLeave.save()
            .then(result =>{
                req.flash('success_msg','Successfully applied');
                res.redirect('/users/user');
                console.log("Sucessfully applied");
            });
    }
});
        // if (lvappl != undefined){
        //     req.flash('warning_msg','This applno is taken');
        //     console.log('This applno is taken' + lvappl);
        //     res.redirect('/users/apply');


// Delete leave
router.delete('/delete/:id',function(req,res){
    console.log(req.params);
    console.log('hi...in delete');
    Leave.deleteOne({applno: req.params.id},function(errss,resuts){
      //console.log('hi');
          if(errss){
            console.log(errss);
          }else{
          res.redirect('/admin');}
    });
  });

  // Approve leave
router.put('/approve/:id',function(req,res){
    Leave.findOneAndUpdate(
        {applname: req.params.id},
        { $set: { "status" : false } }, //Set status= false when leave is approved
        function(errss,result){
          if(errss){
            console.log(errss);
          }else{
          console.log("status:" + result.status);
          res.redirect('/admin');
        }
    });
  });

//Get logout
router.get('/logout', function(req,res){
    req.logout();
    req.session.destroy(function(err) {
        if(err) throw err;
        res.redirect('/');
    });
    console.log("in logout");
    //req.flash('success_msg','You are logged out');  
});




module.exports = router;
