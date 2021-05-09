const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema(
  {
    city_name: { type: String, required: true },
    area_name: { type: String, required: true },
    area_pincode: { type: String, required: true },
  },
  { timestamps: true }
);

const Area = mongoose.model("Area", areaSchema);

module.exports = Area;
