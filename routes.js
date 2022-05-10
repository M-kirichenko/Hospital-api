module.exports = (app) => {
  const { register, login } = require("./controllers/user.controller.js");
  const {
    all: getAllDoctors,
    add: addDoctor,
  } = require("./controllers/doctor.controller.js");

  const { make } = require("./controllers/visit.controller.js");

  const auth = require("./middlewares/auth.js");

  const router = require("express").Router();

  router.post("/user/register", register);
  router.post("/user/login", login);

  router.route("/doctors").get(auth, getAllDoctors).post(auth, addDoctor);

  router.route("/user/visits").post(auth, make);

  app.use("/api/hospital", router);
};
