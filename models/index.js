const dbConfig = require("../config/db_config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require("./user.model.js")(sequelize, Sequelize);
db.Doctor = require("./doctor.model.js")(sequelize, Sequelize);
db.Visit = require("./visit.model.js")(sequelize, Sequelize);

db.Visit.belongsTo(db.User, {
  foreignKey: "user_id",
});

module.exports = db;
