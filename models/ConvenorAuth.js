const mongoose=require("mongoose");

const schema = new mongoose.Schema({
  eventId: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  isTeam: {
    type: Boolean,
    default: false,
  },
  lastVisited: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("ConvenorAuth", schema);
