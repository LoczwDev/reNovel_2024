// otpUtils.js
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "loc17121911@gmail.com",
    pass: "uavacswpudyakjuz",
  },
});

export const generateOTP = () => {
  // Tạo mã OTP 6 chữ số ngẫu nhiên
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTP = (email, otp) => {
  const mailOptions = {
    from: "info@lnvn.com",
    to: email,
    subject: "Xác nhận OTP",
    text: `Mã OTP của bạn là: ${otp}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
