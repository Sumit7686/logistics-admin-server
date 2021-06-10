const mongoose = require("mongoose");

const mettingSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    dateTime: { type: String },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Metting = mongoose.model("Metting", mettingSchema);

module.exports = Metting;
