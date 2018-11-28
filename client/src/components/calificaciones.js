import React, { Component } from 'react';
import './calificaciones.css';

import NavigationBar from './navigation.js';

export default class CalificacionesAlumno extends Component {
  constructor(props) {
    super(props);

    this.state = {
      calificaciones: [],
    };
  }

  render() {
    return (
          <div>
          <NavigationBar/>
            <h2 class="alumnoName" >Nombre del alumno</h2>
            <br/>
            <table class = "table tableDiv">
              <thead>
                <tr>
                  <th scope = "col" > Materias </th>
                  <th scope = "col" > 1er trimestre </th>
                  <th scope = "col" > 2do trimestre </th>
                  <th scope = "col" > 3ro trimestre </th>
                  <th scope = "col" > 4to trimestre </th>
                  <th scope = "col" > FINAL </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope = "row" > Español </th>
                  <td > 7 </td>
                  <td > 7 </td>
                  <td > 10 </td>
                  <td > 7 </td>
                  <td > 7.4 </td>
                </tr>
                <tr>
                  <th scope = "row" > Matemáticas </th>
                  <td > 9 </td>
                  <td > 9 </td>
                  <td > 9 </td>
                  <td > 6 </td>
                  <td > 8.4 </td>
                </tr>
                <tr>
                  <th scope = "row" > Ciencias Naturales </th>
                  <td > 9 </td>
                  <td > 8 </td>
                  <td > 8 </td>
                  <td > 8 </td>
                  <td > 8.8 </td>
                </tr>
                <tr>
                  <th scope = "row" > Historía </th>
                  <td > 10 </td>
                  <td > 9 </td>
                  <td > 8 </td>
                  <td > 10 </td>
                  <td > 9.3 </td>
                </tr>
                <tr>
                  <th scope = "row" > Geografía </th>
                  <td > 10 </td>
                  <td > 9 </td>
                  <td > 8 </td>
                  <td > 10 </td>
                  <td > 9.3 </td>
                </tr>
                <tr>
                  <th scope = "row" > PROMEDIO </th>
                  <td > 7.8 </td>
                  <td > 9.9 </td>
                  <td > 7.8 </td>
                  <td > 8.8 </td>
                  <td > 8.5 </td>
                </tr>
              </tbody>
            </table>
          </div>
    );
  }
}
