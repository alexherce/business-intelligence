import React, { Component } from 'react';

export default class GrupoItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.item.id_grupo}</td>
        <td>{this.props.item.nivel}</td>
        <td>{this.props.item.grado}</td>
        <td>{this.props.item.grupo}</td>
        <td>{this.props.item.año_escolar}</td>
        <td>{this.props.item.nombre} {this.props.item.apellido_paterno}</td>
        <td>
          <a class="btn btn-success margenes" href={'/admin/alumnos/grupos/detalle/' + this.props.item.id_grupo}>Ver grupo</a>
          <a class="btn btn-info margenes" href={'/admin/alumnos/grupos/agregar/' + this.props.item.id_grupo}>Agregar alumno</a>
        </td>
      </tr>
    );
  }
}
