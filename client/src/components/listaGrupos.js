import React, { Component } from 'react';
import './calificaciones.css';

import NavigationAdmin from './navigationAdmin.js';

export default class ListaGrupos extends Component {
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
                      <th scope = "col" > ID </th>
                      <th scope = "col" > Nivel </th>
                      <th scope = "col" > Grado </th>
                      <th scope = "col" > Grupo </th>
                      <th scope = "col" > Año escolar </th>
                      <th scope = "col" > Acciones </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>1</td>
                      <td>Primaria</td>
                      <td>Primero</td>
                      <td>A</td>
                      <td>2018</td>
                      <td>
                        <a class="btn btn-success margenes" href="/admin/alumnos/grupos/detalle">Ver grupo</a>
                        <a class="btn btn-info margenes" href="/admin/alumnos/grupos/agregar">Agregar alumno</a>
                      </td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Primaria</td>
                    <td>Primero</td>
                    <td>A</td>
                    <td>2018</td>
                    <td>
                        <a class="btn btn-success margenes" href="/admin/alumnos/grupos/detalle">Ver grupo</a>
                        <a class="btn btn-info margenes" href="/admin/alumnos/grupos/agregar">Agregar alumno</a>
                    </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
  }
}
