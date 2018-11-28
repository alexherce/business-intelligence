import React, { Component } from 'react';
import './calificaciones.css';

import NavigationAdmin from './navigationAdmin.js';

export default class ListaEmpleados extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alumnos: [],
    };
  }

  render() {
        var nombre = "Lista de empleados";
    return (
        <div>
            <NavigationAdmin/>

            <h2 class="alumnoName" >{nombre}</h2>
            <br/>
            <div class="containerCuenta">
                <table class="table">
                    <thead>
                    <tr>
                      <th scope = "col" > ID </th>
                      <th scope = "col" > Nombre </th>
                      <th scope = "col" > Apellido Paterno </th>
                      <th scope = "col" > Apellido Materno </th>
                      <th scope = "col" > Posicion </th>
                      <th scope = "col" > Accion </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>1</td>
                      <td>Margarita</td>
                      <td>Rioz</td>
                      <td>Hernandez</td>
                      <td>Directora Academica</td>
                      <td><a class="btn btn-success margenes" href="/admin/empleados/lista/detalle">Ver detalle</a></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Guadalupe</td>
                        <td>Rioz</td>
                        <td>Chavez</td>
                        <td>Directora Secundaria</td>
                        <td><a class="btn btn-success margenes" href="/admin/empleados/lista/detalle">Ver detalle</a></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
  }
}
