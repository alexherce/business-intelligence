import React, { Component } from 'react';
import './calificaciones.css';

import NavigationAdmin from './navigationAdmin.js';

export default class DetalleGrupo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alumnos: [],
    };
  }

  render() {
        var nombre = "Lista de grupos";
    return (
        <div>
            <NavigationAdmin/>

            <h2 class="alumnoName" >{nombre}</h2>
            <br/>
            <div class="containerCuenta">
                <table class="table">
                    <thead>
                    <tr>
                      <th scope = "col" > CURP </th>
                      <th scope = "col" > Nombre </th>
                      <th scope = "col" > Apellido Paterno </th>
                      <th scope = "col" > Apellido Materno </th>
                      <th scope = "col" > Acciones </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>GODHW133JDNQ1</td>
                      <td>Juan José</td>
                      <td>González</td>
                      <td>Herce</td>
                      <td>
                        <button type="button" class="btn btn-success margenes" href="/admin/alumnos/grupos/detalle">Calificaciones</button>
                        <button type="button" class="btn btn-info margenes" href="/admin/alumnos/grupos/agregar">Estado de cuenta</button>
                      </td>
                    </tr>
                    <tr>
                      <td>HSIHW133JDNQ1</td>
                      <td>José Alberto</td>
                      <td>Armendariz</td>
                      <td>Rios</td>
                      <td>
                      <button type="button" class="btn btn-success margenes" href="/admin/alumnos/grupos/detalle">Calificaciones</button>
                      <button type="button" class="btn btn-info margenes" href="/admin/alumnos/grupos/agregar">Estado de cuenta</button>
                      </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
  }
}
