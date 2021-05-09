const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    role: { type: String, default: "manager" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: Number, required: true },
    contact: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
