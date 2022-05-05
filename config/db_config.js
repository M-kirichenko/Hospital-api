require("dotenv").config();
const { HOST, DB_USER, PASSWORD, DB } = process.env;
module.exports = {
  HOST,
  USER: DB_USER,
  PASSWORD,
  DB,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000,
  },
};
