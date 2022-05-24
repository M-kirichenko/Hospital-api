module.exports = (sequelize, Datatypes) => {
  const User = sequelize.define(
    "users",
    {
      email: {
        type: Datatypes.STRING,
      },
      password: {
        type: Datatypes.STRING,
      },
    },
    { timestamps: false }
  );

  return User;
};
