const app = require("express").Router();

// Models.
const Admin = require("../models/adminRegister");
const DeliveryBoy = require("../models/deliveryBoyRegister");
const User = require("../models/user");
const Order = require("../models/order");

// Routes.
app.get("/personalDetailAdmin/:id", (req, res) => {
  const id = req.params.id;
  Admin.findById(id, (err, result) => {
    if (result) {
      return res.json({ isValid: true, message: result });
    } else {
      console.log("personal detail admin error :", err.message);
      return res.json({ isValid: false, message: "Server Error." });
    }
  });
});

app.get("/allManager", (req, res) => {
  Admin.find()
    .then((result) => {
      return res.json({ isValid: true, message: result });
    })
    .catch((err) => {
      console.log("all manager error :", err);
      return res.json({ isValid: false, message: "Server Error." });
    });
});

app.delete("/deleteManager/:id", (req, res) => {
  const id = req.params.id;

  Admin.findByIdAndDelete(id, (err, result) => {
    if (result) {
      res.json({ isValid: true, message: "User Delete Successfully." });
    } else {
      res.json({ isValid: false, message: "Server Error." });
    }
  });
});

app.get("/allDeliveryBoyAdmin", (req, res) => {
  DeliveryBoy.find()
    .then((result) => {
      return res.json({ isValid: true, message: result });
    })
    .catch((err) => {
      console.log("Delivery Boy error :", err);
      return res.json({ isValid: false, message: "Server Error." });
    });
});

app.delete("/deleteDeliveryBoyAdmin/:id", (req, res) => {
  const id = req.params.id;

  DeliveryBoy.findByIdAndDelete(id, (err, result) => {
    if (result) {
      res.json({ isValid: true, message: "User Delete Successfully." });
    } else {
      res.json({ isValid: false, message: "Server Error." });
    }
  });
});

app.get("/allUser", (req, res) => {
  User.find()
    .then((result) => {
      return res.json({ isValid: true, message: result });
    })
    .catch((err) => {
      console.log("all user error :", err);
      return res.json({ isValid: false, message: "Server Error." });
    });
});

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;

  User.findByIdAndDelete(id, (err, result) => {
    if (result) {
      res.json({ isValid: true, message: "User Delete Successfully." });
    } else {
      res.json({ isValid: false, message: "Server Error." });
    }
  });
});

app.get("/allOrder", (req, res) => {
  Order.find()
    .then((result) => {
      return res.json({ isValid: true, message: result });
    })
    .catch((err) => {
      console.log("all order error :", err);
      return res.json({ isValid: false, message: "Server Error." });
    });
});

module.exports = app;
