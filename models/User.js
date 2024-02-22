const mongoose=require("mongoose");

const userSchema = new mongoose.Schema({
  kriyaId: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: [true, "Email required"],
    unique: [true, "Email already registered"],
  },
  name: String,
  profilePhoto: {
    type: String,
    default: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
  },
  password: String,
  source: {
    type: String,
    enum: ["google", "email"],
    required: [true, "source not specified"],
    default: "email",
  },
  lastVisited: {
    type: Date,
    default: new Date(),
  },
  isPSGStudent: {
    type: Boolean,
    default: false,
  },
  college: {
    type: String,
  },
  department: {
    type: String,
  },
  year: {
    type: Number,
  },
  phone: {
    type: String,
  },
  referral: {
    type: String,
  },
  accomodation: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  googleId: String,
  isPaid: {
    type: Boolean,
    default: false,
  },
  kit: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("User", userSchema);
