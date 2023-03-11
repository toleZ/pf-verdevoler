const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define(
    'VdV',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lat: {
        type: DataTypes.FLOAT,
      },
      lng: {
        type: DataTypes.FLOAT,
      },
      cbu: {
        type: DataTypes.STRING,
        unique: true,
      },
      mail: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM('Pending', 'Active', 'Disabled'),
        defaultValue: 'Pending',
      },
      rating: {
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: false }
  );
};
