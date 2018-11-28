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

  componentDidMount() {
    this.isLoggedIn();
  }

  isLoggedIn = () => {
    fetch('/api/sesion/empleado')
    .then(res => res.json())
    .then((res) => {
      if (res) {
        if (!res.success) return this.props.history.push("/admin/login");

        this.setState({ infoEmpleado: res.infoEmpleado }, () => {
          console.log(this.state);
        });
      } else {
        this.props.history.push("/admin/login");
      }
    })
    .catch((error) => {
      console.log(error);
    });
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
              <h3>Lista de alumnos</h3>
              <p>Aquí podras ver todos los alumnos</p>
              <a href="/admin/alumnos/lista" class="btn btn-outline-light">Ir</a>
            </div>
          </div>

          <div class="itemfullMenuAlumnos">
            <div class="item">
              <h3>Lista de materias</h3>
              <p>Aquí podras registrar a un nuevo alumno</p>
              <a href="/admin/alumnos/registro" class="btn btn-outline-light">Ir</a>
            </div>
          </div>

          <div class="itemfullMenuAlumnos">
            <div class="item">
              <h3>Grupos</h3>
              <p>Aquí podras ver todos los grupos e ingresar para ver y editar a los alumnos registrados</p>
              <a href="/admin/alumnos/grupos" class="btn btn-outline-light">Ir</a>
            </div>
          </div>

          </div>

      </div>
    );
  }
}
