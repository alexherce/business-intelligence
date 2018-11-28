import React, { Component } from 'react';

export default class EmpleadoItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.item.id_empleado}</td>
        <td>{this.props.item.nombre}</td>
        <td>{this.props.item.apellido_paterno}</td>
        <td>{this.props.item.apellido_materno}</td>
        <td>{this.props.item.posicion}</td>
        <td><a class="btn btn-success margenes" href={'/admin/empleados/lista/detalle/' + this.props.item.id_empleado}>Ver detalle</a></td>
      </tr>
    );
  }
}
