import React, { Component } from 'react';
import './menu.css';

import NavigationAdmin from './navigationAdmin.js';

export default class MenuContabilidad extends Component {
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
        <h2 className="text-center">Menú de contabilidad</h2>

            <div class="elementos">
              <div class="itemfullMenuAlumnos">
                <div class="item">
                  <h3>No se que podria ir aqui</h3>
                  <p>Aquí podras dar de alta a nuevos alumnos, checar sus calificaciones y checar su estado de cuenta</p>
                  <a href="/admin/alumnos" class="btn btn-outline-light">Ir</a>
                </div>
              </div>

          </div>

      </div>
    );
  }
}
