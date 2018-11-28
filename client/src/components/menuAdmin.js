import React, { Component } from 'react';
import './menu.css';

import NavigationAdmin from './navigationAdmin.js';

export default class MenuAdmin extends Component {
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
        <h2 className="text-center">Bienvenido Admin</h2>

        <div class="elementos">
          <div class="itemfullMenuAlumnos">
            <div class="item">
              <h3>Alumnos</h3>
              <p>Aquí podras dar de alta a nuevos alumnos, checar sus calificaciones y checar su estado de cuenta</p>
              <a href="/admin/alumnos" class="btn btn-outline-light">Ir</a>
            </div>
          </div>

          <div class="itemfullMenuAlumnos">
            <div class="item">
              <h3>Empleados</h3>
              <p>Aquí podras dar de alta a nuevos empleados, ver sus detalles</p>
              <a href="/admin/empleados" class="btn btn-outline-light">Ir</a>
            </div>
          </div>

          <div class="itemfullMenuAlumnos">
            <div class="item">
              <h3>Contabilidad</h3>
              <p>Aquí podras ver el balance de dinero y registrar nuevos pagos</p>
              <a href="/admin/contabilidad" class="btn btn-outline-light">Ir</a>
            </div>
          </div>

          </div>

      </div>
    );
  }
}
