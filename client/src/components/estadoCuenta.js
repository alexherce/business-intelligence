import React, { Component } from 'react';
import './estadoCuenta.css';

import NavigationBar from './navigation.js';

export default class EstadoCuentaAlumno extends Component {
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
        var nombre = "Nombre del alumno";
    return (
        <div>
            <NavigationBar/>

            <h2 class="alumnoName" >{nombre}</h2>
            <br/>
            <div class="containerCuenta">
            <table class="table">
                <thead>
                <tr>
                <th scope = "col" >  </th>
                  <th scope = "col" > Inscripción y materiales</th>
                  <th scope = "col" > 1 mes </th>
                  <th scope = "col" > 2 mes </th>
                  <th scope = "col" > 3 mes </th>
                  <th scope = "col" > 4 mes </th>
                  <th scope = "col" > 5 mes </th>
                  <th scope = "col" > 6 mes </th>
                  <th scope = "col" > 7 mes </th>
                  <th scope = "col" > 8 mes </th>
                  <th scope = "col" > 9 mes </th>
                  <th scope = "col" > 10 mes </th>
                  <th scope = "col" > TOTAL </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>Costo</td>
                  <td>$ 1,300</td>
                  <td>$ 1,790</td>
                  <td>$ 1,790</td>
                  <td>$ 1,790</td>
                  <td>$ 1,790</td>
                  <td>$ 1,790</td>
                  <td>$ 1,790</td>
                  <td>$ 1,790</td>
                  <td>$ 1,790</td>
                  <td>$ 1,790</td>
                  <td>$ 1,790</td>
                  <td>$ 19,200</td>
                </tr>
                <tr>
                  <td>A cuenta</td>
                  <td>-$ 1,300</td>
                  <td>-$ 1,790</td>
                  <td>-$ 1,790</td>
                  <td>-$ 1,790</td>
                  <td>-$ 1,790</td>
                  <td>-$ 1,790</td>
                  <td>-$ 0</td>
                  <td>-$ 0</td>
                  <td>-$ 0</td>
                  <td>-$ 0</td>
                  <td>-$ 0</td>
                  <td>-$ 10,250</td>
                </tr>
                <tr>
                  <td>Por pagar</td>
                  <td>$ 0</td>
                  <td>$ 0</td>
                  <td>$ 0</td>
                  <td>$ 0</td>
                  <td>$ 0</td>
                  <td>$ 0</td>
                  <td>$ 1,790</td>
                  <td>$ 1,790</td>
                  <td>$ 1,790</td>
                  <td>$ 1,790</td>
                  <td>$ 1,790</td>
                  <td>$ 7,160</td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
    );
  }
}
