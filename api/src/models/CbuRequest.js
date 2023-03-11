const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define(
    'CbuRequest',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cbu: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idVdV: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
