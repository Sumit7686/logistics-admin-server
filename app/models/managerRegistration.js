const mongoose = require("mongoose");

const managerSchema = new mongoose.Schema(
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

const Manager = mongoose.model("Admin", managerSchema);

module.exports = Manager;
