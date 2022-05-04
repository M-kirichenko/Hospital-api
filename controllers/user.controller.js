const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const user = db.user;
const {
  validEmail,
  validPassword,
  validName,
} = require("../helpers/validator");

exports.register = async (req, res) => {
  const { body } = req;
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(422);
    res.send({ msg: "All inputs required" });
  } else {
    const errors = [];
    if (!validEmail(body["email"])) errors.push("Invalid email");
    if (!validPassword(body["password"])) errors.push("Invalid password");
    if (!validName(body["name"]))
      errors.push(
        "The name must be composed only of letters and be at least 3 letters long"
      );
    if (errors.length) {
      res.status(422);
      res.send({ msg: errors });
    }
    const existed = await user.findOne({ where: { email: body.email } });
    if (existed) {
      res.status(422);
      res.send({ msg: "User with such mail already exists" });
    }
    jwt.sign(body, process.env.TOKEN_KEY, async (err, token) => {
      body.password = await bcrypt.hash(body.password, 10);
      const { email } = await user.create(body);
      res.send({
        email,
        token,
      });
    });
  }
};
