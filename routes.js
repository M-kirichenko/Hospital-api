module.exports = (app) => {
  const { register, login } = require("./controllers/user.controller.js");
  const { all, add } = require("./controllers/doctor.controller.js");

  const auth = require("./middlewares/auth.js");

  const router = require("express").Router();

  router.post("/user/register", register);
  router.post("/user/login", login);

  router.get("/doctors/all", auth, all);
  router.post("/doctors/add", auth, add);

  app.use("/api/hospital", router);
};
