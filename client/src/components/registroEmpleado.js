import React, { Component } from 'react';
import './menu.css';

import NavigationAdmin from './navigationAdmin.js';

export default class RegistroEmpleado extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alumnos: [],
    };
  }

  render() {
    return (
      <div>
        <NavigationAdmin/>
        <br/>
        <h2 className="text-center">Registro de empleado</h2>
            <div class="elementos">
              <div class="itemfullRegistro identificadorForm">
              <form method="POST">
                <br/>
                  <label for="fname">Email</label>
                  <br/>
                  <input type="text" id="fid" name="email" placeholder="Email.."/>
                  <br/>
                  <label for="fnombre">Nombre(s)</label>
                  <br/>
                  <input type="text" id="fnombre" name="nombre" placeholder="Nombre(s).."/>
                  <br/>
                  <label for="fpaterno">Apellido Paterno</label>
                  <br/>
                  <input type="text" id="fpaterno" name="Paterno" placeholder="Apellido Paterno.."/>
                  <br/>
                  <label for="fmaterno">Apellido Materno</label>
                  <br/>
                  <input type="text" id="fmaterno" name="Materno" placeholder="Apellido Materno.."/>
                  <br/>
                  <label for="ffecha">Posición</label>
                  <br/>
                  <input type="text" id="ffecha" name="Fecha" placeholder="Posición.."/>
                  <br/>
                  <label for="fsalario">Salario</label>
                  <br/>
                  <input type="text" id="fsalario" name="salario" placeholder="Salario.."/>
                  <br/>
                  <label for="ftelefono">Teléfono</label>
                  <br/>
                  <input type="text" id="ftelefono" name="telefono" placeholder="Telefono.."/>
                  <br/>
                  <label for="fcontrasena">Contraseña</label>
                  <br/>
                  <input type="password" id="fcontrasena" name="contrasena" placeholder="Contraseña.."/>
                  <br/>
                  <label for="fconfirmacion">Confirmación de contraseña</label>
                  <br/>
                  <input type="password" id="fconfirmacion" name="confirmacion" placeholder="Confirmación de contraseña.."/>
                  <br/>
                  <input type="submit" value="Enviar"/>
              </form>
              </div>
          </div>
      </div>
    );
  }
}
