const mongoose=require("mongoose");

const paymentdetailSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    unique: true,
    required: true,
  },
  kriyaId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["WORKSHOP", "GENERAL", "PAPER_PRESENTATION"],
  },
  eventId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["INITIATED", "SUCCESS", "ERROR"],
    default: "INITIATED",
  },
  datetime: {
    type: Date,
    required: true,
  }
});

module.exports = mongoose.model("PaymentDetail", paymentdetailSchema);
