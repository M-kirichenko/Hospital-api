const bcrypt = require("bcrypt");
const { User } = require("../models");
const {
  validEmail,
  validPassword,
  validName,
} = require("../helpers/validator");

const { genToken } = require("../helpers/commonFunc");

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
    const found = await User.findOne({ where: { email } });
    if (found)
      return res
        .status(422)
        .send({ msg: "User with such email already exists" });

    body.password = bcrypt.hashSync(password, 10);
    const created = await User.create(body);
    if (created) {
      const { id, email } = created;
      const token = genToken({ id, email });
      return res.send({ email, token });
    }
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(422).send({ msg: "All inputs required" });

  try {
    const foundUser = await User.findOne({
      where: { email },
    });

    if (foundUser) {
      const passwordsMatch = await bcrypt.compare(password, foundUser.password);
      if (passwordsMatch) {
        const { id, name, email } = foundUser;
        const token = genToken({ id, email });
        return res.send({ name, email, token });
      }
    }
    return res.status(401).send({ msg: "Invalid Credentials" });
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};
