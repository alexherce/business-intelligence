import React, { Component } from 'react';
import './menu.css';

import NavigationAdmin from './navigationAdmin.js';

export default class DetalleEmpleado extends Component {
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
            <div class="elementos">
              <div class="itemfullRegistro identificadorForm">
              <div class="colorForm" >
                  <br/>
                  <h2>Email</h2>
                  <h5>mcr_joan@hotmail.com</h5>
                  <br/>
                  <h2>Nombre(s)</h2>
                  <h5>Joan Andoni González Rioz</h5>
                  <br/>
                  <h2>Apellido Paterno</h2>
                  <h5>González</h5>
                  <br/>
                  <h2>Apellido Materno</h2>
                  <h5>Rioz</h5>
                  <br/>
                  <h2>Posición</h2>
                  <h5>IT</h5>
                  <br/>
                  <h2>Salario</h2>
                  <h5>10,000</h5>
                  <br/>
              </div>
              </div>
          </div>
      </div>
    );
  }
}
