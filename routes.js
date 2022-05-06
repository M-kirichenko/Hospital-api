module.exports = (app) => {
  const { register, login } = require("./controllers/user.controller.js");
  const router = require("express").Router();

  router.post("/user/register", register);
  router.post("/user/login", login);

  app.use("/api/hospital", router);
};
