const app = require("express").Router();

// Models.
const DeliveryBoy = require("../models/deliveryBoyRegister");
const Order = require("../models/order");

// Routes.
app.get("/personalDetailDeliveryBoy/:id", (req, res) => {
  const id = req.params.id;

  DeliveryBoy.findById(id, (err, result) => {
    if (result) {
      return res.json({ isValid: true, message: result });
    } else {
      console.log("personal detail delivery boy error :", err);
      return res.json({ isValid: false, message: "Server Error" });
    }
  });
});

app.get("/deliveryAllOrder/:id", (req, res) => {
  const id = req.params.id;
  let pincode;

  DeliveryBoy.findById(id, (err, result) => {
    if (result) {
      pincode = result.pincode;

      Order.find({ order_user_pincode: pincode })
        .then((result) => {
          const id = result[0].id;
          return res.json({ isValid: true, message: result });
        })
        .catch((err) => {
          // console.log("delivery boy all order error :", err.message);
          return res.json({
            isValid: false,
            message: "Your Order is not Found.",
          });
        });
    } else {
      console.log(err);
      return res.json({ isValid: false, message: "Server Error." });
    }
  });
});

module.exports = app;
