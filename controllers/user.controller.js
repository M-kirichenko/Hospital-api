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
    return res.status(422).send({ msg: "All inputs required" });

  const errors = [];

  if (!validEmail(email)) errors.push("Invalid email");
  if (!validPassword(password)) errors.push("Invalid password");
  if (!validName(name))
    errors.push(
      "The name must be composed only of letters and be at least 3 letters long"
    );

  if (errors.length) return res.status(422).send({ msg: errors });

  try {
    const found = await user.findOne({ where: { email } });
    if (found)
      return res
        .status(422)
        .send({ msg: "User with such email already exists" });

    body.password = bcrypt.hashSync(password, 10);
    const created = await user.create(body);
    if (created) {
      const token = jwt.sign({ id: created.id, email }, process.env.TOKEN_KEY);
      return res.send({
        email,
        token,
      });
    }
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};

exports.login = async (req, res) => {
  const { body } = req;
  const { email, password } = body;
  if (!email || !password)
    return res.status(422).send({ msg: "All inputs required" });

  try {
    const foundUser = await user.findOne({
      where: { email },
    });

    if (foundUser) {
      const passwordsMatch = await bcrypt.compare(password, foundUser.password);
      if (passwordsMatch) {
        const token = jwt.sign(
          { id: foundUser.id, email },
          process.env.TOKEN_KEY,
          { expiresIn: "2h" }
        );
        const userWithToken = {
          email,
          token,
        };
        return res.send(userWithToken);
      }
    }
    return res.status(401).send({ msg: "Invalid Credentials" });
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};
