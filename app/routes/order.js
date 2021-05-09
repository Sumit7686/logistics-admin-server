const app = require("express").Router();

// Models.
const Order = require("../models/order");
const Area = require("../models/area");

// Routes.
app.post("/order/:id", (req, res) => {
  // id = user_id.
  const orderData = Order(req.body);
  const userID = req.params.id;
  const AWB_Number = Math.floor(Math.random() * 1000000) + 1111111;
  const Order_Id = Math.floor(Math.random() * 1000000000) + 1111111111;

  Area.find({
    city_name: orderData.order_user_city,
    area_name: orderData.order_user_area,
    area_pincode: orderData.order_user_pincode,
  })
    .select("city_name area_name area_pincode")
    .then((result) => {
      let CITY = result[0].city_name;

      Order.insertMany(
        {
          user_id: userID,
          order_user_area: orderData.order_user_area,
          order_user_city: orderData.order_user_city,
          order_user_pincode: orderData.order_user_pincode,
          order_user_contact: orderData.order_user_contact,
          order_id: Order_Id,
          awb_number: AWB_Number,
        },
        (err, result) => {
          if (result) {
            return res.json({
              isValid: true,
              orderId: Order_Id,
              message: "Order ship.",
            });
          } else {
            console.log("order error :", err.message);
            return res.json({ isValid: false, message: "Server Error." });
          }
        }
      );
    })
    .catch((err) => {
      //   console.log("city is not find error :", err.message);
      res.json({
        isValid: false,
        message: "City, Area & Pincode is not Available.",
      });
    });
});

app.get("/orderStatusData/:id", (req, res) => {
  const orderID = req.params.id;

  Order.findOne({ order_id: orderID })
    .then((result) => {
      res.json({ isValid: true, message: result });
    })
    .catch((err) => {
      res.status(404).json({ isValid: false, message: "Server Error." });
    });
});

app.post("/orderStatusUpdate/:id", (req, res) => {
  const { orderStatus } = req.body;
  const orderID = req.params.id;

  Order.updateOne(
    { order_id: orderID },
    { order_status: orderStatus },
    (err, result) => {
      if (result) {
        res.json({ isValid: true, message: "Status is Update" });
      } else {
        console.log("order status update error :", err);
        res.json({ isValid: false, message: "Server Error." });
      }
    }
  );
});

module.exports = app;
