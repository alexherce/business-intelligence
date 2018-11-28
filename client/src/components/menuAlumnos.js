import React, { Component } from 'react';
import './menu.css';

import NavigationAdmin from './navigationAdmin.js';

export default class MenuAlumnos extends Component {
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
        <h2 className="text-center">Menú de administración de alumnos</h2>

        <div class="elementos">
          <div class="itemfullMenuAlumnos">
            <div class="item">
              <h3>Agregar alumno</h3>
              <p>Aquí podras registrar a un nuevo alumno</p>
              <a href="/admin/alumnos/registro" class="btn btn-outline-light">Ir</a>
            </div>
          </div>

          <div class="itemfullMenuAlumnos">
            <div class="item">
              <h3>Registro de alumnos</h3>
              <p>Aquí podras ver todos los grupos e ingresar para ver y editar a los alumnos registrados</p>
              <a href="/admin/alumnos/grupos" class="btn btn-outline-light">Ir</a>
            </div>
          </div>

          </div>

      </div>
    );
  }
}
