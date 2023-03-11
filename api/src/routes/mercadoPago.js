const mercadopago = require('mercadopago');
require('dotenv').config();

// VER POR QUE MP NO FUNCIONA CON LAS VARIABLES GLOBALES!!!!!!!!!!
// const { AT_USER_CREDENCIAL_PRODUCCION } = process.env;
// console.log(
//   "Acces-Token process.env",
//   process.env.AT_USER_CREDENCIAL_PRODUCCION
// );
// console.log("AT_DIRECTO", AT_USER_CREDENCIAL_PRODUCCION);

mercadopago.configure({
  access_token:
    'APP_USR-2258033541917651-022315-d4663d97f5d010910748730342e5fe5d-1307513005',

  // process.env.AT_USER_CREDENCIAL_PRODUCCION,
  // AT_USER_CREDENCIAL_PRODUCCION,
});

module.exports = {
  mercadopago,
};
