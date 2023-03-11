const { templateHeader } = require('./templateHeaders');

const htmlFormVdVEmailTemplate = (name) => ` 
${templateHeader}     
      <body>
        <div class="main_container">
          <div class="image_container">
            <img alt="logo-vdv" src="cid:vdv@Logo" class="header" />
          </div>
          <div class="text_container">
            <h1>Hola ${name}, </h1>
            <h2>Gracias por completar nuestro formulario.</h2>
            <p>Los administradores revisarán tu solicitud cuidadosamente.</p>
            <p> Próximamente recibirás una respuesta!</p>
            <p>Que tengas muy buen día,</p>
            <p>Equipo de Verde Volver</p>
            <img alt="fondo-vdv" src="cid:vdv@Fondo" />
          </div>
        </div>
      </body>      
              `;

// TODO ETIQUETA A PARA IR AL DASHBOARD
const htmlAdminFormVdVEmailTemplate = (name) => ` 
${templateHeader}     
      <body>
        <div class="main_container">
          <div class="image_container">
            <img alt="logo-vdv" src="cid:vdv@Logo" class="header" />
          </div>
          <div class="text_container">
            <h1>Querido Admin, </h1>
            <h2>Recibiste una solicitud de ${name}, para publicar su punto de reciclaje en la web.</h2>
            <a href="http://localhost:5173/dashboard">Puedes revisarla aquí</a>
            <img alt="fondo-vdv" src="cid:vdv@Fondo" />
          </div>
        </div>
      </body>      
              `;

const htmlVdVConfirmationEmailTemplate = (name, password) => ` 
${templateHeader}     
      <body>
        <div class="main_container">
          <div class="image_container">
            <img alt="logo-vdv" src="cid:vdv@Logo" class="header" />
          </div>
          <div class="text_container">
            <h1>Hola ${name}, </h1>
            <h2>Con alegría te anunciamos que tu solicitud fue aceptada.</h2>
            <p>Podrás loguearte con la siguiente contraseña provisoria para iniciar sesión.</p>
            <p>${password}</p>
            <p>Bienvenid@ a VerdeVolver!</p>
            <img alt="fondo-vdv" src="cid:vdv@Fondo" />
          </div>
        </div>
      </body>      
              `;

const htmlVdVRejectEmailTemplate = (name, reason) => ` 
${templateHeader}     
      <body>
        <div class="main_container">
          <div class="image_container">
            <img alt="logo-vdv" src="cid:vdv@Logo" class="header" />
          </div>
          <div class="text_container">
            <h1>Hola ${name}, </h1>
            <h2>Te comunicamos que tu solicitud ha sido rechazada por el siguiente motivo: </h2>
            <p>${reason}</p>
            <p>Saludos cordiales, </p>
            <p>Equipo de Verde Volver</p>
            <img alt="fondo-vdv" src="cid:vdv@Fondo" />
          </div>
        </div>
      </body>      
              `;

const htmlVdVAprrovedCBUTemplate = (name, cbu) => ` 
${templateHeader}     
      <body>
        <div class="main_container">
          <div class="image_container">
            <img alt="logo-vdv" src="cid:vdv@Logo" class="header" />
          </div>
          <div class="text_container">
            <h1>Hola ${name}, </h1>
            <h2>Te comunicamos que tu solicitud  de cambio de CBU ha sido aprobada</h2>
            <p>Ahora tu CBU es ${cbu}</p>
            <p>Saludos cordiales, </p>
            <p>Equipo de Verde Volver</p>
            <img alt="fondo-vdv" src="cid:vdv@Fondo" />
          </div>
        </div>
      </body>      
              `;

module.exports = {
  htmlFormVdVEmailTemplate,
  htmlAdminFormVdVEmailTemplate,
  htmlVdVConfirmationEmailTemplate,
  htmlVdVRejectEmailTemplate,
  htmlVdVAprrovedCBUTemplate,
};
