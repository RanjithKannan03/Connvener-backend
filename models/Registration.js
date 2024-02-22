const mongoose=require("mongoose");

const RegistrationSchema = new mongoose.Schema({
  eventId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  attended: {
    type: Boolean,
    default: false,
  },
  attendedAt: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("Registration", RegistrationSchema);
