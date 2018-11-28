import React, { Component } from 'react';

export default class MateriaItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.item.id_materia}</td>
        <td>{this.props.item.materia}</td>
        <td>{this.props.item.nombre} {this.props.item.apellido_paterno}</td>
        <td>{this.props.item.nivel}</td>
        <td>{this.props.item.grado}</td>
        <td>{this.props.item.grupo}</td>
        <td>{this.props.item.año_escolar}</td>
        <td>
          <a class="btn btn-success margenes" href={'/admin/alumnos/materias/detalle/' + this.props.item.id_materia}>Ver Materia</a>
        </td>
      </tr>
    );
  }
}
