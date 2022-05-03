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
  if (!body["name"] || !body["email"] || !body["password"]) {
    res.status(422);
    res.send({ msg: "All inputs required" });
  } else {
    const errors = [];
    if (!validEmail(body["email"])) errors.push("Invalid email");
    if (!validPassword(body["password"]))
      errors.push(
        "Password must contain at least 6 chars, including one uppercase letter, number and special symbol"
      );
    if (!validName(body["name"]))
      errors.push(
        "The name must be composed only of letters and be at least 3 letters long"
      );
    if (!errors.length) {
      const existed = await user.findOne({ where: { email: body.email } });
      console.log(existed);
      if (!existed) {
        jwt.sign(body, process.env.TOKEN_KEY, async (err, token) => {
          body.password = await bcrypt.hash(body.password, 10);
          const { email } = await user.create(body);
          res.send({
            email,
            token,
          });
        });
      } else {
        res.status(422);
        res.send({ msg: "User with such mail already exists" });
      }
    } else {
      res.status(422);
      res.send({ msg: errors });
    }
  }
};

exports.login = async (req, res) => {
  const { body } = req;
  if (!body["email"] || !body["password"]) {
    res.status(422);
    res.send({ msg: "All inputs required" });
  } else {
    const { email, password } = body;

    const foundUser = await user.findOne({
      where: { email: body.email },
    });

    if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
      const token = jwt.sign(
        { id: foundUser.id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      const userWithToken = {
        id: foundUser.id,
        email: foundUser.email,
        token,
      };
      res.send(userWithToken);
    } else res.status(400).send({ msg: "Invalid Credentials" });
  }
};
