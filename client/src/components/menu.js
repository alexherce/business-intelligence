import React, { Component } from 'react';
import './menu.css';

import NavigationBar from './navigation.js';

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      infoEstudiante: {
        nombre: '',
        apellido_paterno: ''
      },
    };
  }

  componentDidMount() {
    this.isLoggedIn();
  }

  isLoggedIn = () => {
    fetch('/api/sesion/alumno')
    .then(res => res.json())
    .then((res) => {
      if (res) {
        if (!res.success) return this.props.history.push("/alumnos/login");

        this.setState({ infoEstudiante: res.infoEstudiante }, () => {
          console.log(this.state);
        });
      } else {
        this.props.history.push("/alumnos/login");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <NavigationBar/>
        <h2 className="text-center">Bienvenido <small class="text-muted">{this.state.infoEstudiante.nombre} {this.state.infoEstudiante.apellido_paterno}</small></h2>

        <div class="elementos">
          <div class="itemfull">
            <div class="item">
              <h3>Checar calificaciones</h3>
              <p>Aquí podras revisar tus calificaciones</p>
              <a href="/alumnos/calificaciones" class="btn btn-outline-light">Ir</a>
            </div>
          </div>

          <div class="itemfull">
            <div class="item">
              <h3>Estado de Cuenta</h3>
              <p>Aquí podras revisar los pagos que has realizado y los que tienes por realizar</p>
              <a href="/alumnos/estado_cuenta" class="btn btn-outline-light">Ir</a>
            </div>
          </div>

          <div class="itemfull">
            <div class="item">
              <h3>Aplicar a un taller</h3>
              <p>Aquí podras aplicar a los talleres que gustes para demostrar las competencias de las materias requeridas</p>
              <a href="/alumnos/aplicar_taller" class="btn btn-outline-light">Ir</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
