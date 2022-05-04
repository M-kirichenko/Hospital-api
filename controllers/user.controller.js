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
  if (!name || !email || !password)
    res.status(422).send({ msg: "All inputs required" });

  const errors = [];

  if (!validEmail(email)) errors.push("Invalid email");
  if (!validPassword(password)) errors.push("Invalid password");
  if (!validName(name))
    errors.push(
      "The name must be composed only of letters and be at least 3 letters long"
    );
  if (errors.length) res.status(422).send({ msg: errors });
  const existed = await user.findOne({ where: { email: body.email } });
  if (existed)
    res.status(422).send({ msg: "User with such mail already exists" });

  body.password = bcrypt.hashSync(body.password, 10);

  user
    .create(body)
    .then((created) => {
      const token = jwt.sign({ id: created.id, email }, process.env.TOKEN_KEY);
      res.send({
        email,
        token,
      });
    })
    .catch((err) => {
      res.status(422).send({ msg: err });
    });
};
