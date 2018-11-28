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
        var balanceGeneral = 0.00;
    return (
        <div>
            <NavigationAdmin/>

            <h2 class="alumnoName" >Contabilidad</h2>
            <br/>
              
            <div class="container">

            </div>
        </div>
    );
  }
}
