module.exports = (app) => {
  const { register, login } = require("./controllers/user.controller.js");
  const {
    getAllDoctors,
    addDoctor,
  } = require("./controllers/doctor.controller.js");

  const {
    createVisit,
    allVisits,
    getOne,
    updateOne,
  } = require("./controllers/visit.controller.js");

  const auth = require("./middlewares/auth.js");

  const router = require("express").Router();

  router.post("/user/register", register);
  router.post("/user/login", login);

  router.route("/doctors").get(auth, getAllDoctors).post(auth, addDoctor);

  router.route("/visits").post(auth, createVisit).get(auth, allVisits);
  router.route("/visits/:id").get(auth, getOne).patch(auth, updateOne);

  app.use("/api/hospital", router);
};
