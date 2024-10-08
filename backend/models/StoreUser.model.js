const { Schema, model, models } = require("mongoose");

const StoreUser = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  appartment: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  ZIP: { type: String, required: true },
  phNo: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  otp: { type: String }, 
  otpExpiresAt: { type: Date }, 
  createdAt: { type: Date, default: Date.now},  
});

module.exports = models.StoreUser || model("StoreUser", StoreUser);
