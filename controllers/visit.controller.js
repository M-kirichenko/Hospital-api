const moment = require("moment");
const { Visit, Doctor } = require("../models");
const { validateVisitBody } = require("../helpers/commonFunc");

exports.createVisit = async (req, res) => {
  const { body } = req;
  const { text, date, doctor_id, patient_name } = body;

  if (!text || !date || !doctor_id || !patient_name)
    return res.status(422).send({ msg: "All visit info is required" });

  // body.date = moment.utc(date, "DD.MM.YYYY");
  const errors = validateVisitBody(body);

  if (errors.length) return res.status(422).send({ msg: errors });

  try {
    body.user_id = req.user.id;
    const created = await Visit.create(body);
    if (created) return res.send(await this.allVisits(req, res));
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};

exports.allVisits = async (req, res) => {
  try {
    const allVisits = await Visit.findAll({
      where: { user_id: req.user.id },
      include: Doctor,
    });
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
    else return res.status(404).send({ msg: `row with id: ${id} not found!` });
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

  const errors = [];

  for (let key in body) {
    if (!body[key]) errors.push(`${key} is empty`);
  }

  if (errors.length) return res.status(422).send({ msg: errors });

  body.date = moment.utc(date, "DD.MM.YYYY");

  try {
    const updated = await Visit.update(body, {
      where: { id, user_id: req.user.id },
    });

    if (updated) res.redirect("/api/hospital/visits");
    else return res.status(404).send({ msg: `row with id: ${id} not found!` });
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};
