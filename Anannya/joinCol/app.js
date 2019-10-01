var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-Parser');
var exphbs = require('express-handlebars');
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.Promise =  require('bluebird');

 app = express();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection('users').aggregate([
    { $lookup:
      {
        from: 'leaves',
        localField: 'name',
        foreignField: 'applname',
        as: 'userLeaves'
      }
    }
  ]).toArray(function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res));
  });
});

app.listen(4000, function(req,res){
    console.log ('Listening to port 4000');
});
