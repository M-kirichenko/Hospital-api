module.exports = (app) => {
  const { register, login } = require("./controllers/user.controller.js");
  const { all, add } = require("./controllers/doctor.controller.js");

  const auth = require("./middlewares/auth.js");

  const router = require("express").Router();

  router.post("/user/register", register);
  router.post("/user/login", login);

  router.route("/doctors").get(auth, all).post(auth, add);

  app.use("/api/hospital", router);
};
