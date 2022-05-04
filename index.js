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

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
