const mongoose=require("mongoose");

const AccommodationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  kriyaId: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  residentialAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  breakfast1: {
    type: Boolean,
    default: false,
  },
  breakfast2: {
    type: Boolean,
    default: false,
  },
  breakfast3: {
    type: Boolean,
    default: false,
  },
  lunch1:{
    type:Boolean,
    default:false
  },
  lunch2:{
    type:Boolean,
    default:false
  },
  lunch3:{
    type:Boolean,
    default:false
  },
  dinner1: {
    type: Boolean,
    default: false,
  },
  dinner2: {
    type: Boolean,
    default: false,
  },
  amenities: {
    type: String,
    required: true,
  },
  days: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  payment: {
    type: Boolean,
    default: false,
  },
  room: {
    type: String,
  },
  vacated: {
    type:Boolean,
    default:false
  },
  room:{
    type:String
  }
});

module.exports = mongoose.model("Accommodation", AccommodationSchema);