const passport = require("passport");

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
