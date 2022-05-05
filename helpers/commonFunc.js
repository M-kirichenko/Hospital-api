const genToken = ({ id, name, email, expiresIn }) => {
  const jwt = require("jsonwebtoken");
  const token = jwt.sign({ id, email }, process.env.TOKEN_KEY, { expiresIn });
  return { name, email, token };
};

module.exports = { genToken };
