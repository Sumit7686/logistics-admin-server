const mongoose = require("mongoose");

const deliveryBoySchema = new mongoose.Schema(
  {
    role: { type: String, default: "deliveryBoy" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    area: { type: String, required: true },
    pincode: { type: Number, required: true },
    contact: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const DeliveryBoy = mongoose.model("DeliveryBoy", deliveryBoySchema);

module.exports = DeliveryBoy;
