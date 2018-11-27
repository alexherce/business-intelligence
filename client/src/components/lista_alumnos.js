import React, { Component } from 'react';

export default class ListaAlumnos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alumnos: [],
    };
  }

  render() {
    return (
      <div>
        <table class = "table">
          <thead>
            <tr>
              <th scope = "col" > # </th>
              <th scope = "col" > Nombre(s) </th>
              <th scope = "col" > Apellidos(s) </th>
              <th scope = "col" > CURP </th>
              <th scope = "col" > Nivel </th>
              <th scope = "col" > Grado </th>
              <th scope = "col" > Checar alumno </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope = "row" > 1 </th>
              <td > Joan Andoni </td>
              <td > Gonzalez Rioz </td>
              <td > GORJ19963923 </td>
              <td > Secundaria </td>
              <td > 2 </td>
              <td> <button type = "button" class = "btn btn-info"> Ver </button> </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
