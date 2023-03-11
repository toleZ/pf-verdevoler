const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define(
    'Donation',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('Delivered', 'Pending'),
        defaultValue: 'Pending',
      },
      mpId: {
        type: DataTypes.STRING,
        unique: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
    },
    { timestamps: false }
  );
};
