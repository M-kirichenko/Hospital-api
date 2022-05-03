module.exports = (sequelize, Datatypes) => {
  const visit = sequelize.define(
    "visit",
    {
      text: {
        type: Datatypes.STRING,
      },
      user_id: {
        type: Datatypes.INTEGER,
      },
      date: {
        type: Datatypes.DATE,
      },
      doctor_id: {
        type: Datatypes.INTEGER,
      },
      patient_name: {
        type: Datatypes.STRING,
      },
    },
    { timestamps: false }
  );

  return visit;
};
