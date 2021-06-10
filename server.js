const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5001;

// Database Connection.
const url = "mongodb://localhost/myProject";
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});
const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("Database Connected...");
  })
  .catch((err) => {
    console.log("Connection Failed...");
  });

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.use("/auth", require("./app/routes/auth"));
app.use("/admin", require("./app/routes/admin"));
app.use("/manager", require("./app/routes/manager"));
app.use("/deliveryBoy", require("./app/routes/deliveryBoy"));
app.use("/order", require("./app/routes/order"));
app.use("/complaints", require("./app/routes/complaints"));
app.use("/metting", require("./app/routes/metting"));

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}.`);
});
