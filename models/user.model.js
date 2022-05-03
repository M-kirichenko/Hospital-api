module.exports = (sequelize, Datatypes) => {
  const user = sequelize.define(
    "users",
    {
      name: {
        type: Datatypes.STRING,
      },
      email: {
        type: Datatypes.STRING,
      },
      password: {
        type: Datatypes.STRING,
      },
    },
    { timestamps: false }
  );

  return user;
};
