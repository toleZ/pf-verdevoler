//NO LO USE ESTO
const vdvsarr = [
  {
    name: 'Reciclar Ayuda',
    img: 'www.imagen.com',
    mail: 'ra@mail.com',
    /* password:"12345", */ address: 'calle 1',
    description: 'Somos una ONG sin fines de lucro',
    cbu: '34567898777',

    materials: [1, 2], // este no se pasa a la creacion de la VdV , este dato se usa para relacionar las tablas
  },
  {
    name: 'Juntos X el Cambio',
    img: 'www.imagen.com',
    mail: 'jxec@mail.com',
    /* password:"12345", */ address: 'calle 2',
    description: 'Somos una ONG sin fines de lucro',
    cbu: '23456788777',
    materials: [3, 4],
  },
  {
    name: 'Te Amo Mundo',
    img: 'www.imagen.com',
    mail: 'tam@mail.com',
    /* password:"12345", */ address: 'calle 3',
    description: 'Somos una ONG sin fines de lucro',
    cbu: '0987698777',
    materials: [5, 6],
  },
  {
    name: 'Salvando el Planeta',
    img: 'www.imagen.com',
    mail: 'sep@mail.com',
    /* password:"12345", */ address: 'calle 4',
    description: 'Somos una ONG sin fines de lucro',
    cbu: '8976557898777',
    materials: [3, 4, 1, 2, 5, 6],
  },
];

module.exports = { vdvsarr };
