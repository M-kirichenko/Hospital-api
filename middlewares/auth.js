const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res
      .status(403)
      .send({ msg: "A token is required for authentication" });
  }
  try {
    jwt.verify(token, process.env.TOKEN_KEY);
  } catch (err) {
    return res.status(401).send({ msg: "Invalid token" });
  }
  return next();
};

module.exports = verifyToken;
