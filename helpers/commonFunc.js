const genToken = ({ id, email, expiresIn = false }) => {
  const jwt = require("jsonwebtoken");
  const token = jwt.sign(
    { id, email },
    process.env.TOKEN_KEY,
    expiresIn && { expiresIn }
  );
  return { email, token };
};

module.exports = { genToken };
