import React, { Component } from 'react';
import './contabilidad.css';

import NavigationAdmin from './navigationAdmin.js';

export default class Contabilidad extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingresos: 170000.7,
      egresos: 10100.98,
      amount: 0,
    };
  }

  render() {
    return (
      <div class="all">
      <NavigationAdmin/>
      <div class="container margins">

        <div class="row justify-content-around">
          <div class="col-4 box">
            <h2 class="buttonBalance">Ingresos</h2>
            <h5>{this.state.ingresos}</h5>
            <input class="inputA" placeholder="Cantidad.."/>
            <br/>
            <a class="btn btn-outline-light buttonMargin">Aceptar</a>
          </div>
          <div class="col-4 box">
            <h2 class="buttonBalance">Egresos</h2>
            <h5>{this.state.egresos}</h5>
            <input class="inputA" placeholder="Cantidad.."/>
            <br/>
            <a class="btn btn-outline-light buttonMargin">Aceptar</a>
          </div>
        </div>
        <div class="row justify-content-around">
          <div class="col-4 boxAlt margins">
            <h4 class="buttonBalanceA">Balance general</h4>
            <h2>{this.state.ingresos - this.state.egresos}</h2>
          </div>

        </div>
        </div>
      </div>
    );
  }
}
