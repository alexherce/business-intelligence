import React, { Component } from 'react';

export default class AlumnoItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.item.id_estudiante}</td>
        <td>{this.props.item.nombre}</td>
        <td>{this.props.item.apellido_paterno}</td>
        <td>{this.props.item.apellido_materno}</td>
        <td>{this.props.item.curp}</td>
        <td><a class="btn btn-success margenes" href={'/admin/alumnos/lista/detalle/' + this.props.item.id_estudiante}>Ver detalle</a></td>
      </tr>
    );
  }
}
