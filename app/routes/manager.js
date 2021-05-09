const app = require("express").Router();

// Models.
const DeliveryBoy = require("../models/deliveryBoyRegister");
const Admin = require("../models/adminRegister");
const Order = require("../models/order");

// Routes.
app.get("/personalDetailManager/:id", (req, res) => {
  const id = req.params.id;
  Admin.findById(id, (err, result) => {
    if (result) {
      return res.json({ isValid: true, message: result });
    } else {
      console.log("personal details manager error :", err.message);
      return res.json({ isValid: false, message: "Server Error." });
    }
  });
});

app.get("/allDeliveryBoyManager/:id", (req, res) => {
  const id = req.params.id;
  let city;
  Admin.findById(id, (err, result) => {
    if (result) {
      city = result.city;
      DeliveryBoy.find({ city })
        .then((result) => {
          res.json({ isValid: true, message: result });
        })
        .catch((err) => {
          console.log("manager all delivery boy error :", err);
          res.json({ isValid: false, message: "Server Error." });
        });
    } else {
      console.log("manager all admin delivery boy error :", err);
      res.json({ isValid: false, message: "Server Error." });
    }
  });
});

app.get("/managerAllOrder/:id", (req, res) => {
  const id = req.params.id;
  let City;
  Admin.findById(id, (err, result) => {
    if (result) {
      City = result.city;

      Order.find({ order_user_city: City })
        .then((result) => {
          const id = result[0].id;
          return res.json({
            isValid: true,
            message: result,
          });
        })
        .catch((err) => {
          console.log("manager all order error :", err.message);
          return res.json({
            isValid: false,
            message: "Your Order is not available.",
          });
        });
    } else {
      console.log("manager all oder error :", err);
      return res.json({
        isValid: false,
        message: "Server Error.",
      });
    }
  });
});

module.exports = app;
