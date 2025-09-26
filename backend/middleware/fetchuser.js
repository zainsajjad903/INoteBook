var jwt = require("jsonwebtoken");
const JWT_SECRET = "zainisagoodb$oy";
const fetchuser = (req, res, next) => {
  //get the user from the jwt token
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ error: "please athunticate a using valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "please athunticate a using valid token" });
  }
  //   const data = jwt.verify(token, JWT_SECRET);
  //   req.user = data.user;
  //   next();
};
module.exports = fetchuser;
