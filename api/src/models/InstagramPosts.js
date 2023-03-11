const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define(
    'InstagramPosts',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
