const moment = require("moment");
const { Visit } = require("../models");
const { validateVisitBody } = require("../helpers/commonFunc");

exports.createVisit = async (req, res) => {
  const { body } = req;
  const { text, date, doctor_id, patient_name } = body;

  if (!text || !date || !doctor_id || !patient_name)
    return res.status(422).send({ msg: "All visit info is required" });

  const errors = validateVisitBody(body);

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

exports.updateOne = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { text, patient_name, doctor_id, date } = body;

  if (!text && !date && !doctor_id && !patient_name)
    return res.status(422).send({ msg: "Nothing to update" });

  const errors = validateVisitBody(body);

  if (errors.length) return res.status(422).send({ msg: errors });

  try {
    body.date = moment.utc(date, "DD.MM.YYYY");

    const updated = await Visit.update(body, {
      where: { id, user_id: req.user.id },
    });

    if (updated) res.redirect("/api/hospital/visits");
    else return res.status(404).send({ msg: `row with id: ${id} not found!` });
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};
