import React, { Component } from 'react';
import './menu.css';

import NavigationAdmin from './navigationAdmin.js';

export default class MenuEmpleados extends Component {
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
              <h3>Agregar empleado</h3>
              <p>Aquí podras registrar a un nuevo empleado</p>
              <a href="/admin/empleados/registro" class="btn btn-outline-light">Ir</a>
            </div>
          </div>

          <div class="itemfullMenuAlumnos">
            <div class="item">
              <h3>Lista de empleados</h3>
              <p>Aquí podras ver a todos los empleados a detalle</p>
              <a href="/admin/empleados/lista" class="btn btn-outline-light">Ir</a>
            </div>
          </div>

          </div>

      </div>
    );
  }
}
