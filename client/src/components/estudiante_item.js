import React, { Component } from 'react';

export default class EstudianteItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.item.curp}</td>
        <td>{this.props.item.nombre}</td>
        <td>{this.props.item.apellido_paterno}</td>
        <td>{this.props.item.apellido_materno}</td>
        <td>
          <a class="btn btn-success margenes" href={'/admin/alumnos/calificaciones/detalle/' + this.props.item.id_estudiante}>Calificaciones</a>
          <a class="btn btn-info margenes" href="/admin/alumnos/grupos/detalle/estadoCuenta">Estado de cuenta</a>
        </td>
      </tr>
    );
  }
}
