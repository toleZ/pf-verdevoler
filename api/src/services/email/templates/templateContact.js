const { templateHeader } = require('./templateHeaders');

const htmlContactEmailTemplate = (name, description) => `       
        ${templateHeader}
        <body>
          <div class="main_container">
            <div class="image_container">
              <img alt="logo-vdv" src="cid:vdv@Logo" class="header" />
            </div>
            <div class="text_container">
              <h1>Hola ${name}, </h1>
              <h2>Gracias por comunicarte con Verdevolver.</h2>
              <p>Hemos recibido el siguiente mensaje: ${description}.</p>              
              <p>En el menor tiempo nos comunicaremos contigo!</p>
              <img alt="fondo-vdv" src="cid:vdv@Fondo" />
            </div>
          </div>
        </body>        
                `;

const htmlAdminEmailTemplate = (description, mail) => `       
        ${templateHeader}
        <body>
          <div class="main_container">
            <div class="image_container">
              <img alt="logo-vdv" src="cid:vdv@Logo" class="header" />
            </div>
            <div class="text_container">
              <h1>Querido Admin, </h1>
              <h2>Gracias por comunicarte con VerdeVolver.</h2>
              <p>Has recibido el siguiente mensaje: ${description}.</p>
              <p>Puedes responderle a su correo electrónico ${mail} </p>
              <img alt="fondo-vdv" src="cid:vdv@Fondo" />
            </div>
          </div>
        </body>        
                `;

module.exports = {
  htmlContactEmailTemplate,
  htmlAdminEmailTemplate,
};
