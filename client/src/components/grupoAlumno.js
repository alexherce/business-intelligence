import React, { Component } from 'react';
import './menu.css';

import NavigationAdmin from './navigationAdmin.js';

export default class GrupoAlumno extends Component {
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
        <h2 className="text-center">Agregar alumno a grupo</h2>
            <div class="elementos">
              <div class="itemfullRegistro identificadorForm">
              <form method="POST">
                <br/>
                  <label for="fid">ID del alumno</label>
                  <br/>
                  <input type="text" id="fid" name="id" placeholder="ID del alumno.."/>
                  <br/>

                  <input type="submit" value="Agregar"/>
              </form>
              </div>
          </div>
      </div>
    );
  }
}
