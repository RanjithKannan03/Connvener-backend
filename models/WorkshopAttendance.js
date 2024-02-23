const mongoose=require("mongoose");

const schema = new mongoose.Schema({
  eventId: {
    required: true,
    type: String,
  },
  email:{
    type:String,
    required:true
  },
  attended:{
    type:Boolean,
    default:false
  },
  attendedAt:{
    type:Date,
    default:null
  }
});

module.exports = mongoose.model("WorkshopAttendance", schema);
