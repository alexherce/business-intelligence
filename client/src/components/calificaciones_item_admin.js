import React, { Component } from 'react';

export default class CalificacionesItemAdmin extends Component {
  render() {
    return (
      <tr>
        <th scope="row">{this.props.item.materia}</th>
        <td > {this.props.item.año} </td>
        <td > {this.props.califs['1']} </td>
        <td > {this.props.califs['2']} </td>
        <td > {this.props.califs['3']} </td>
        <td > {this.props.califs['4']} </td>
        <td > {((this.props.califs['1'] + this.props.califs['2'] + this.props.califs['3'] + this.props.califs['4'])/Object.keys(this.props.califs).length).toFixed(2)} </td>
      </tr>
    );
  }
}
