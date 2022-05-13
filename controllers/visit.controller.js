const { Visit } = require("../models");
const { validName } = require("../helpers/validator");
const moment = require("moment");

exports.createVisit = async (req, res) => {
  const { body } = req;
  const { text, date, doctor_id, patient_name } = body;

  if (!text || !date || !doctor_id || !patient_name)
    return res.status(422).send({ msg: "All visit info is required" });

  const errors = [];

  if (!text.length) {
    errors.push("Visit text can't be empty");
  }

  if (!validName(patient_name))
    errors.push(
      "Patient name must be composed only of letters and be at least 3 letters long"
    );

  if (!moment(date, "DD.MM.YYYY").isValid()) errors.push("Invalid date");

  if (errors.length) return res.status(422).send({ msg: errors });

  try {
    body.date = moment.utc(date, "DD.MM.YYYY");
    body.user_id = req.user.id;
    const created = await Visit.create(body);
    if (created) return res.send(created);
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};

exports.allVisits = async (req, res) => {
  try {
    const allVisits = await Visit.findAll({ where: { user_id: req.user.id } });
    return res.send(allVisits);
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};

exports.getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const one = await Visit.findOne({ where: { id, user_id: req.user.id } });
    if (one) return res.send(one);
    else res.status(404).send({ msg: `row with id: ${id} not found!` });
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};

exports.deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Visit.destroy({
      where: { id, user_id: req.user.id },
    });
    if (deleted) return res.send(await this.allVisits(req, res));
    else res.status(404).send({ msg: `row with id: ${id} not found!` });
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};
