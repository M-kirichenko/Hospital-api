const genToken = (tokenParams) => {
  const jwt = require("jsonwebtoken");
  const token = jwt.sign({ ...tokenParams }, process.env.TOKEN_KEY, {
    expiresIn: "2h",
  });
  return token;
};

module.exports = { genToken };
