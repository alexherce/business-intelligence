import React, { Component } from 'react';
import './menu.css';

import NavigationAdmin from './navigationAdmin.js';

export default class RegistroAlumno extends Component {
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
        <h2 className="text-center">Registro de alumno</h2>
            <div class="elementos">
              <div class="itemfullRegistro identificadorForm">
              <form method="POST">
                <br/>
                  <label for="fname">CURP</label>
                  <br/>
                  <input type="text" id="fid" name="CURP" placeholder="CURP.."/>
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
                  <label for="ffecha">Fecha de nacimiento</label>
                  <br/>
                  <input type="text" id="ffecha" name="Fecha" placeholder="Fecha de nacimiento.."/>
                  <br/>
                  <label for="falergias">Alergias</label>
                  <br/>
                  <input type="text" id="falergias" name="alergias" placeholder="Alergias.."/>
                  <br/>
                  <input type="submit" value="Enviar"/>
              </form>
              </div>
          </div>
      </div>
    );
  }
}
