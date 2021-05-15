const mongoose = require("mongoose");

const complaintsSchema = new mongoose.Schema(
  {
    deliveryBoy_id: { type: String },
    subject: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Complaints = mongoose.model("Complaints", complaintsSchema);

module.exports = Complaints;
