require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const db = require("./models");

app.use(cors());
app.use(express.json());

require("./routes")(app);

db.sequelize.sync();

// db.sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((err) => {
//     console.error("Unable to connect to the database:", err);
//   });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
