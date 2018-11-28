import React, { Component } from 'react';
import './menu.css';

import NavigationBar from './navigation.js';

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alumnos: [],
    };
  }

  render() {
    return (
        <div>
            <NavigationBar/>
            <div class="elementos">
                <div class="itemfull">
                    <div class="item">
                        <h3>Checar calificaciones</h3>
                        <p>Aquí podras revisar tus calificaciones</p>
                        <button type="button" class="btn btn-outline-light">Ir</button>
                    </div>
                </div>

                <div class="itemfull">
                    <div class="item">
                        <h3>Estado de Cuenta</h3>
                        <p>Aquí podras revisar los pagos que has realizado y los que tienes por realizar</p>
                        <button type="button" class="btn btn-outline-light">Ir</button>
                    </div>
                </div>

                <div class="itemfull">
                    <div class="item">
                        <h3>Aplicar a un taller</h3>
                        <p>Aquí podras aplicar a los talleres que gustes para demostrar las competencias de las materias requeridas</p>
                        <button type="button" class="btn btn-outline-light">Ir</button>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
