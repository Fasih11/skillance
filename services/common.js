const passport = require("passport");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "fasihmughal11@gmail.com",
    pass: process.env.MAIL_PASSWORD,
  },
});

exports.isAuth = (req, res, done) => {
  return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  // token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MGIwZDliNjUwZjdjNDdkM2QzMTNjMCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk1MjIzMjIxfQ.pdGIGbreI0TK1PQ4Z_yRYPdErdy1xSSgR6lFQ9ncWew";

  return token;
};

exports.sendMail = async function ({ to, subject, text, html }) {
  let info = await transporter.sendMail({
    from: '"Skillance" <skillance@gmail.com>', // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  });
  return info;
};
