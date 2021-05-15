const app = require("express").Router();
const authorization = require("../middleware/authorization");
const jwtGenerator = require("../utils/jwtGenerator");

// Models.
const Admin = require("../models/adminRegister");
const DeliveryBoy = require("../models/deliveryBoyRegister");
const Area = require("../models/area");

// Routes.
app.post("/registerAdmin", (req, res) => {
  let registerAdminData = Admin(req.body);

  registerAdminData
    .save()
    .then(() => {
      return res.json({ isValid: true, message: "Successfully save." });
    })
    .catch((err) => {
      console.log("register error :", err);
      return res.json({ isValid: false, message: "Server Error." });
    });
});

app.post("/registerDeliveryBoy", (req, res) => {
  let registerDeliveryBoyData = DeliveryBoy(req.body);

  registerDeliveryBoyData
    .save()
    .then(() => {
      return res.json({ isValid: true, message: "Successfully save." });
    })
    .catch((err) => {
      console.log("register error :", err);
      return res.json({ isValid: false, message: "Server Error." });
    });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  DeliveryBoy.find({ email, password })
    .select("email password role")
    .then((result) => {
      const id = result[0].id;
      const token = jwtGenerator(id);
      return res.json({
        isValid: true,
        token: token,
        id: result[0].id,
        role: result[0].role,
        message: "Login success Delivery Boy.",
      });
    })
    .catch(() => {
      Admin.find({ email, password })
        .select("email password role")
        .then((result) => {
          const id = result[0].id;
          const token = jwtGenerator(id);
          return res.json({
            isValid: true,
            token: token,
            id: result[0].id,
            role: result[0].role,
            message: "Login Success Manager.",
          });
        })
        .catch((err) => {
          //   console.log("login error :", err);
          return res.json({
            isValid: false,
            message: "Email ID & Password is not match.",
          });
        });
    });
});

app.get("/is-verify", authorization, async (req, res) => {
  try {
    return res.json({ isValid: true, message: true });
  } catch (err) {
    console.log("is verify error :", err.message);
    return res.json({ isValid: false, message: "Server Error." });
  }
});

app.post("/addArea", (req, res) => {
  const areaData = Area(req.body);

  areaData
    .save()
    .then(() => {
      res.json({ isValid: true, message: "Success Add Area." });
    })
    .catch((err) => {
      console.log("add area error :", err);
      res.json({ isValid: false, message: "Server Error." });
    });
});

module.exports = app;
