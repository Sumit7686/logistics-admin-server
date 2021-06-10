const app = require("express").Router();

// Models.
const Complaints = require("../models/complaints");
const UserComplaints = require("../models/userComplaints");

app.post("/complaints/:id", (req, res) => {
  const id = req.params.id;
  const complaints = Complaints(req.body);

  Complaints.insertMany(
    {
      deliveryBoy_id: id,
      subject: complaints.subject,
      description: complaints.description,
    },
    (err, result) => {
      if (result) {
        res.json({ isValid: true, message: "Complaints Done." });
      } else {
        console.log("Complaints err :", err);
        res.json({ isValid: false, message: "Server Error." });
      }
    }
  );
});

app.get("/getComplaints", (req, res) => {
  Complaints.find()
    .then((result) => {
      res.json({ isValid: true, message: result });
    })
    .catch((err) => {
      console.log("get complaints err :", err);
      res.json({ isValid: false, message: "Server Error." });
    });
});

app.delete("/deleteComplaints/:id", (req, res) => {
  const id = req.params.id;

  Complaints.findByIdAndDelete(id, (err, result) => {
    if (result) {
      res.json({ isValid: true, message: "Complaints Delete Successfully." });
    } else {
      res.json({ isValid: false, message: "Server Error." });
    }
  });
});

app.get("/getUserComplaints", (req, res) => {
  UserComplaints.find()
    .then((result) => {
      res.json({ isValid: true, message: result });
    })
    .catch((err) => {
      console.log("get complaints err :", err);
      res.json({ isValid: false, message: "Server Error." });
    });
});

app.delete("/deleteUserComplaints/:id", (req, res) => {
  const id = req.params.id;

  UserComplaints.findByIdAndDelete(id, (err, result) => {
    if (result) {
      res.json({ isValid: true, message: "Complaints Delete Successfully." });
    } else {
      res.json({ isValid: false, message: "Server Error." });
    }
  });
});

app.get("/deliveryBoyPersonalComplaints/:id", (req, res) => {
  const id = req.params.id;

  Complaints.find({ deliveryBoy_id: id })
    .then((result) => {
      res.json({ isValid: true, message: result });
    })
    .catch((err) => {
      console.log("err user personal complaints :", err.message);
      res.json({ isValid: false, message: "Server Error." });
    });
});

module.exports = app;
