import React, { Component } from 'react';
import './contabilidad.css';

import NavigationAdmin from './navigationAdmin.js';

export default class Contabilidad extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alumnos: [],
    };
  }

  render() {
        var ingresos = 170000.70;
        var egresos = 10100.98;
        var balanceGeneral = ingresos-egresos;
    return (
      <div class="all">
      <NavigationAdmin/>
      <div class="container margins">

        <div class="row justify-content-around">
          <div class="col-4 box">
            <h2 class="buttonBalance">Ingresos</h2>
            <h5>{ingresos}</h5>
            <input class="inputA" placeholder="Cantidad.."/>
            <br/>
            <a class="btn btn-outline-light buttonMargin">Aceptar</a>
          </div>
          <div class="col-4 box">
            <h2 class="buttonBalance">Egresos</h2>
            <h5>{egresos}</h5>
            <input class="inputA" placeholder="Cantidad.."/>
            <br/>
            <a class="btn btn-outline-light buttonMargin">Aceptar</a>
          </div>
        </div>
        <div class="row justify-content-around">
          <div class="col-4 boxAlt margins">
            <h4 class="buttonBalanceA" >Balance general</h4>
            <h2>{balanceGeneral}</h2>
          </div>

        </div>
        </div>
      </div>
    );
  }
}
