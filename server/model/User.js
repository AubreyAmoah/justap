const mongoose = require("mongoose");

const profilePath = 'http://localhost:5002/default.png';
const ts = Date.now();
const now = new Date(ts);

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: [true,'Please provide firstname'], default: null },
  last_name: { type: String, required: [true,'Please provide lastname'], default: null },
  email: { type: String, required: [true,'Please provide email'], unique: true },
  gender: {type: String, default: null},
  university: {type: String, default: null},
  level: {type: String, default: null},
  dob: {type: String, required: [true,'Please provide dob'], default: null},
  profile_pic: {type:String, default: profilePath},
  activated: {type:Boolean, default:"no"},
  chat_id: {type: String, default:""},
  createdAt: {type:String, default:now},
  password: { type: String },
  token: { type: String },
});

module.exports = mongoose.model("user", userSchema);