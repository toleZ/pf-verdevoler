// Explicacion!

const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'Material_VdV',
    {
      selfGranted: DataTypes.BOOLEAN,
    },
    { timestamps: false }
  );
};
