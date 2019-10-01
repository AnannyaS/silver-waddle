var mongoose = require('mongoose');

// defining schema for the "counters" collection
mongoose.connect('mongodb://localhost/seconddb',{useNewUrlParser: true});
const Schema = mongoose.Schema;
const addDetail = new Schema({
    _id: String,
    seq: Number,

},
{versionKey: false}
);

var Counter = module.exports = mongoose.model('Counter', addDetail,'counters');
 
// module.exports.getNextSequence = function(userid){
//   addDetail.update(
//                { _id: userid },
//                { $inc: { seq: 1 } },
//                function (err, data) {
//                   if(err) throw err;
//                   else{
//                       console.log("counter is " + data.seq);
//                       return data.seq; 
//                   }
//                 }
//              );
//   }

module.exports.getNextSequence = function(cb) {
  var ret = Counter.findOneAndUpdate(
                { "_id": "itemid" },
                { $inc: {"seq":1} },
                { upsert: true},
                function (err, data) {
                    if (err) cb(err, data);
                    else{    //3
                     console.log("counting from db " + data.seq);
                     cb(err,data.seq); 
                    };
                });
    console.log("Returning value: " + ret); //1
    return ret.seq;
}