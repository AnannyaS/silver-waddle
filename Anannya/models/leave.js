var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/seconddb',{useNewUrlParser: true});
const Schema = mongoose.Schema;

const LeaveDetail = new Schema({
    applname: String,
    applno: String,
    emp_cd: String,
    fromDate: Date,
    toDate: Date,
    lvdays : Number,
    reason: String,
    leaveType : String,
    chargeTakenBy: String,
    rejoinDate: Date,
    action: Boolean,
    status: String
},
{versionKey: false}
);

var leave = module.exports = mongoose.model('Leave', LeaveDetail,'leave');