import React, { Component } from 'react';

export default class AplicacionItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.item.id_aplicacion}</td>
        <td>{this.props.item.titulo}</td>
        <td>{this.props.item.taller}</td>
        <td>{this.props.item.nombre} {this.props.item.apellido_paterno}</td>
        <td>
          <a class="btn btn-success margenes" href={'/admin/alumnos/aplicaciones_talleres/detalle/' + this.props.item.id_aplicacion}>Ver Aplicacion</a>
        </td>
      </tr>
    );
  }
}
