module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define(
    "author",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        required: true,
      },
      surnname: {
        type: DataTypes.STRING,
        required: true,
      },
    },
    { timestamps: false }
  );

  return Author;
};
