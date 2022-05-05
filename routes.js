module.exports = (app) => {
  const { register } = require("./controllers/user.controller.js");
  const router = require("express").Router();

  router.post("/user/register", register);

  app.use("/api/hospital", router);
};
