const app = require("express").Router();
const nodeMailer = require("nodemailer");

// Metting mail.
const transporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "sumitbharodiya76@gmail.com",
    pass: "$umiT7686",
  },
});

// Model.
const Admin = require("../models/adminRegister");

// Routes.
app.post("/sendMail", (req, res) => {
  const data = req.body;
  // console.log("data :", data);

  Admin.find({ role: "manager" })
    .select("email")
    .then((result) => {
      const subject = data.subject;
      const dateTime = data.dateTime;
      const description = data.description;
      // let array = [];

      // for (let i = 0; i < result.length; i++) {
      //   array.push(result[i].email);
      //   var myEmails = new Promise((resolve, reject) => {
      //     setTimeout(() => {
      //       resolve(array);
      //     }, 300);
      //   });
      // }

      // myEmails.then((data) => {
      //   return res.json({ isValid: true, message: data });
      // });

      //   Metting mail.
      var mailOptions = {
        // to: [array],
        to: [result[0].email],
        subject: subject,
        html:
          "<div><span style='font-weight:bold; font-size:18px;'> Date & Time: </span> <span style='font-size:17px;'> " +
          dateTime +
          " </span> </div>" +
          "<br>" +
          "<h3 style='color:black;'> " +
          description +
          "</h3>" +
          "<p style='font-weight:bold; font-size:15px;'>By : Admin</p>",
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error", error);
          return res.json({ isValid: false, message: "Server Error." });
        }
        res.json({ isValid: true, message: "Mail is send successfully." });
      });
    });
});

module.exports = app;
