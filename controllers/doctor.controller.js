const db = require("../models");
const { doctor } = db;

exports.all = async (req, res) => {
  try {
    const all = await doctor.findAll();
    return res.send(all);
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};

exports.add = async (req, res) => {
  const { body } = req;
  const { name, specialty } = req.body;

  if (!name || !specialty)
    return res.send({ msg: "Both name and specialty are required!" });

  try {
    const created = await doctor.create(body);
    return res.send(created);
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};
