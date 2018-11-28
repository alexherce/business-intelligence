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
                      <th scope = "col" > Nivel </th>
                      <th scope = "col" > Grado </th>
                      <th scope = "col" > Grupo </th>
                      <th scope = "col" > Acciones </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>Primaria</td>
                      <td>Primero</td>
                      <td>A</td>
                      <td>
                        <button type="button" class="btn btn-success margenes">Ver alumnos</button>
                        <button type="button" class="btn btn-info margenes">Agregar alumno</button>
                      </td>
                    </tr>
                    <tr>
                    <td>Primaria</td>
                    <td>Primero</td>
                    <td>A</td>
                    <td>
                      <button type="button" class="btn btn-success margenes">Ver alumnos</button>
                      <button type="button" class="btn btn-info margenes">Agregar alumno</button>
                    </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
  }
}
