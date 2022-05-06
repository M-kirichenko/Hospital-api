module.exports = (sequelize, Datatypes) => {
  const doctor = sequelize.define(
    "doctors",
    {
      name: {
        type: Datatypes.STRING,
      },
      specialty: {
        type: Datatypes.STRING,
      },
    },
    { timestamps: false }
  );

  return doctor;
};
