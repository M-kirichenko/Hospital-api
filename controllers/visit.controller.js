const db = require("../models");
const visit = db.visit;
const { validName } = require("../helpers/validator");
const moment = require("moment");
exports.make = async (req, res) => {
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
    body.date = moment(date, "DD.MM.YYYY");
    body.user_id = req.user.id;
    const created = await visit.create(body);
    if (created) return res.send(created);
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};
