import React, { Component } from 'react';
import './menu.css';

import NavigationAdmin from './navigationAdmin.js';

export default class MenuAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      infoEmpleado: {
        nombre: '',
        apellido_paterno: ''
      },
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
        <h2 className="text-center">Bienvenido <small class="text-muted">{this.state.infoEmpleado.nombre} {this.state.infoEmpleado.apellido_paterno}</small></h2>

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
              <h3>Aplicaciones a Talleres</h3>
              <p>Aquí podras ver aplicaciones a talleres</p>
              <a href="/admin/alumnos/aplicaciones_talleres" class="btn btn-outline-light">Ir</a>
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
